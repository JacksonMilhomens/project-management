import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ProjectModule } from './components/project/project.module';

config();

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_ATLAS_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENVIRONMENT === 'prd' ? '.env.prod' : '.env.dev',
    }),
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
