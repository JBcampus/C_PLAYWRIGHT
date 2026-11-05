FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npx playwright install --with-deps chromium --only-shell \
    && rm -rf /var/lib/apt/lists/*

COPY . .

CMD ["npm", "run", "ci"]