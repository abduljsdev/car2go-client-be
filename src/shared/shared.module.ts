import { EmailService } from './email.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports:[],
    controllers:[],
  providers: [EmailService,],
  exports: [EmailService,],
})
export class SharedModule {}