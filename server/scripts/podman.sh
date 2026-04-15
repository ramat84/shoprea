#!/usr/bin/env bash

podman kill shoprea-server;
podman run \
    -d \
    --replace \
    --name shoprea-server \
    -p 4000:4000 \
    --mount type=bind,source="$PWD",destination="/app" \
    --mount type=bind,source="$PWD/../client/public",destination="/app/public" \
    -v /app/node_modules \
    shoprea-server && podman logs \
    -f shoprea-server
