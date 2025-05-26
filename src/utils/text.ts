import { ScrapingResult } from "../scrapers";

export const transformMessage = (flights: Array<ScrapingResult>) => {
    const flightsMsg = flights.reduce((msg, flight) => msg + `${flight.label}: ${flight.price}€\n`, '');
    const message = `✈︎ Flights data\n\nOslo - Vilnius (10.07)\n${flightsMsg}`;
    return message;
}