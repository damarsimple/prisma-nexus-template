import { extendType, nonNull, objectType, stringArg } from "nexus";
import { relayToPrismaPagination } from "../utils/pagination";

export const Post = objectType({
  name: "Post", // <- Name of your type

  definition(t) {
    t.nonNull.string("id"); // <- Field named `id` of type `Int`

    t.string("title"); // <- Field named `title` of type `String`

    t.string("body"); // <- Field named `body` of type `String`

    t.boolean("published"); // <- Field named `published` of type `Boolean`
  },
});

export const nullToUndefined = <T>(e: T | null) => {
  if (e == null) return undefined;

  return e;
};

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.connectionField("posts", {
      type: Post,
      additionalArgs: { title: stringArg() },
      cursorFromNode(node) {
        // Can be configured globally in the plugin constructor
        return node?.id ?? "";
      },
      async nodes(_, args, ctx, info) {
        return ctx.db.post.findMany({
          where: {
            title: {
              contains: nullToUndefined(args?.title),
            },
          },
          ...relayToPrismaPagination(args),
        });
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDraft", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        const draft = {
          title: args.title,
          body: args.body,
          published: false,
        };
        return ctx.db.post.create({ data: draft });
      },
    });
  },
});
