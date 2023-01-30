import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3150;
  await app.listen(PORT, ()=> console.log('server runing on port: '+ PORT));
}
bootstrap();
