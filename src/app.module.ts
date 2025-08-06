import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [ProductModule, AuthModule, DatabaseModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
