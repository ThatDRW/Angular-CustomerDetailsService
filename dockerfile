FROM node:16.19.1-alpine as BUILDER

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

RUN ls
WORKDIR /app/dist
RUN ls


FROM nginx:1.23.4-alpine
EXPOSE 80
COPY --from=BUILDER /app/dist/angular-customerdetailsservice /usr/share/nginx/html