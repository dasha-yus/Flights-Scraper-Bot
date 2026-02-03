import { Browser } from "puppeteer";

import { navigateToPage } from "../utils/browser";
import { Airline, FlightSearchParams, ScrapingResult } from ".";
import { parseDate } from "../utils/date";

export const scrapeSas = async (browser: Browser, params: FlightSearchParams): Promise<ScrapingResult> => {
    const sasUrl = process.env.SAS_URL
    if (!sasUrl) {
        throw new Error("SAS_URL was not provided")
    }
    const { year, month, day } = parseDate(params.date);
    const url = `${sasUrl}?origin=${params.from}&destination=${params.to}&outboundDate=${year}-${month}-${day}&adults=1&youths=0&children=0&infants=0`;
    const page = await navigateToPage(browser, url);
    await page.waitForSelector('[data-testid="upsell-flight-row-outbound-direct"]');

    const prices = [];
    const flightElementsHandles = await page.$$('[data-testid="upsell-flight-row-outbound-direct"]');
    for (const flightHandle of flightElementsHandles) {
        const economyPrice = await flightHandle.$eval('button[data-testid*="upsell-lowestFare-button-0"]', btn => {
            const text = btn.innerText || '';
            const priceMatch = text.match(/([\d,.]+)/);
            if (!priceMatch) return null;
            return parseFloat(priceMatch[1].replace(',', '.'));
        }).catch(() => null);

        prices.push(economyPrice);
    }

    await page.close();
    return {
        ...params,
        label: Airline.SAS,
        prices: prices.filter(price => price !== null),
    };
}