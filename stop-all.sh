#!/bin/bash

echo "Stopping backend"
cd backend
./stop-all.sh
cd ..

echo "Stopping BFF"
cd bff
./stop.sh
cd ..

echo "All stopped"
