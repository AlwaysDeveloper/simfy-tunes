FROM node:18-alpine as builder

ENV NOVE_ENV build

USER node
RUN npm ci

COPY --chown=node:node . .
RUN npm run build && npm prune --dev

FROM node:18-alpine

ENV NOVE_ENV dev

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/server.js"]