import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity } from 'typeorm';
import { ProductModel } from '../models/product.model';
import { removeUndefinedKeys } from '@/common/utils';

@Entity({ name: 'products' })
export class ProductEntity extends CommonColumns {
  @Column()
  seller_id: number;

  @Column()
  name: string;

  @Column()
  category_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  toModel() {
    const model = new ProductModel();
    model.id = this.id;
    model.seller_id = this.seller_id;
    model.name = this.name;
    model.category_name = this.category_name;
    model.description = this.description;
    model.price = this.price;
    model.stock = this.stock;
    model.created_at = this.created_at;
    model.updated_at = this.updated_at;
    model.deleted_at = this.deleted_at;
    return removeUndefinedKeys(model) as ProductModel;
  }
}
