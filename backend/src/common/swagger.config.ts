import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Samiti Khata Backend API')
    .setVersion('2.0')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      description: 'Secure httpOnly access token cookie',
    })
    .addSecurityRequirements('access_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
