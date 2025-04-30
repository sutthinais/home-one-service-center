# Stage 1: Build
FROM node:20-alpine AS builder

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm ci

# คัดลอกโค้ดทั้งหมด
COPY . .

# Build แอป Next.js และตรวจสอบว่า server.js ถูกสร้าง
RUN npm run build && test -f .next/standalone/server.js

# Stage 2: Production
FROM node:20-alpine AS runner

# ตั้งค่า working directory
WORKDIR /app

# ตั้งค่า environment variables
ENV PORT=80
ENV NODE_OPTIONS="--max-old-space-size=512"

# เพิ่มใบรับรอง SSL สำหรับ registry (ถ้าจำเป็น)
# RUN apk add --no-cache ca-certificates
# COPY --from=builder /app/certs/star_homeone_co_th.crt /usr/local/share/ca-certificates/gitlabce.crt
# RUN update-ca-certificates

# คัดลอกไฟล์ standalone จาก stage build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public* ./public

# เปลี่ยน owner เป็น user node
RUN chown -R node:node /app
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/ || exit 1

# เปิด port
EXPOSE 80

# รัน Next.js
CMD ["node", "server.js"]