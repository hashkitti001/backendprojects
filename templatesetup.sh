#!/usr/bin/bash
# Setup v1.0.0
# A simple script to create a new project directory 
# and set up a basic Express project structure

# I'll extend the functionality for frameworks like Fastify later on

# Colors 
GREEN='\033[0;32m'
RED='\033[0;31m'

# Create project directory
mkdir -p "$1"

# Check if project name is provided
if [ "$#" -lt 1 ]; then
    echo -e "${RED}Error: No project name provided"
    echo -e "${RED}Syntax: projectsetup.sh <project_name>"
    exit 1
else
    echo -e "${GREEN}Creating project directory $1"
    cd "$1" || exit

    # Initialize npm project
    npm init -y

    echo -e "${GREEN}Creating project structure"
    # Create routes directory and related files
    mkdir -p routes
    cd routes || exit
    touch index.js

    # Create models directory and related files
    cd ..
    mkdir -p models
    cd models || exit
    touch index.js

    # Create controllers directory
    cd ..
    mkdir -p controllers

    # Create utils directory (for database connections etc)
    mkdir -p utils

    # Create tests directory
    mkdir -p tests
    cd tests || exit
    touch index.js

    # Create main app.js file
    cd ..
    touch app.js

    echo -e "${GREEN}Project setup complete"
    exit 0
fi
