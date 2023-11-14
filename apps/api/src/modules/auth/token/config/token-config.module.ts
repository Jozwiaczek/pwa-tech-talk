import { Module } from '@nestjs/common';

import { TokenConfigService } from './token-config.service';

@Module({
  imports: [],
  providers: [TokenConfigService],
  exports: [TokenConfigService],
})
export class TokenConfigModule {}
