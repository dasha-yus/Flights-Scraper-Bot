FROM ghcr.io/puppeteer/puppeteer:24.9.0

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "ts-node", "src/index.ts"]