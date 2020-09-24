import { Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserSchema} from './schema/user.schema';
import {JwtStrategy} from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import {jwtConstants} from './constants';
@Module({
  imports:
  [
  ConfigModule.forRoot(),
  MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
  PassportModule,
  JwtModule.register
  ({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'60s'},

  })

],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService],
  
})
export class AuthModule {}
