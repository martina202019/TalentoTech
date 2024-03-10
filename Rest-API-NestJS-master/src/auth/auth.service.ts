import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor( private readonly userService : UsersService){}

    async validateUser( email : string, password : string) : Promise<User>{
        try{
            const user = await this.userService.findByEmail(email);
            if( user && bcrypt.compareSync( password, user.password )){
                return user;
            }else{
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
        }catch( error ) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
