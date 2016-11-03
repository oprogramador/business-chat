#!/bin/bash

path=node_modules/business-chat-backend

if [ ! -L $path ]; then
  ln -s ../app $path
fi
