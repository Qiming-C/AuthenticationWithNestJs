import { Body, Controller,Post, ValidationPipe,UseGuards,Request, Get} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import {LocalAuthGuard} from './guards/local-auth.guard';


@Controller('auth')
export class AuthController 
{
            constructor(private authService:AuthService){}


     @Post('/signUp')
     async signUp
     (
                @Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto
     )
     {
         try
         {
         console.log("from controller"+authCredentialsDto);
         return await this.authService.signUp(authCredentialsDto);
         }catch(err)
         {
             console.log(err);
         }
     }    
     
     
     @UseGuards(LocalAuthGuard)
     @Post('signin')
     async signIn(@Request() req)
     {
        
         return this.authService.signIn(req.user);
         
     }


     @UseGuards(JwtAuthGuard)
     @Get('me')
     getMe(@Request() req)
     {
    
         return req.user;
         
     }
}




