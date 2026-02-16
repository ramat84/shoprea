FROM ubuntu:24.04

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y vim nodejs python3 make g++ && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma/ prisma/
COPY prisma.config.ts ./
RUN npx prisma generate

EXPOSE 3000 4000

CMD npx nodemon --exec "npx tsx" server.ts & npx vite --host 0.0.0.0
