import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsComponent {
  constructor(private readonly repo: ProductsRepository) {}

  /**
   * Business Logic상 원자적으로 항상 묶여야하는 로직을 작성
   */
  createSomethingAndOther(createProductDto: CreateProductDto) {
    // @Transaction()
    // 3. 게시글을 트랜젝션으로 생성한다.
    const newSomething = this.repo.create(createProductDto);
    // 4. 댓글을 트랜젝션으로 생성한다.
    const newOtherThing = this.repo.create(createProductDto); // 위와 다르다고 가정
    // @Commit()
    // 커밋
    // @Rollback()
    // 롤백
    return [newSomething, newOtherThing];
  }
}
