import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser } from "puppeteer";

puppeteer.use(StealthPlugin());

export const setupBrowser = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // executablePath: process.env.NODE_ENV === "production"
        //     ? process.env.PUPPETEER_EXECUTABLE_PATH
        //     : puppeteer.executablePath(),
        // headless: false,
        // slowMo: 250,
        // devtools: true
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