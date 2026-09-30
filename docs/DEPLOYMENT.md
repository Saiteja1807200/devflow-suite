# Deployment Guide

## Required services

Deploy the API with MongoDB, Redis, a managed object-storage/CDN provider, an email provider, and a TLS-terminating reverse proxy. Keep each secret in the deployment platform's secret manager.

## Production checklist

- Use a MongoDB replica set with backups and point-in-time recovery.
- Configure Redis persistence or a managed Redis service.
- Generate independent 32+ character JWT access and refresh secrets.
- Set `NODE_ENV=production`, `CLIENT_URL`, `MONGODB_URI`, and `REDIS_URL`.
- Enforce HTTPS and secure, same-site cookies.
- Set Cloudinary and SMTP credentials before enabling uploads and email.
- Run database migrations/index checks and verify `/api/v1/health` after deploy.

## Containers

`docker compose up --build` starts MongoDB, Redis, and the API for local container development. The Vite client remains intentionally local in this starter so UI iteration stays fast.
