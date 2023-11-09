FROM node:20-alpine3.18

# Update
RUN apk add --no-cache libc6-compat
RUN apk update

# install pnpm
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

# Configure pnpm global
ENV PNPM_HOME=/pnpm-test/.pnpm
ENV PATH=$PATH:$PNPM_HOME

WORKDIR /usr/src/app

COPY . .

RUN pnpm i -g @angular/cli
RUN pnpm i 

RUN ng build --configuration production

ENV PORT=80
EXPOSE 80

CMD [ "pnpm", "run", "start:ssr" ]