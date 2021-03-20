import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as macaddress from 'macaddress';

export const GetIpMac = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<string[]> => {
    const req = ctx.switchToHttp().getRequest();
    let mac = await macaddress.one();
    return [req.socket.remoteAddress, mac];
  },
);
