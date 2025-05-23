import { setupBrowser } from "../utils";
import { scrapeNorwegian } from "./norwegian";

export enum Airline {
    Norwegian = "Norwegian",
}

export type ScrapingResult = {
    label: Airline,
    price: number,
}

export const scrapeFlights = async (attempts = 3): Promise<Array<ScrapingResult>> => {
    let browser;
    try {
        browser = await setupBrowser();
        const norwegian = await scrapeNorwegian(browser);
        return [norwegian];
    } catch (error) {
        console.error('Scraping error:', error);
        if (attempts > 1) {
            console.log(`Retrying... Attempts left: ${attempts - 1}`);
            return scrapeFlights(attempts - 1); // Retry the function
        }
        return []; // Return an empty array if all attempts fail
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}