FROM ubuntu:24.04

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y vim nodejs python3 make g++ && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 3000 4000

CMD npm ci
CMD npx prisma generate
CMD npx vite build
CMD npx nodemon server.ts &
CMD npm run client #  -- --host 0.0.0.0
