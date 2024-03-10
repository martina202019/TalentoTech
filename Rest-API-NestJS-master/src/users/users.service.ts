import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDTO: CreateUserDTO) {
    //=>createUserDTO es la variable y CreateUserDTO es la clase.
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    const newUser = new this.userModel({
      ...createUserDTO,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmail(email : string) : Promise<User> {
    try{
      return await this.userModel.findOne({email});
    }catch( error ){
      throw new HttpException('The email does not match with any user', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, userDTO: CreateUserDTO): Promise<User> {
    if (userDTO.password) {
      const hashedPassword = await bcrypt.hash(userDTO.password, 10);
      userDTO = {
        ...userDTO,
        password: hashedPassword,
      };
    }
    try {
      return await this.userModel.findByIdAndUpdate(id, userDTO, { new: true });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  
  async delete(id : string): Promise<boolean> {
    const user = await this.userModel.findByIdAndDelete(id);
    try{
      if( !user ){
        throw new NotFoundException('User not found');
      }
    }catch(error){
      throw new NotFoundException('User not found');
    }
    return true;
  }
}
