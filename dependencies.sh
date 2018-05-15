#!/bin/bash

# https://github.com/matthewsmorrison/Lending-With-Smart-Contracts
# A script to install all dependencies for the projects.

echo -e "\nThis will install all dependencies required for the Lending Decentralised Application using TLS-N...\n"

# Install dependencies.
sudo apt-get install npm
npm install -g truffle

echo -e "\nCloning the Repository...\n"
reponame="https://github.com/matthewsmorrison/Lending-With-Smart-Contracts.git"
name="Lending-With-Smart-Contracts"
git clone reponame
cd ./$name

echo -e "\nStarting the Server...\n"
npm run start
