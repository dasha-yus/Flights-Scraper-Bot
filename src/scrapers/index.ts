import { setupBrowser } from "../utils";
import { scrapeNorwegian } from "./norwegian";

export enum Airline {
    Norwegian = "Norwegian",
}

export type ScrapingResult = {
    label: Airline,
    price: number,
}

export const scrapeFlights = async (): Promise<Array<ScrapingResult>> => {
    let browser;
    try {
        browser = await setupBrowser();

        const norwegian = await scrapeNorwegian(browser);

        return [norwegian];
    } catch (error) {
        console.error('Scraping error:', error);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}