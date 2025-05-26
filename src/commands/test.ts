import { Context } from "grammy";

export const test = async (ctx: Context) => {
    await ctx.reply('Test command');
}