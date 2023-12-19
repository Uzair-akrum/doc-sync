import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { KafkajsProducer } from 'src/kafka/kafka.producer';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducer: KafkajsProducer,
  ) {}
  async create(createPostInput: CreatePostInput) {
    const { title, authorId, content } = createPostInput;
    const post = await this.prisma.post.create({
      data: { title, authorId, content },
    });
    await this.kafkaProducer.produce(
      'notify',
      post.authorId.toString(),
      post,
    );
    return post;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
