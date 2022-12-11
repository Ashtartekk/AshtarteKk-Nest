import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { AdminSchema } from '../../schema/admin.schema';
import { RoleSchema } from '../../schema/role.scheama';
import { AccessSchema } from 'src/schema/access.schema';
import { RoleAccessSchema } from 'src/schema/role_access.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from '../../service/admin/admin.service';
import { RoleService } from 'src/service/role/role.service';
import { AccessService } from 'src/service/access/access.service';
import { RoleController } from './role/role.controller';
import { AccessController } from './access/access.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema, collection: 'admin' },
      { name: 'Role', schema: RoleSchema, collection: 'role' },
      { name: 'Access', schema: AccessSchema, collection: 'access' },
      {
        name: 'RoleAccess',
        schema: RoleAccessSchema,
        collection: 'role_access',
      },
    ]),
  ],
  controllers: [
    MainController,
    LoginController,
    ManagerController,
    RoleController,
    AccessController,
  ],
  providers: [ToolsService, AdminService, RoleService, AccessService],
})
export class AdminModule {}
