import { ArgsType, PickType } from '@nestjs/graphql';
import { ProductType } from 'src/modules/product/dto/product.type';

@ArgsType()
export class CreateProductArgs extends PickType(ProductType, ['name', 'description', 'url'], ArgsType) {}
