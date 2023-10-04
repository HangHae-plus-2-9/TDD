import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsComponent } from './products.component';
import { ProductsRepositoryInterface } from './interfaces/product-repository.interface';

/**
 * 가상의 서비스
 *  - 게시글을 작성하면서 댓글까지 트랜젝션으로 함꼐 생성되는 경우를 가정
 */
@Injectable()
export class ProductsService {
  constructor(
    private readonly comp: ProductsComponent,
    @Inject('ProductsRepositoryInterface')
    private readonly repo: ProductsRepositoryInterface,
  ) {}

  // 기존에 트랙젝션을 사용하기 위해 사용했왔던 방식 - 이번에는 지양하기로.
  create_without_component(createProductDto: CreateProductDto) {
    // 1. 어떤 로직으로 게시글을 작성하고 검증한다
    this.some_validation_post();
    // 2. 다른 로직으로 댓글을 작성하고 검증한다.
    this.some_validation_comment();

    // @Transaction()
    // 3. 게시글을 트랜젝션으로 생성한다.
    const newSomething = this.repo.create(createProductDto);
    // 4. 댓글을 트랜젝션으로 생성한다.
    const newOtherThing = this.repo.create(createProductDto); // 위와 다르다고 가정
    // @Commit()
    // ~~
    // @Rollback()
    // ~~
    return [newSomething, newOtherThing];
  }

  private product_add_validation() {
    return false;
  }

  private some_validation_comment() {
    return true;
  }

  /**
   * 트랜젝션이 사용 될 때, 우리가 주로 사용하기로 한 방식
   */
  create_with_component(createProductDto: CreateProductDto) {

    // 1. 어떤 로직으로 게시글을 작성하고 검증한다
    this.some_validation_post();
    // 2. 다른 로직으로 댓글을 작성하고 검증한다.
    this.some_validation_comment();
    return this.comp.createSomethingAndOther(createProductDto);
  }
  
  create_with_component(createProductDto: CreateProductDto) {
    
    // 1. 어떤 로직으로 게시글을 작성하고 검증한다
    this.some_validation_post();
    // 2. 다른 로직으로 댓글을 작성하고 검증한다.
    this.some_validation_comment();
    return this.comp.createSomethingAndOther(createProductDto);
  }

  /**
   * 이하 트랜젝션 없이 간단한 로직은 그냥 repository 직접 호출해서 사용
   */
  findAll() {
    return this.repo.all();
  }

  findOne(id: number) {
    return this.repo.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.repo.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
