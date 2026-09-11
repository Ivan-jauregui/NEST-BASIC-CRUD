import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ){}


  async create(createProductDto: CreateProductDto):Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() : Promise<Product[]> {
    return await this.productRepository.find();
  }

  findById(id: number) {
    const product = this.productRepository.findOneBy({id})
    if (!product){
      throw new NotFoundException(`Producto con id ${id} no encontrado`)
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product){
      throw new NotFoundException(`Producto con id ${id} no encontrado`)
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number) : Promise<{ message: string }>{
    const product = await this.findById(id);

    if (!product){
      throw new NotFoundException(`Producto con id ${id} no encontrado`)
    }
    
    await this.productRepository.remove(product);
    return { message: `Producto #${id} eliminado correctamente` };
  }
}
