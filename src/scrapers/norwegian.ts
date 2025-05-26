import { Browser } from "puppeteer";

import { navigateToPage } from "../utils/browser";
import { Airline, ScrapingResult } from ".";
import { parseDate } from "../utils/date";

type NorwegianSearchParams = {
    from: string;
    to: string;
    date: Date;
}

export const scrapeNorwegian = async (browser: Browser, params: NorwegianSearchParams): Promise<ScrapingResult> => {
    const norwegianUrl = process.env.NORWEGIAN_URL
    if (!norwegianUrl) {
        throw new Error("NORWEGIAN_URL was not provided")
    }
    const { year, month, day } = parseDate(params.date);
    const url = `${norwegianUrl}?D_City=${params.from}&A_City=${params.to}&TripType=1&D_Day=${day}&D_Month=${year}${month}&D_SelectedDay=${day}&IncludeTransit=false&CurrencyCode=EUR`
    const page = await navigateToPage(browser, url);
    const price = await page.$eval('.avadaytable .standardlowfareplus label', (element: any) => element.textContent.trim());
    await page.close();
    return {
        label: Airline.Norwegian,
        price: +price,
    };
}