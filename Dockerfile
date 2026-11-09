# Plain static site: no build stage needed (unlike the Vite repos), nginx serves the files as-is.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
EXPOSE 80
