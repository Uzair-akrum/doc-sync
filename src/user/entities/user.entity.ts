import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: false })
  email: string;
  @Field(() => String, { nullable: false })
  password: string;
}
