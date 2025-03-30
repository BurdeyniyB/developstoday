import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const PORT = configService.get<number>('PORT') || 5000;
    const FRONTEND_URL = configService.get<string>('FRONTEND_URL');

    console.log(`Loaded PORT: ${PORT}`);
    console.log(`Loaded FRONTEND_URL: ${FRONTEND_URL}`);

    app.enableCors({
      origin: FRONTEND_URL,
      credentials: true,
    });

    await app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`),
    );
  } catch (e) {
    console.error('Error starting server:', e);
  }
}
bootstrap();
