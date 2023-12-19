import { Field, ID, InputType, ObjectType ,Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: false })
  email: string;
  @Field(() => String, { nullable: false })
  password: string;
}

@InputType()
export class CreateFollowerInput {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  followerId: number;
}
@ObjectType()
export class UserFollowerOutput {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  followerId: number;
}
