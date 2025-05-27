# Flights Scraper Bot

Welcome to the Flights Scraper Bot! This application is designed to help you effortlessly track flight information and receive updates directly through Telegram.

## Overview

The Flights Scraper Bot is a powerful tool that scrapes flight data based on specific commands you provide. It sends real-time messages to your Telegram account, delivering essential details such as:
 - Flight Dates
 - Destinations
 - Prices

With this bot, you can stay informed about the latest flight options without the hassle of manual searches.

## Engine
 - NodeJS v.22.15.0


## Config

### Dev Environment

 - Create config file `.env`
 - Copy variables from `Environment variables` section
 - Set respective values
 - `npm install`
 - `npm run start:dev`


### Environment variables

  - BOT_TOKEN - telegram bot token
  - NODE_ENV - (development, production)
  - PORT - server port
  - NORWEGIAN_URL - Norwegian website url
  - AIR_BALTIC_URL - AirBaltic website url
