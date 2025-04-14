ARG NODE_VERSION=22

FROM node:${NODE_VERSION:-22}-alpine AS builder








RUN apk update && apk upgrade

ENV WORKDIR="fabric-weaver"

COPY ./src/ $WORKDIR/src/
COPY ./package*.json $WORKDIR/
COPY ./.mpmrc $WORKDIR/

RUN --mount=type=secret,id=TOKEN TOKEN=$(cat /run/secrets/TOKEN) && cd $WORKDIR npm ci && npm cache clean --force && npm run build:prod && chown -R node:node .

FROM node:${NODE_VERSION:-22}-alpine AS production

RUN apk update && apk upgrade
RUN apk --no-cache add htop less grep && apk add --no-cache --upgrade bash # optional but useful

ENV WORKDIR="ts-workspace"

ENV NODE_ENV="production"

#COPY --from=builder --chown=node:node $WORKDIR/dist $WORKDIR/ #one or the other usually
COPY --from=builder --chown=node:node $WORKDIR/bin $WORKDIR/bin/
COPY --from=builder --chown=node:node $WORKDIR/package*.json $WORKDIR/

USER node

RUN --mount=type=secret,id=TOKEN TOKEN=$(cat /run/secrets/TOKEN) cd $WORKDIR && npm ci && npm cache clean --force && chown -R node:node .

WORKDIR $WORKDIR

# EXPOSE 3000/tcp

ENTRYPOINT ["node", "cli"]

LABEL name="Base image" description="Base image need adjustments"

