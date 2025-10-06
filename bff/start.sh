#!/bin/bash

echo "starting bff"
docker compose --env-file ./.env.docker -f docker-compose-bff.yml up -d
