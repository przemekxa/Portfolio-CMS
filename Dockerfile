FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /app

COPY ./ /app/

RUN npm ci
RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN ls /app

COPY --from=BUILD_IMAGE /app/.env ./
COPY --from=BUILD_IMAGE /app/entry.js ./
COPY --from=BUILD_IMAGE /app/package.json ./
COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/build-server ./build-server
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/src/server/views ./build-server/server/views
COPY --from=BUILD_IMAGE /app/src/server/assets ./build-server/server/assets

# drop root privileges
RUN addgroup -g 10000 -S app && \
     adduser -u 10000 -G app -S app
USER app

CMD ["npm", "run", "prod"]