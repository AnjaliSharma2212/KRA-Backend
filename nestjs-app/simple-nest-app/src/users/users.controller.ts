import { Controller, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { CurrentUser } from "src/decorators/currentUser";
import { Roles } from "src/decorators/roles.decorator";
import { PaginationDto } from "src/dto/pagination.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { ResponseInterceptor } from "src/interceptors/response-interceptor";

@Controller()
export class UsersController{
    constructor(private authService:AuthService){}

    @Get('list')
    @UseGuards(AuthGuard)
    list(@Query() query: PaginationDto){
        const user= this.authService.getUsers()

        const page=Number(query.page) || 1;
        const limit= Number(query.limit) || 5;

        const start= (page-1) * limit;
        const end= start+limit
        return{
            page, 
            limit,
            data:user.slice(start,end)
        }
    }
@Get('admin')
@UseGuards(AuthGuard)
@Roles('admin')
adminPage(){
    return {message:"Welcome to admin page"}
}


@Get('user')
@UseGuards(AuthGuard)
@Roles('user')
userPage(){
    return {message:"Welcome to user page"}
}

  @Get('profile')
  getProfile(@CurrentUser() user) {
    return { message: 'Your profile', user };
  }

 
  @Get('admin')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  getAdmin(@CurrentUser() user) {
    return { secret: 'Admin dashboard data', user };
  }
}