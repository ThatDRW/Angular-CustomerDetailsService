#######################################
#               BUILDER               #
#######################################
FROM node:16.19.1-alpine as builder
COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

RUN ls
WORKDIR /app/dist
RUN ls


#######################################
#             DEPLOYMENT              #
#######################################
FROM nginx:1.23.4-alpine
EXPOSE 80
COPY --from=builder /app/dist/angular-customerdetailsservice /usr/share/nginx/html
# Copy nginx configuration to server container.
COPY --from=builder /app/default.conf /etc/nginx/conf.d/default.conf