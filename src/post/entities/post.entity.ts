import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  authorId: number;
}
