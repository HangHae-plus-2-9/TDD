import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order by id' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    console.log('process.env.AWS_LOG_GROUP_NAME', process.env.AWS_LOG_GROUP_NAME);
    console.log('process.env.AWS_LOG_STREAM_NAME', process.env.AWS_LOG_STREAM_NAME);
    console.log('process.env.AWS_ACCESS_KEY_ID', process.env.AWS_LOG_ACCESS_KEY_ID);
    console.log('process.env.AWS_SECRET_ACCESS_KEY', process.env.AWS_LOG_SECRET_ACCESS_KEY);
    console.log('process.env.AWS_REGION', process.env.AWS_LOG_REGION);
    const { paymentInfo, shippingInfo, orderItems } = updateOrderDto;
    return this.ordersService.update(
      +id,
      paymentInfo,
      shippingInfo,
      orderItems,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
