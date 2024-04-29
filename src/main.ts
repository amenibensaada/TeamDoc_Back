import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200
  };
  app.use(cors(corsOptions));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
