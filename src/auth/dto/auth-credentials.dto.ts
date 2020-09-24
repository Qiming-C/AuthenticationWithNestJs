import {IsString,IS_ALPHA,MaxLength,maxLength,MinLength} from 'class-validator';


export class AuthCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;


    @IsString()
    @MinLength(8,{message:'Password is too short{8 characters min}'})
    @MaxLength(20,{message:'Password is too long (20 character max)'})
    password:string;
}