import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    try {
      const { id, product } = await this.productsService.insertProduct(title, description, price);
      return { id, product };
    } catch (error) {
      return { error: 'Failed to add product.' };
    }
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    try {
      return this.productsService.getSingleProduct(productId);
    } catch (error) {
      return { error: 'Product not found.' };
    }
  }

  @Patch(':id')
async updateProduct(
  @Param('id') prodId: string,
  @Body('title') prodTitle: string,
  @Body('description') prodDesc: string,
  @Body('price') prodPrice: number,
) {
  await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  const updatedProduct = await this.productsService.getSingleProduct(prodId);
  return { updatedProduct };
}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProduct(@Param('id') productId: string) {
    try {
      await this.productsService.deleteProduct(productId);
      return null;
    } catch (error) {
      return { error: 'Failed to remove product.' };
    }
  }
}
