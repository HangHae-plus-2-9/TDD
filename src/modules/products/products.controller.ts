import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
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
import { IndexProductDto } from './dto/index-product.dto';
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
  async create(@Body() createProductDto: CreateProductDto) {
    const productSpec = dtoToSpec(createProductDto);
    return await this.productsService.create(
      createProductDto.sellerId,
      productSpec,
    );
  }

  @Get()
  async findAll(@Query() indexProductDto: IndexProductDto) {
    return await this.productsService.findAll(indexProductDto);
  }

  @Get('/all')
  async all() {
    return await this.productsService.all();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProductSpec = dtoToSpec(updateProductDto);
    return await this.productsService.update(id, updatedProductSpec);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.remove(id);
  }

  @Patch(':id/sub')
  async subtractStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { quantity: number },
  ) {
    return await this.productsService.subStock(id, body.quantity);
  }

  @Patch(':id/add')
  async addStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { quantity: number },
  ) {
    return await this.productsService.addStock(id, body.quantity);
  }
}
