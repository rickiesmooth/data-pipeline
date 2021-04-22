#!/bin/bash
set -e

superset fab create-admin \
    --username admin \
    --firstname Superset \
    --lastname Admin \
    --email admin@superset.com \
    --password admin

echo "Updating admin"

superset db upgrade

echo "Initting"

superset init

gunicorn \
    --bind  "0.0.0.0:${SUPERSET_PORT}" \
    --access-logfile '-' \
    --error-logfile '-' \
    --workers 1 \
    --worker-class gthread \
    --threads 20 \
    --timeout 60 \
    --limit-request-line 0 \
    --limit-request-field_size 0 \
    "${FLASK_APP}"