# FROM ghcr.io/puppeteer/puppeteer:24.9.0
FROM node:18-alpine

# Install Chromium and dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    dumb-init

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_DISABLE_DEV_SHM_USAGE=true

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "ts-node", "src/index.ts"]