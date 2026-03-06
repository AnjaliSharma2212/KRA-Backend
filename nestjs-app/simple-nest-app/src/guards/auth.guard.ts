import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken"


@Injectable()
export class AuthGuard implements CanActivate{
     canActivate(context: ExecutionContext): boolean {
         const request= context.switchToHttp().getRequest()
         const token = request.headers.authorization;

         if(!token) {
            return false
         }
         try {
            const decoded= jwt.verify(token, 'secret')
            request.user= decoded
            return true
         } catch (error) {
            return false
         }
     }
}