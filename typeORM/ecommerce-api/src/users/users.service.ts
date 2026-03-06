import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';



@Injectable()
export class UsersService {
    constructor(
     @InjectRepository(User)
     private userRepo: Repository<User>
    ){}

   createUser(@Body('name') name:string , @Body('email') email: string){
    let user = this.userRepo.create({ name, email })
    return this.userRepo.save(user)
   }
   findAll(){
    return this.userRepo.find()
   }
}

