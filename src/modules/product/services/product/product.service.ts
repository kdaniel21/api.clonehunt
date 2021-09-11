import { PrismaService } from '@common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { ProductExceptions } from '../../product.exceptions';
import { CreateProductArgs } from './dto/create-product.args';
import { ProductsArgs } from './dto/products-args';
import { UpdateProductArgs } from './dto/update-product.args';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  createProduct(args: CreateProductArgs, userId: string): Promise<Product> {
    return this.prisma.product.create({ data: { ...args, userId } });
  }

  findProductById(id: string): Promise<Product> {
    const product = this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new ProductExceptions.ProductNotFound();

    return product;
  }

  getProducts(
    args: Prisma.ProductFindManyArgs,
    timeFilter?: Pick<ProductsArgs, 'startDate' | 'endDate'>,
  ): Promise<Product[]> {
    return this.prisma.product.findMany({
      ...args,
      where: { AND: [{ createdAt: { gte: timeFilter?.startDate } }, { createdAt: { lte: timeFilter?.endDate } }] },
      orderBy: { createdAt: 'desc' },
    });
  }

  getTotalNumberOfProducts(timeFilter?: Pick<ProductsArgs, 'startDate' | 'endDate'>): Promise<number> {
    return this.prisma.product.count({
      where: { AND: [{ createdAt: { gte: timeFilter?.startDate } }, { createdAt: { lte: timeFilter?.endDate } }] },
    });
  }

  async updateProduct(id: string, args: UpdateProductArgs, userId: string): Promise<Product> {
    const productToUpdate = await this.prisma.product.findUnique({ where: { id } });
    const doesBelongToUser = productToUpdate.userId === userId;
    if (!doesBelongToUser) throw new ProductExceptions.ProductForbidden();

    const updatedProduct = this.prisma.product.update({ where: { id }, data: args });
    if (!updatedProduct) throw new ProductExceptions.ProductNotFound();

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const deletedProduct = await this.prisma.product.delete({ where: { id } });
    if (!deletedProduct) throw new ProductExceptions.ProductNotFound();
  }
}
