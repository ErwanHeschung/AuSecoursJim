#!/bin/bash

function compile_dir()
{
    cd $1
    ./build.sh
    cd ..
}

function compile_dir_all()
{
    cd $1
    ./build-all.sh
    cd ..
}

echo "** Compiling all"


compile_dir_all "backend"

compile_dir "bff"

echo "** Done all"

