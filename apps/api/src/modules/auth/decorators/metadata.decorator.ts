import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RawInternalMetadata } from '@/api/modules/auth/strategies/fido2/fido2.service';

export const Metadata = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): RawInternalMetadata => {
    const request = ctx.switchToHttp().getRequest();
    const ipAddress = request.ip;
    const userAgent = request.headers['user-agent'];

    return {
      ipAddress,
      userAgent,
    };
  },
);
