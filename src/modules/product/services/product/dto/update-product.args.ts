import { ArgsType, PartialType, PickType } from '@nestjs/graphql';
import { ProductType } from 'src/modules/product/dto/product.type';

@ArgsType()
export class UpdateProductArgs extends PartialType(
  PickType(ProductType, ['name', 'description', 'url'] as const, ArgsType),
) {}
