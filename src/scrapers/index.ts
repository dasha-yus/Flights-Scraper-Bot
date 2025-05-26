import { setupBrowser } from "../utils/browser";
import { scrapeNorwegian } from "./norwegian";

export enum Airline {
    Norwegian = "Norwegian",
}

export type ScrapingResult = {
    label: Airline,
    price: number,
}

export const scrapeFlights = async (attempts = 5): Promise<Array<ScrapingResult>> => {
    let browser;
    try {
        browser = await setupBrowser();
        const norwegian = await scrapeNorwegian(browser, { from: 'OSL', to: 'VNO', date: new Date("2025-07-10") });
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