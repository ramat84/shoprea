#!/usr/bin/env bash

podman kill shoprea-server;
podman run \
    -d \
    --replace \
    --name shoprea-server \
    -p 4000:4000 \
    --mount type=bind,source="$PWD",destination="/app" \
    -v /app/node_modules \
    shoprea-server && podman logs \
    -f shoprea-server
