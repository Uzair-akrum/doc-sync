
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    exampleField?: Nullable<number>;
}

export class UpdateUserInput {
    id: number;
}

export class User {
    exampleField?: Nullable<number>;
}

export abstract class IQuery {
    abstract user(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract users(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract create(createUserInput: CreateUserInput): User | Promise<User>;

    abstract update(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract remove(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
