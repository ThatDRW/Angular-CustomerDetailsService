#######################################
#               GITHUB                #
#######################################
FROM node:16.19.1-alpine as github
RUN cat /etc/os-release
RUN apk update \
 && apk add git

WORKDIR /app

# Cachebusting to stay up-to-date.
ADD https://api.github.com/repos/ThatDRW/Java-CustomerDetailsService/git/refs/heads/master version.json
RUN git clone https://github.com/ThatDRW/Angular-CustomerDetailsService.git
WORKDIR /app/Angular-CustomerDetailsService
RUN find . -maxdepth 1 -exec mv {} .. \;


#######################################
#               BUILDER               #
#######################################
FROM github AS builder
# COPY . /app
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