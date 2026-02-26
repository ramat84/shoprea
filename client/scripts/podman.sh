#!/usr/bin/env bash

podman kill shoprea-client;
podman run \
    -d \
    --replace \
    --name shoprea-client \
    -p 3000:3000 \
    --mount type=bind,source="$PWD",destination="/app" \
    -v /app/node_modules \
    shoprea-client && podman logs \
    -f shoprea-client
