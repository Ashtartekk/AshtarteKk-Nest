import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';

@Module({
  imports: [AdminModule, DefaultModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
