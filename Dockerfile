# Cambiamos a la versión slim basada en Debian para máxima compatibilidad con módulos nativos
FROM node:20-slim

WORKDIR /usr/src/app

# Instalamos Python y herramientas de compilación en C++ que sqlite3 necesita internamente
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./

# Forzamos la reconstrucción de módulos nativos durante la instalación
RUN yarn install --frozen-lockfile --network-timeout 100000

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
