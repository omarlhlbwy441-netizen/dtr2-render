FROM node:18-alpine
WORKDIR /app
ENV NEXT_TELEMERRY_DISABLED=1
ENV PORT=10000
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate || true
RUN npm run build
EXPOSE 10000
CMD ["npx", "next", "start", "-p", "10000", "-H", "0.0.0.0"]
