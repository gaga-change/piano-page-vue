FROM node:10-alpine as piano-page-build
WORKDIR /usr/src/app
COPY ["package.json", ".npmrc", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm --registry https://registry.npm.taobao.org install
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.15-alpine
COPY --from=piano-page-build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]