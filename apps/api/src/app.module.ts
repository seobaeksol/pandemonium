import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { IncidentsModule } from './incidents/incidents.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, IncidentsModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
