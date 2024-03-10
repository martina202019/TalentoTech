import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/users/dto/loginDTO.dto';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() loginDTO : LoginDTO) : Promise<User> {
        return this.authService.validateUser(loginDTO.email, loginDTO.password)
    }
}
