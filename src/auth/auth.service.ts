import { ConflictException, Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';

import {AuthCredentialsDto} from'./dto/auth-credentials.dto';
import {User} from './interface/user.interface';


@Injectable()
export class AuthService 
{
    constructor(@InjectModel('User') private readonly userModel:Model<User>,private jwtService:JwtService)
    {}

    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>
    {
        
        //destrcuture our credential, hash the password with bcrypt
        const {username,password}=authCredentialsDto;
     
        const hashedPassword=await bcrypt.hash(password,10);
        const user = new this.userModel({username,password:hashedPassword});
      
        
        try{
                //save the user to db
                    await user.save();          
        }catch(error)
        {
            //potential errors and take care of the 11000 error with a particular throw
            if(error.code ===11000)
            {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    async signIn(user:User)
    {
        const payload={username:user.username, sub:user._id}
        return{
            accessToken:this.jwtService.sign(payload)
        };
    }


    async validateUser(username: string, password:string):Promise<User>
    {
        
        const user=await this.userModel.findOne({username});
        if(!user)
        {
            return null;
        }

        const valid=await bcrypt.compare(password,user.password);

        if(valid)
        {
            return user;
        }


        return null;
    }



}
