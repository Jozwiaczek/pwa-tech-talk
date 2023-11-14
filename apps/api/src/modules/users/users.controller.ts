import { Controller, Delete, Param } from '@nestjs/common';
import { UsersService } from '@/api/modules/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete()
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }
}
