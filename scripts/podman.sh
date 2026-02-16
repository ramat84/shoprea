#!/usr/bin/env bash

podman kill react-shop;
podman run \
    -d \
    --replace \
    --name react-shop \
    -p 3000:3000 \
    -p 4000:4000 \
    --mount type=bind,source="$PWD",destination="/app" \
    -v /app/node_modules \
    react-shop && podman logs \
    -f react-shop
