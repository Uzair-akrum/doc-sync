import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}
  @Post('/login')
  async loginUser(@Body() loginUserDto: any) {
    console.log(
      '🚀 ~ UserController ~ loginUser ~ loginUserDto:',
      loginUserDto,
    );
    const { username } = loginUserDto;
    const user = await this.prismaService.user.findFirst({
      where: { name: username },
    });
    return user;
  }

 
}
