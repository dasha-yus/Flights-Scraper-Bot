import puppeteer, { Browser } from "puppeteer";
import { ScrapingResult } from "../scrapers";

export const setupBrowser = async () => {
    const browser = await puppeteer.launch({
        // Headless option allows us to disable visible GUI, so the browser runs in the "background"
        // for development lets keep this to true so we can see what's going on but in
        // on a server we must set this to true
        headless: false,
    })
    return browser;
}

export const navigateToPage = async (browser: Browser, url: string) => {
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'domcontentloaded', // Wait for the DOM to be fully loaded
    });
    return page;
}

export const transformMessage = (flights: Array<ScrapingResult>) => {
    const flightsMsg = flights.reduce((msg, flight) => msg + `${flight.label}: ${flight.price}€\n`, '');
    const message = `✈︎ Daily Update\nTime: ${new Date().toLocaleString()}\n\nOslo - Vilnius (10.07)\n${flightsMsg}`;
    return message;
}