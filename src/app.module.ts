import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [AuthModule,MongooseModule.forRoot('mongodb+srv://admin:cs320database@cluster0.wonp5.mongodb.net/nestjs-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
