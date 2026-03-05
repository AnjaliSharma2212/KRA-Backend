import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  getUsers() {
    return [
      { id: 1, name: "Anjali" },
      { id: 2, name: "Rahul" }
    ];
  }

}