import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
    const { customerId, paymentInfo, shippingInfo, orderItems } =
      createOrderDto;
    return this.ordersService.create(
      customerId,
      paymentInfo,
      shippingInfo,
      orderItems,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll(@Req() req: Request) {
    console.log('RequestId:', req.headers['request-id']);
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const { paymentInfo, shippingInfo, orderItems } = updateOrderDto;
    return this.ordersService.update(id, paymentInfo, shippingInfo, orderItems);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
