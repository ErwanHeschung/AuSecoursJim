#!/bin/bash

echo "stopping group-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-group.yml down
