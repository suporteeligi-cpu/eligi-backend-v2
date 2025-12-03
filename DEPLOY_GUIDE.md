# 🚀 DEPLOY_GUIDE.md — ELIGI v2.0

Guia oficial de deploy.

---

# ☁️ Railway (Recomendado)

1) Criar um novo projeto  
2) Criar serviço **PostgreSQL**  
3) Copiar `DATABASE_URL`  
4) Criar serviço **Node.js**  
5) Conectar GitHub  
6) Configurar:

**Build:**  
npm install && npm run build

makefile
Copiar código

**Start:**  
npm start

markdown
Copiar código

**Variáveis necessárias:**
DATABASE_URL=
JWT_SECRET=
PORT=3333
CORS_ORIGIN=https://seu-frontend.com

shell
Copiar código

### Migrations
Railway executa automaticamente ao rodar:

npx prisma migrate deploy

yaml
Copiar código

---

# ☁️ Render

1) Criar PostgreSQL  
2) Criar Web Service Node  
3) Build Command:

npm install && npm run build

powershell
Copiar código

4) Start Command:

npm start

yaml
Copiar código

---

# 🐳 Docker Deploy

docker-compose up --build

yaml
Copiar código

Include services:
- app
- postgres

---

# 🌍 Domínios

Em ambos:
- criar domínio customizado
- apontar DNS (A ou CNAME)

---

# 🔐 Segurança de Produção

- Ativar HTTPS  
- Configurar CORS  
- Bloquear porta 5432 pública  
- Ativar auditoria no painel admin  

---
