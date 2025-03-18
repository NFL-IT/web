FROM node:18-alpine
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN rm -rf .next

ENV DATABASE_URL=postgresql://NFL:root@db:5432/NFLIT

RUN npx drizzle-kit generate

RUN npm run build

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT [ "/app/entrypoint.sh" ]