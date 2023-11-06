#!/usr/bin/env zsh

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
API_ENV_FILE=$CURRENT_DIR/../../apps/api/.env

API_PORT=$(grep -v '^#' $API_ENV_FILE | grep PORT | cut -d '=' -f2)
NGROK_DOMAIN=$(grep -v '^#' $API_ENV_FILE | grep NGROK_DOMAIN | cut -d '=' -f2)

echo "Starting ngrok tunnel for $API_PORT port and $NGROK_DOMAIN domain"

ngrok http --domain=$NGROK_DOMAIN $API_PORT
