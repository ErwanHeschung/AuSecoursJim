#!/bin/bash

API_URL="http://localhost:9500/kitchen"
PREPARATION_PATH="/preparations?state=preparationStarted"
PREPARATION_ITEM_PATH="/preparedItems"

while true; do
  # Get the JSON response
  response=$(curl -s "$API_URL$PREPARATION_PATH")

  # Extract each preparedItem block
  echo "$response" | tr -d '\n' | \
    sed 's/},[[:space:]]*{/\}\n\{/g' | \
    grep '"shortName"' | while read -r item; do
    
    # Extract fields with regex
    item_id=$(echo "$item" | sed -n 's/.*"_id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
    short_name=$(echo "$item" | sed -n 's/.*"shortName"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
    started_at=$(echo "$item" | grep -o '"startedAt":[^,}]*' | cut -d: -f2- | tr -d ' "')
    finished_at=$(echo "$item" | grep -o '"finishedAt":[^,}]*' | cut -d: -f2- | tr -d ' "')

    if [[ "$started_at" == "null" ]]; then
      echo "Starting $short_name ($item_id)"
      curl -s -X POST "$API_URL$PREPARATION_ITEM_PATH/$item_id/start" > /dev/null

      sleep 1

      echo "Finishing $short_name ($item_id)"
      curl -s -X POST "$API_URL$PREPARATION_ITEM_PATH/$item_id/finish" > /dev/null
    fi
  done

  sleep 5
done
