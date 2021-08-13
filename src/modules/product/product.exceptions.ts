import { DomainException } from '@common/core/domain-exception';

export namespace ProductExceptions {
  export class ProductNotFound extends DomainException {
    constructor() {
      super({
        message: 'The selected product could not be found!',
        code: 'PRODUCT_NOT_FOUND',
      });
    }
  }

  export class ProductForbidden extends DomainException {
    constructor() {
      super({
        message: 'Access denied for the selected product!',
        code: 'PRODUCT_FORBIDDEN',
      });
    }
  }
}
