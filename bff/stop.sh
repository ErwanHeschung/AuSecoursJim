#!/bin/bash

echo "stopping bff"
docker-compose --env-file ./.env.docker \
               --file docker-compose-bff.yml down -v
