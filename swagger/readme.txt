What is Swagger? (Before Coding)

Swagger is a tool that automatically generates API documentation for your backend.

Instead of manually writing docs, it reads your NestJS code and creates interactive API docs.

Features:

Shows all API endpoints

Shows request body format

Shows query params

Lets you test APIs from browser

Useful for frontend developers

Example UI:

GET /users
POST /users
PUT /users/{id}
DELETE /users/{id}

You can try APIs directly in browser.

2. Install NestJS Project (From Scratch)

First install Nest CLI.

npm install -g @nestjs/cli

Create project.

nest new nest-swagger-demo

Choose:

npm

Project structure created:

nest-swagger-demo
│
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── package.json
└── tsconfig.json

Run project:

cd nest-swagger-demo
npm run start:dev

Server runs:

http://localhost:3000
3. Install Swagger in NestJS

Install required packages.

npm install @nestjs/swagger swagger-ui-express

Why these packages?

Package	Purpose
@nestjs/swagger	Generates Swagger docs
swagger-ui-express	Provides Swagger UI
4. Configure Swagger in main.ts

Open:

src/main.ts

Default file:

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

Now modify it.

Updated main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API documentation for user module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}

bootstrap();
5. Understanding DocumentBuilder

DocumentBuilder is used to configure Swagger documentation.

Example:

const config = new DocumentBuilder()
  .setTitle('User API')
  .setDescription('User management APIs')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

Explanation:

Method              	Purpose
setTitle()	           API title
setDescription()	  Description
setVersion()	      API version
addBearerAuth()  	  Enables JWT authentication
build()         	  Final config object

6. SwaggerModule
const document = SwaggerModule.createDocument(app, config);

This reads all controllers + DTOs and generates API documentation.

Then we setup UI:

SwaggerModule.setup('api-docs', app, document);

Now Swagger runs at:

http://localhost:3000/api-docs

Open it in browser.

You will see Swagger UI 🎉

7. Create a Module (User Example)

Create module using CLI.

nest generate module users
nest generate controller users
nest generate service users

Project structure:

src
 ├── users
 │   ├── users.controller.ts
 │   ├── users.module.ts
 │   └── users.service.ts
8. Create DTO (Data Transfer Object)

DTO defines request body structure.

Create file:

src/users/dto/create-user.dto.ts

Example DTO:

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

}
9. What is @ApiProperty

@ApiProperty tells Swagger:

This field should appear in API documentation.

Without it:

Swagger cannot detect fields properly.

Example Swagger output:

POST /users

Request Body

{
 "name": "string",
 "email": "string",
 "age": 0
}
10. Optional Fields

Use:

@ApiPropertyOptional()

Example:

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  age?: number;

}

Now age becomes optional in docs.

11. Decorating Controller with Swagger

Open:

users.controller.ts

Example:

import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return {
      message: 'User created',
      data: createUserDto
    };
  }

}
12. @ApiTags

Groups APIs in Swagger.

Example UI:

Users
   POST /users
13. Add JWT Authentication (@ApiBearerAuth)

If API requires JWT token.

Example:

import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Post()
createUser(@Body() dto: CreateUserDto) {
  return dto;
}

Swagger UI will show:

Authorize 🔒

You can enter:

Bearer token
14. Complete Example

DTO

export class CreateUserDto {

  @ApiProperty({ example: "Anjali" })
  name: string;

  @ApiProperty({ example: "anjali@email.com" })
  email: string;

  @ApiPropertyOptional({ example: 25 })
  age?: number;

}

Controller

@ApiTags('Users')
@Controller('users')
export class UsersController {

  @Post()
  @ApiBearerAuth()
  createUser(@Body() dto: CreateUserDto) {
    return {
      message: "User created",
      data: dto
    };
  }

}
15. Final Swagger Result

Open:

http://localhost:3000/api-docs

You will see:

Users
  POST /users

Click endpoint → Try it out → Send request.

16. Real Production Best Practices

Use extra decorators:

@ApiOperation()
@ApiResponse()
@ApiParam()
@ApiQuery()

Example:

@ApiOperation({ summary: 'Create new user' })
@ApiResponse({ status: 201, description: 'User created successfully' })
17. Folder Structure (Best Practice)
src
│
├── users
│   ├── dto
│   │   └── create-user.dto.ts
│   │
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── app.module.ts
└── main.ts
18. What You Learned
-------------------------------------
|Concept         |   	     Purpose|
-------------------------------------
@nestjs/swagger 	    NestJS swagger integration
DocumentBuilder 	    Configure API docs
SwaggerModule	        Generate docs
Swagger UI	            API testing interface
@ApiProperty	        Document DTO fields
@ApiPropertyOptional	Optional field docs
@ApiBearerAuth	        JWT auth
DTO Decoration