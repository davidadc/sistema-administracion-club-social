import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetIpAddress = createParamDecorator(
  (data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    return req.socket.remoteAddress;
  },
);
