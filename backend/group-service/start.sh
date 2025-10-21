#!/bin/bash

source ../framework.sh

echo "starting group-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-group.yml up -d

wait_on_health http://localhost:3003 ${PWD##*/}
