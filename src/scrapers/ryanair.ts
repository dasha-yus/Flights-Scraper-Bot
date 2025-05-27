import { Browser } from "puppeteer";

import { navigateToPage } from "../utils/browser";
import { Airline, FlightSearchParams, ScrapingResult } from ".";
import { parseDate } from "../utils/date";
import { delay } from "../utils/common";

export const scrapeRyanair = async (browser: Browser, params: FlightSearchParams): Promise<ScrapingResult> => {
    const ryanairUrl = process.env.RYANAIR_URL
    if (!ryanairUrl) {
        throw new Error("RYANAIR_URL was not provided")
    }
    const { year, month, day } = parseDate(params.date);
    const url = `${ryanairUrl}?adults=1&teens=0&children=0&infants=0&dateOut=${year}-${month}-${day}&isReturn=false&originIata=${params.from}&destinationIata=${params.to}`
    const page = await navigateToPage(browser, url);
    await page.waitForSelector('.cookie-popup-with-overlay__buttons');
    await page.click('[data-ref="cookie.no-thanks"]');
    await delay(4000);
    await page.waitForSelector('flight-list');

    const flightPrices = await page.$$eval('flight-card-new', cards => {
        return cards.map(card => {
            const priceElement = card.querySelector('flights-price-simple');

            if (!priceElement) {
                return null;
            }

            const match = priceElement.innerText.match(/^([^\d]+)?([\d,]+(\.\d+)?)/);

            if (!match) {
                return null;
            }

            const prefix = match[1]?.trim() || ''; // Extracts the prefix (e.g., €, Nkr)
            const number = parseFloat(match[2].replace(/,/g, '')); // Extracts the number and removes commas

            return { prefix, number }
        }).filter(price => price !== null);
    });
    await page.close();
    return {
        ...params,
        label: Airline.Ryanair,
        prices: flightPrices.map(flight => flight.number),
        currency: flightPrices?.[0].prefix
    };
}