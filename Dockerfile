FROM node:20-alpine AS build

WORKDIR /app

# Copy the full project
COPY . .

# Build the Wasp web-app (wasp build must have been run already)
WORKDIR /app/.wasp/build/web-app
RUN npm ci && npm install --no-save vitest && npx vite build

# Serve with nginx
FROM nginx:alpine

# SPA fallback: route all paths to index.html
RUN printf 'server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
  location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {\n\
    expires 1y;\n\
    add_header Cache-Control "public, immutable";\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/.wasp/build/web-app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
