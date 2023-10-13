import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  OrderNotFoundException,
  ProductNotFoundException,
} from '@/common/exceptions';
import { OrdersRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import { OrdersMapper } from './orders.mapper';
import { OrderEntity } from './entities/order.entity';

const DUMMY_PRODUCTS = [
  { productId: 1, price: 10000, quantity: 10 },
  { productId: 2, price: 20000, quantity: 10 },
  { productId: 3, price: 30000, quantity: 10 },
  { productId: 4, price: 40000, quantity: 10 },
  { productId: 5, price: 50000, quantity: 10 },
];

const productService = {
  findOne: (productId: number) => {
    const productInfo = DUMMY_PRODUCTS.find(
      (product) => product.productId === productId,
    );
    if (!productInfo) {
      throw new ProductNotFoundException();
    }
    return productInfo;
  },
};
@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepo: OrdersRepository,
    private readonly orderItemRepo: OrderItemsRepository,
  ) {}

  // TODO: Transaction, 함수분리 필요
  async create(createOrderDto: CreateOrderDto) {
    const { orderItems: orderItemModels, ...orderModel } = createOrderDto;

    const verifiedOrderItemModels = orderItemModels.map((item) => {
      if (item.quantity < 1) {
        throw new Error('Quantity must be greater than 0');
      }
      // orderItems 생성시 productId로 상품정보 조회해서 price 가져오기
      const productInfo = productService.findOne(item.productId);
      if (!productInfo) {
        throw new ProductNotFoundException();
      }
      if (productInfo.quantity < item.quantity) {
        throw new Error('Quantity must be less than product quantity');
      }
      return {
        ...item,
        price: productInfo.price,
      };
    });
    orderModel.amount = verifiedOrderItemModels.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );

    const orderEntity = await this.orderRepo.create(orderModel);
    const orderItemEntities = await this.orderItemRepo.createManyWithOrderId(
      orderEntity.id,
      verifiedOrderItemModels,
    );
    orderEntity.orderItems = orderItemEntities;
    return orderEntity;
  }

  async findAll() {
    return this.orderRepo.all();
  }

  async findOne(id: number): Promise<OrderEntity> {
    const orderEntity = await this.orderRepo.findById(id);
    const orderItemEntities = await this.orderItemRepo.findByOrderId(id);
    return { ...orderEntity, orderItems: orderItemEntities };
  }

  // TODO: Transaction, 함수분리 필요
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderEntity = await this.findOne(id);
    if (!orderEntity) {
      throw new OrderNotFoundException();
    }
    const orderItemEntities = await this.orderItemRepo.findByOrderId(id);
    if (orderItemEntities.length > 0) {
      this.orderItemRepo.removeByOrderId(id);
    }

    // newOrderItemModels: 기존 orderItemEntities가 삭제된 후, 새로 등록될 orderItemModels
    // updateOrderModel: 기존 orderEntity를 업데이트할 정보
    const { orderItems: newOrderItemModels, ...updateOrderModel } =
      updateOrderDto;

    const newOrderModel = {
      ...OrdersMapper.toModelFromEntity(orderEntity),
      ...updateOrderModel,
      amount: newOrderItemModels.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0,
      ),
    };

    const newOrderItemEntities = await this.orderItemRepo.createManyWithOrderId(
      id,
      newOrderItemModels,
    );
    const newOrderEntity = this.orderRepo.update(id, newOrderModel);
    newOrderEntity.orderItems = newOrderItemEntities;
    return newOrderEntity;
  }

  async remove(id: number) {
    const order = this.findOne(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    this.orderItemRepo.removeByOrderId(id);
    return this.orderRepo.remove(id);
  }
}
