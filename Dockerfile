# ----------------------------------------
## Build for Local development
# ----------------------------------------
FROM node:18-alpine as development

# ----------------------------------------
## Build for production
# ----------------------------------------
FROM development as build

ARG JWT_SECRET
ARG JWT_EXPIRES_IN
ARG DATABASE_CONNECTION
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG DATABASE_NAME
ARG SWAGGER_URL
ARG API_AUTH_USER
ARG API_AUTH_PASSWORD
ARG AWS_LOG_GROUP_NAME
ARG AWS_LOG_STREAM_NAME
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION

RUN echo "JWT_SECRET=$JWT_SECRET" >> .env.production
RUN echo "JWT_EXPIRES_IN=$JWT_EXPIRES_IN" >> .env.production
RUN echo "DATABASE_CONNECTION=$DATABASE_CONNECTION" >> .env.production
RUN echo "DATABASE_HOST=$DATABASE_HOST" >> .env.production
RUN echo "DATABASE_PORT=$DATABASE_PORT" >> .env.production
RUN echo "DATABASE_USERNAME=$DATABASE_USERNAME" >> .env.production
RUN echo "DATABASE_PASSWORD=$DATABASE_PASSWORD" >> .env.production
RUN echo "DATABASE_NAME=$DATABASE_NAME" >> .env.production
RUN echo "SWAGGER_URL=$SWAGGER_URL" >> .env.production
RUN echo "API_AUTH_USER=$API_AUTH_USER" >> .env.production
RUN echo "API_AUTH_PASSWORD=$API_AUTH_PASSWORD" >> .env.production
RUN echo "AWS_LOG_GROUP_NAME=$AWS_LOG_GROUP_NAME" >> .env.production
RUN echo "AWS_LOG_STREAM_NAME=$AWS_LOG_STREAM_NAME" >> .env.production
RUN echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> .env.production
RUN echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" >> .env.production
RUN echo "AWS_REGION=$AWS_REGION" >> .env.production

COPY . .

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production

# for devDependencies
RUN NODE_ENV=development npm ci 
RUN NODE_ENV=production npm run build
RUN npm prune --production
USER node

# ----------------------------------------
## Run for production
# ----------------------------------------
FROM development as production

COPY --chown=node:node --from=build /dist /dist
COPY --chown=node:node --from=build /node_modules /node_modules
COPY --chown=node:node --from=build /storage /storage
COPY --chown=node:node --from=build /.env.production /.env.production

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
EXPOSE 3000
USER node
