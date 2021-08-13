import { DomainException } from '@common/core/domain-exception';

export namespace LoginExceptions {
  export class InvalidCredentials extends DomainException {
    constructor() {
      super({
        message: 'The provided username or password is invalid!',
        code: 'INVALID_CREDENTIALS',
      });
    }
  }
}
