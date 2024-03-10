import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDTO : CreateUserDTO) : Promise<User>{
    return this.usersService.create(createUserDTO);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id : string) : Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  async findByEmail(@Param('email') email : string) : Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id : string, @Body() updateUser : CreateUserDTO){
    return this.usersService.update(id, updateUser);
  }

  @Delete(':id')
  async delete(@Param('id') id : string) : Promise<boolean>{
    return this.usersService.delete(id);
  }
}
