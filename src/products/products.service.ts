// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async insertProduct(title: string, desc: string, price: number): Promise<{ id: string, product: Product }> {
    try {
      const newProduct = new this.productModel({ title, description: desc, price });
      const savedProduct = await newProduct.save();
      console.log(savedProduct);
      return { id: savedProduct._id.toString(), product: savedProduct };
    } catch (error) {
      console.error('Error inserting product:', error);
      throw error;
    }
  }  
  

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getSingleProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }

  async updateProduct(productId: string, title: string, desc: string, price: number): Promise<Product> {
    const updatedProduct = await this.productModel.findById(productId).exec();
    if (!updatedProduct) {
      throw new NotFoundException('Could not find product.');
    }
  
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
  
    await updatedProduct.save();
    return updatedProduct;
  }
    
  

  async deleteProduct(prodId: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  // No need for the findProduct private method
}
