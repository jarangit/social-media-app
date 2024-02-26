/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext,
} from "~/server/api/trpc";
interface IGetInfiniteTweets {
  whereClause?: Prisma.TweetWhereInput;
  limit: number;
  cursor: { id: string; createdAt: Date } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}
async function getInfiniteTweets({
  whereClause,
  ctx,
  limit,
  cursor,
}: IGetInfiniteTweets) {
  const currentUserId = ctx.session?.user.id
  const data = await ctx.db.tweet.findMany({
    take: limit + 1,
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    where: whereClause,
    select: {
      id: true,
      content: true,
      createdAt: true,
      _count: { select: { likes: true } },
      likes: currentUserId == null ? false : { where: { userId: currentUserId } },
      user: {
        select: {
          name: true,
          id: true,
          image: true,
        }
      }
    }
  })

  let nextCursor: typeof cursor | undefined
  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem != null) {
      nextCursor = {
        id: nextItem.id,
        createdAt: nextItem.createdAt,
      }
    }
  }

  return {
    tweets: data.map((tweet) => {
      return {
        id: tweet.id,
        content: tweet.content,
        createdAt: tweet.createdAt,
        likeCount: tweet._count.likes,
        user: tweet.user,
        likeByMe: tweet.likes?.length > 0
      }
    })
  }
}

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object(
        { content: z.string() }
      )
    )
    .mutation(async ({ input: { content }, ctx }) => {
      const tweet = await ctx.db.tweet.create({
        data: {
          content,
          userId: ctx.session.user.id
        }
      })
      return tweet
    }),
  infiniteFeed: publicProcedure
    .input(
      z.object({
        onlyFollowing: z.boolean().optional(),
        limit: z.number().optional(),
        cursor: z.object({
          id: z.string(),
          createdAt: z.date()
        }).optional()
      })
    )
    .query(async ({
      input: {
        limit = 10,
        onlyFollowing = false,
        cursor
      }, ctx
    }) => {
      const currentUserId = ctx.session?.user.id
      const res = await getInfiniteTweets({
        limit,
        ctx,
        cursor,
        whereClause:
          currentUserId == null || !onlyFollowing ? undefined : { user: { followers: { some: { id: currentUserId } } } }
      }
      )
      return res
    })
})