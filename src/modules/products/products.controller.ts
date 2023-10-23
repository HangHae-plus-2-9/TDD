import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { dtoToSpec } from './mappers/product.mapper';
import { Auth } from '@/common/decorators';
import { ROLE_TYPE } from '@/common/resources';

@ApiTags('products')
@Controller({ version: '1', path: 'products' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  // @Auth([ROLE_TYPE.ADMIN])
  @ApiOperation({ summary: '상품 등록' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  create(@Body() createProductDto: CreateProductDto) {
    const productSpec = dtoToSpec(createProductDto);
    return this.productsService.create(createProductDto.sellerId, productSpec);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProductSpec = dtoToSpec(updateProductDto);
    return this.productsService.update(id, updatedProductSpec);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Patch(':id/sub')
  subtractStock(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.productsService.subStock(id, body.quantity);
  }

  @Patch(':id/add')
  addStock(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.productsService.addStock(id, body.quantity);
  }
}
