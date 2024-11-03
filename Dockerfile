# Estágio de compilação
FROM node:22.11.0-slim AS build-stage

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o diretório de trabalho
COPY . .

# Compila o código TypeScript
RUN npm run build

# Estágio de implantação
FROM node:latest

# Copia apenas os arquivos essenciais do estágio de compilação para o estágio de implantação
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/.env* ./

# Instala as dependências no estágio de implantação (apenas as necessárias para produção)
RUN npm install --omit=dev

# Expõe a porta em que o servidor está ouvindo
EXPOSE 3000

# Define o comando para iniciar o aplicativo
CMD ["node", "dist/src/main.js"]
