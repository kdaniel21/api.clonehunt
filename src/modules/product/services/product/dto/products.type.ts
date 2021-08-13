import { PageTypeFactory } from '@common/graphql/dto/edge.factory';
import { ProductType } from 'src/modules/product/dto/product.type';

export const ProductsType = PageTypeFactory(ProductType);
export type ProductsType = InstanceType<typeof ProductsType>;
