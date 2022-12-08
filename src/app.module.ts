import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
import { ToolsService } from './service/tools/tools.service';

@Module({
  imports: [AdminModule, DefaultModule, ApiModule],
  controllers: [],
  providers: [ToolsService],
})
export class AppModule {}
