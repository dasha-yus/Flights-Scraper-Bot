# FROM ghcr.io/puppeteer/puppeteer:24.9.0

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm ci
# COPY . .
# CMD ["npx", "ts-node", "src/index.ts"]

# FROM ghcr.io/puppeteer/puppeteer:24.9.0

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm ci
# COPY . .
# CMD ["npx", "ts-node", "src/index.ts"]
FROM node:18-slim

# Install dependencies for Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your application code
COPY . .

# Start the application
CMD ["npx", "ts-node", "src/index.ts"]