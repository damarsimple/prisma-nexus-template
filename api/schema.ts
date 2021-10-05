// api/schema.ts

import { connectionPlugin, makeSchema } from "nexus";

import { join } from "path";

import * as types from "./graphql";

export const schema = makeSchema({
  types,
  plugins: [connectionPlugin({ includeNodesField: true })],
  outputs: {
    typegen: join(__dirname, "../nexus-typegen.ts"),

    schema: join(__dirname, "../schema.graphql"),
  },
  contextType: {
    // 1

    module: join(__dirname, "./context.ts"), // 2

    export: "Context", // 3
  },
});
