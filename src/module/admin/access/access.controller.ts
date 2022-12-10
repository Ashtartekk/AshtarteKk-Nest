import { Controller, Get } from '@nestjs/common';
import { AccessService } from 'src/service/access/access.service';
import { Config } from 'src/config/config';

@Controller(`${Config.adminPath}/access`)
export class AccessController {
  constructor(private accessService: AccessService) {}
  @Get()
  index() {
    return '权限列表';
  }
}
