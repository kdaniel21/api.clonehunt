import { PaginationArgs } from '@common/graphql/dto/pagination.args';
import { ArgsType, Field, OmitType } from '@nestjs/graphql';

@ArgsType()
export class ProductsArgs extends OmitType(PaginationArgs, [] as const, ArgsType) {
  @Field(() => Date, { nullable: true })
  readonly startDate?: Date;

  @Field(() => Date, { nullable: true })
  readonly endDate?: Date;
}
