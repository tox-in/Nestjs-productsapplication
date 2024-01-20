import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: String, required: true })
  public title: string;

  @Prop({ type: String, required: true })
  public description: string;

  @Prop({ type: Number, required: true })
  public price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
