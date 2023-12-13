import { Field, ID, InputType } from '@nestjs/graphql';

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
  @Field(() => ID)
  userId: number;
  @Field(() => ID)
  followerId: number;
}
