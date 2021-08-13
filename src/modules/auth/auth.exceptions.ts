import { DomainException } from '@common/core/domain-exception';

export namespace AuthExceptions {
  export class NotAuthenticated extends DomainException {
    constructor() {
      super({
        message: 'You are not authenticated!',
        code: 'NOT_AUTHENTICATED',
      });
    }
  }

  export class NotAuthorized extends DomainException {
    constructor() {
      super({ message: 'You are not authorized!', code: 'NOT_AUTHORIZED' });
    }
  }
}
