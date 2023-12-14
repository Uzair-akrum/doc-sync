import { Injectable } from '@nestjs/common';
import { CreateUserInput, CreateFollowerInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Mutation } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { KafkajsConsumer } from 'src/kafka/kafka.consumer';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaConsumer: KafkajsConsumer,
  ) {}

  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({ data: createUserInput });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async followUser(createFollowerInput: CreateFollowerInput) {
    const post = await this.prisma.userFollower.create({
      data: createFollowerInput,
    });
    await this.kafkaConsumer.consume('notify', {
      key: '1',
      value: JSON.stringify(post),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
