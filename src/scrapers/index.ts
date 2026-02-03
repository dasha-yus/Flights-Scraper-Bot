import { setupBrowser } from "../utils/browser";

// import { scrapeNorwegian } from "./norwegian";
// import { scrapeAirBaltic } from "./airBaltic";
// import { scrapeRyanair } from "./ryanair";
import { scrapeSas } from "./sas";

export enum Airline {
    Norwegian = "Norwegian",
    AirBaltic = "AirBaltic",
    Ryanair = "Ryanair",
    SAS = "SAS",
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
    currency?: string,
}

export const scrapeFlights = async (attempts = process.env.MODE_ENV === 'production' ? 5 : 1): Promise<Array<ScrapingResult>> => {
    let browser;
    try {
        browser = await setupBrowser();
        // const norwegian = await scrapeNorwegian(browser, { from: 'OSL', to: 'VNO', date: new Date("2026-07-10") });
        // const airBaltic = await scrapeAirBaltic(browser, { from: 'VNO', to: 'NCE', date: new Date("2026-07-11") });
        // const airBaltic2 = await scrapeAirBaltic(browser, { from: 'NCE', to: 'VNO', date: new Date("2026-07-14") });
        // const ryanair = await scrapeRyanair(browser, { from: 'ARN', to: 'VNO', date: new Date("2026-03-14") });
        const sas = await scrapeSas(browser, { from: 'ZRH', to: 'ARN', date: new Date("2026-07-16") });
        // return [airBaltic, airBaltic2];
        return [sas];
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