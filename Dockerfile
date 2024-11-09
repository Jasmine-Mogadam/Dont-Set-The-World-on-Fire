# Build stage
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Production stage
FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000 8080

CMD ["npm", "start"]
