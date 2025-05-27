import { ScrapingResult } from "../scrapers";
import { formatDate } from "./date";

export const transformMessage = (flights: Array<ScrapingResult>): string => {
    // Group flights by date
    const groupedFlights = flights
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .reduce((acc, flight) => {
            const flightKey = `${flight.from} - ${flight.to} (${formatDate(flight.date)})`;
            if (!acc[flightKey]) {
                acc[flightKey] = [];
            }
            acc[flightKey].push(flight);
            return acc;
        }, {} as Record<string, ScrapingResult[]>);

    // Build the message
    const flightsMsg = Object.entries(groupedFlights).reduce((msg, [date, flightsOnDate]) => {
        const flightsForDate = flightsOnDate
            .map((flight) => {
                const pricesStr = convertPricesToString(flight.prices, flight.currency);
                return `${flight.label}: ${pricesStr}`;
            })
            .join("\n");
        return msg + `${date}\n${flightsForDate}\n\n`;
    }, "");

    const message = `✈︎ Flights data\n\n${flightsMsg}`;
    return message;
};

const convertPricesToString = (prices: number[], currency?: string) => {
    return prices.map(price => `${price}${currency ?? '€'}`).join(', ')
}