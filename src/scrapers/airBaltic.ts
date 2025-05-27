import { Browser } from "puppeteer";

import { navigateToPage } from "../utils/browser";
import { Airline, FlightSearchParams, ScrapingResult } from ".";
import { parseDate } from "../utils/date";

export const scrapeAirBaltic = async (browser: Browser, params: FlightSearchParams): Promise<ScrapingResult> => {
    const airBalticUrl = process.env.AIR_BALTIC_URL
    if (!airBalticUrl) {
        throw new Error("AIR_BALTIC_URL was not provided")
    }
    const { year, month, day } = parseDate(params.date);
    const url = `${airBalticUrl}?l=en&departure=${year}-${month}-${day}&originCode=${params.from}&destinCode=${params.to}&numAdt=1&numChd=0&numInf=0&numYth=0&tripType=oneway`
    const page = await navigateToPage(browser, url);
    await page.waitForSelector('.flights__item');
    const prices = await page.$$eval('.flights__item-direct', (directElements) => {
        return directElements.map((directElement) => {
            const parent = directElement.closest('.flights__item');
            if (!parent) return null;

            const priceElement = parent.querySelector('.flights__item-price strong span');
            const mainValue = priceElement?.childNodes[0].textContent; // Get the main number
            const subValue = priceElement?.querySelector('sup').textContent; // Get the superscript value
            return mainValue ? parseFloat(`${mainValue}.${subValue}`) : null;
        }).filter(price => price !== null);
    });
    await page.close();
    return {
        ...params,
        label: Airline.AirBaltic,
        prices: prices,
    };
}