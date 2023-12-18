// src/generate-typings.ts

import { GraphQLSchemaHost } from '@nestjs/graphql';
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { writeFile } from 'fs/promises';

async function generateTypings() {
  const schemaHost = new GraphQLSchemaHost();
  const graphqlDefinitionsFactory = new GraphQLDefinitionsFactory();
}

generateTypings();
