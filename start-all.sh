#!/bin/bash

echo "Starting backend"
cd backend
./start-all.sh
cd ..

echo "Starting BFF"
cd bff
./start.sh
cd ..

echo "All started"
