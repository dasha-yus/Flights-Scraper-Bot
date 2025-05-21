import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError } from 'grammy';

import { transformMessage } from './utils';
import { scrapeFlights } from './scrapers';

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN || '');

bot.api.setMyCommands([
    { command: 'test', description: 'Test bot' },
    { command: 'scrape', description: 'Scrape flights' },
])

bot.command('test', async (ctx) => {
    await ctx.reply('Test command');
})

bot.command('scrape', async (ctx) => {
    const flights = await scrapeFlights();
    if (flights.length) {
        const message = transformMessage(flights);
        try {
            await ctx.reply(message);
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Failed to scrape flights', error);
        }
    }
})

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

bot.start();