import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createDtoToSpec } from './mappers/order.mapper';

@ApiTags('orders')
@Controller({ version: '1', path: 'orders' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    const customerId = createOrderDto.customerId;
    const orderSpec = createDtoToSpec(createOrderDto);
    return this.ordersService.create(customerId, orderSpec);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order by id' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
