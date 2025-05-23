import puppeteer, { Browser } from "puppeteer";
import { ScrapingResult } from "../scrapers";

export const setupBrowser = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // executablePath: process.env.NODE_ENV === "production"
        //     ? process.env.PUPPETEER_EXECUTABLE_PATH
        //     : puppeteer.executablePath(),
        // headless: false
        headless: true,
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