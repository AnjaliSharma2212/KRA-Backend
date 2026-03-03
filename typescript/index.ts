// Interface define the shape or structure of an object

// Basic interface
interface UserBasic {
  id: number,
  name: string,
  email: string,
  age?: number //optional
}

// Usage
const user1: UserBasic = {
  id: 1,
  name: "Anjali",
  email: "anjali@example.com"
}


// Interface with methods

interface Products {
  id: number,
  price: number,
  calculateTax(): number
}

// // Interface extending others
interface Admin extends User {
  role: Role
}


// Type
// type is more flexible then interface
// It can define:
// Union types
// Intersection types
// Function types
// Primitive combinations

//Union type
export type Status = "pending" | "approved" | "rejected"
let orderStatus: Status = "approved";


//Intersection type

type Person = {
  name: string
}

type Employee = Person & {
  salary: number
}

const emp: Employee = {
  name: "Anjali",
  salary: 30000000
}

//Function type

type addNum = (a: number, b: number) => number
const add: addNum = (a, b) => a + b


// Classes

// basic class
class Personn {
  private id: number;
  public name: string;
  protected age: number


  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  introduce(): string {
    return `Hi, I'm ${this.name}`
  }
}


// inheritance

class Employeee extends Personn {
  constructor(
    id: number,
    name: string,
    age: number,
    public salary: number) {
    super(id, name, age)
  }
  getSalary(): number{
    return this.salary;
  }
}


// class implementing interface

class Car implements Vehicle {
constructor(public brand:string) {}
  start(): string{
    return "Car started"
 }
}

interface Vehicle{
  start():string
}


//Generics
// genrics allow reusable, type-safe components
// instead of fixing a type , we use a placholders


// generic fun
function identity<T>(value:T):T{
  return value
}

const num= identity<number>(10)
const str = identity<string>("Hello")

// generic interface

interface Box<T>{
  value:T
}

// generic class 
class Container<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);

// generic contraint

interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T) {
  console.log(arg.length);
}

logLength("Hello");
logLength([1, 2, 3]);


// UTILITY TYPES
// 🔹 Partial<T>

// Makes all properties optional.

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type UpdateTask = Partial<Task>;

const update: UpdateTask = {
  completed: true
};


// 🔹 Pick<T, K>

// Select specific properties.

type TaskPreview = Pick<Task, "id" | "title">;

const preview: TaskPreview = {
  id: 1,
  title: "Learn TS"
};

// 🔹 Omit<T, K>

// Remove specific properties.

type NewTask = Omit<Task, "id">;

const newTask: NewTask = {
  title: "New Task",
  completed: false
};

// 🔹 Record<K, T>

// Creates object type with defined keys.

type Role = "admin" | "user";

type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write"],
  user: ["read"]
};


// What is an Enum?

// Enums define a set of named constants.

// Numeric Enum
enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

const responseCode: StatusCode = StatusCode.OK;
//String Enum
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

const role: UserRole = UserRole.ADMIN;



// enum Role {
//   ADMIN = "ADMIN",
//   USER = "USER"
// }

interface BaseEntity {
  id: number;
}

interface User extends BaseEntity {
  name: string;
  role: Role;
}

class UserRepository<T extends BaseEntity> {
  private data: T[] = [];
  private nextId = 1;

  create(item: Omit<T, "id">): T {
    const newItem = { ...item, id: this.nextId++ } as T;
    this.data.push(newItem);
    return newItem;
  }

  update(id: number, item: Partial<Omit<T, "id">>) {
    const found = this.data.find(d => d.id === id);
    if (!found) return undefined;
    Object.assign(found, item);
    return found;
  }
}

// const repo = new UserRepository<User>();

// const newUser = repo.create({
//   name: "Anjali",
//   role: Role.ADMIN
// });

// repo.update(newUser.id, { name: "Anjali Sharma" });