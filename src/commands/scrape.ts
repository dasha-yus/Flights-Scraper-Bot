import { Context } from "grammy";

import { scrapeFlights } from "../scrapers";
import { transformMessage } from "../utils/text";

export const scrape = async (ctx: Context) => {
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
}