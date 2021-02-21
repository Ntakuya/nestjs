import { DocumentBuilder } from '@nestjs/swagger';

export default () =>
  new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .build();
