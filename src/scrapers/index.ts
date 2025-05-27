import { setupBrowser } from "../utils/browser";

// import { scrapeAirBaltic } from "./airBaltic";
import { scrapeNorwegian } from "./norwegian";

export enum Airline {
    Norwegian = "Norwegian",
    AirBaltic = "AirBaltic",
}

export type FlightSearchParams = {
    from: string;
    to: string;
    date: Date;
}

export type ScrapingResult = {
    date: Date,
    from: string,
    to: string;
    label: Airline,
    prices: number[],
}

export const scrapeFlights = async (attempts = process.env.MODE_ENV === 'production' ? 5 : 1): Promise<Array<ScrapingResult>> => {
    let browser;
    try {
        browser = await setupBrowser();
        const norwegian = await scrapeNorwegian(browser, { from: 'OSL', to: 'VNO', date: new Date("2025-07-10") });
        // const airBaltic = await scrapeAirBaltic(browser, { from: 'AMS', to: 'VNO', date: new Date("2025-07-16") });
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