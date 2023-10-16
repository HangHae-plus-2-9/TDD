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
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { dtoToSpec } from './mappers/product.mapper';

@ApiTags('products')
@Controller({ version: '1', path: 'products' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
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
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProductSpec = dtoToSpec(updateProductDto);
    return this.productsService.update(+id, updatedProductSpec);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
