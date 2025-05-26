import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError } from 'grammy';
import express from 'express';

import { scrape, test } from './commands';

dotenv.config();

const app = express()
const bot = new Bot(process.env.BOT_TOKEN || '');

bot.api.setMyCommands([
    { command: 'test', description: 'Test bot' },
    { command: 'scrape', description: 'Scrape flights' },
])

bot.command('test', test)

bot.command('scrape', scrape)

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

const port = process.env.PORT ? +process.env.PORT : 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});

app.get('/', (req, res) => {
    res.send('Flights scraper bot')
})