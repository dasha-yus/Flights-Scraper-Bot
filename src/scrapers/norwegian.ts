import { Browser } from "puppeteer";

import { navigateToPage } from "../utils";
import { Airline, ScrapingResult } from ".";

export const scrapeNorwegian = async (browser: Browser): Promise<ScrapingResult> => {
    const norwegianUrl = process.env.NORWEGIAN_URL
    if (!norwegianUrl) {
        throw new Error("NORWEGIAN_URL was not provided")
    }
    const page = await navigateToPage(browser, norwegianUrl);
    const price = await page.$eval('.avadaytable .standardlowfareplus label', (element: any) => element.textContent.trim());
    await page.close();
    return {
        label: Airline.Norwegian,
        price: +price,
    };
}