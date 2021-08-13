import { DomainException } from '@common/core/domain-exception';

export namespace RegisterExceptions {
  export class UsernameAlreadyReserved extends DomainException {
    constructor() {
      super({
        message: 'The selected username is already in use!',
        code: 'USERNAME_RESERVED',
      });
    }
  }
}
