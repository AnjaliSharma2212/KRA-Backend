# NestJS + TypeORM + PostgreSQL Backend (Learning Project)

This project demonstrates how to build a backend API using **NestJS**,
**TypeORM**, and **PostgreSQL**.

## Concepts Covered

-   Entities
-   Relationships
-   Repository Pattern
-   DataSource
-   Transactions
-   QueryBuilder
-   Pagination
-   Validation
-   Routing
-   Migrations
-   Pessimistic Locking

------------------------------------------------------------------------

# 1. Project Structure

    src
     ├── main.ts
     ├── app.module.ts
     │
     ├── users
     │   ├── users.module.ts
     │   ├── users.controller.ts
     │   ├── users.service.ts
     │   ├── users.entity.ts
     │   └── dto
     │        └── create-user.dto.ts
     │
     ├── orders
     │   ├── orders.module.ts
     │   ├── orders.controller.ts
     │   ├── orders.service.ts
     │   ├── orders.entity.ts
     │   └── dto
     │        └── create-order.dto.ts
     │
     └── database
         └── data-source.ts

------------------------------------------------------------------------

# 2. NestJS Architecture

NestJS follows a **modular architecture**.

  Component    Purpose
  ------------ ----------------------------
  Module       Organizes related features
  Controller   Handles HTTP requests
  Service      Business logic
  Entity       Database table
  DTO          Request validation

------------------------------------------------------------------------

# 3. Entities

Entities define database tables using decorators.

## User Entity

``` ts
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

### Decorators

  Decorator                   Purpose
  --------------------------- ----------------------
  @Entity()                   Marks class as table
  @Column()                   Creates column
  @PrimaryGeneratedColumn()   Auto increment id

------------------------------------------------------------------------

# 4. Relationships

Example: **One User → Many Orders**

User Entity

``` ts
@OneToMany(() => Order, order => order.user)
orders: Order[];
```

Order Entity

``` ts
@ManyToOne(() => User, user => user.orders)
user: User;
```

------------------------------------------------------------------------

# 5. Repository Pattern

Repositories interact with database tables.

``` ts
constructor(
  @InjectRepository(Order)
  private orderRepository: Repository<Order>
) {}
```

Common methods:

-   `find()`
-   `findOne()`
-   `save()`
-   `delete()`

------------------------------------------------------------------------

# 6. DataSource

`DataSource` represents the database connection and allows:

-   transactions
-   raw queries
-   query builders

``` ts
constructor(private dataSource: DataSource) {}
```

------------------------------------------------------------------------

# 7. Transactions

Transactions ensure multiple operations succeed together.

Example: create order only if user exists.

``` ts
await this.dataSource.transaction(async manager => {

  const user = await manager.findOne(User, {
    where: { id: userId }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const order = manager.create(Order, {
    quantity,
    user
  });

  await manager.save(order);

});
```

------------------------------------------------------------------------

# 8. QueryBuilder

Used for advanced SQL queries.

Example with pagination:

``` ts
const qb = this.orderRepository
  .createQueryBuilder('order')
  .leftJoinAndSelect('order.user','user')
  .skip((page-1)*limit)
  .take(limit)

const [data,total] = await qb.getManyAndCount()
```

------------------------------------------------------------------------

# 9. Pagination

Request:

    GET /orders?page=1&limit=2

Response:

``` json
{
  "data": [],
  "total": 0,
  "page": 1,
  "limit": 2
}
```

------------------------------------------------------------------------

# 10. DTO Validation

DTOs validate request data.

Example:

``` ts
export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

}
```

Enable globally in `main.ts`

``` ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist:true
  })
)
```

------------------------------------------------------------------------

# 11. Routing

Controllers define API routes.

    POST /users
    GET /users
    POST /orders
    GET /orders

Example:

``` ts
@Get()
getOrders(@Query('page') page=1, @Query('limit') limit=10){
  return this.ordersService.getOrders(page,limit)
}
```

------------------------------------------------------------------------

# 12. Migrations

Migrations manage database schema changes.

Generate migration:

    npm run typeorm migration:generate -- src/migrations/init

Run migration:

    npm run typeorm migration:run

------------------------------------------------------------------------

# 13. Pessimistic Locking

Prevents concurrent updates on the same row.

Example:

``` ts
await this.dataSource.transaction(async manager => {

 const order = await manager
   .createQueryBuilder(Order,"order")
   .setLock("pessimistic_write")
   .where("order.id = :id",{id:orderId})
   .getOne()

 order.quantity += 1

 await manager.save(order)

})
```

------------------------------------------------------------------------

# 14. Best Practices

-   Always validate request using DTO
-   Use transactions for critical operations
-   Use QueryBuilder for complex queries
-   Use migrations instead of synchronize in production
-   Separate controller, service, and database layers

------------------------------------------------------------------------

# 15. Next Topics to Learn

-   JWT Authentication
-   Role Based Authorization
-   Guards & Interceptors
-   Redis Caching
-   Microservices
-   Message Queues (Kafka / RabbitMQ)

------------------------------------------------------------------------

# Summary

This project demonstrates a scalable backend built using:

-   NestJS
-   TypeORM
-   PostgreSQL

Key backend engineering concepts include:

-   modular architecture
-   relational data modeling
-   safe database transactions
-   efficient querying
