#!/bin/bash
set -e

echo ENV=$ENV

if [ "$ENV" == 'TEST' ]; then
  scripts/wait_for_db.sh
  npm test
else
  nodemon -r babel-register app/index.js
fi
