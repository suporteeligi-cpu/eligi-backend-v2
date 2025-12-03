# 🚀 ELIGI v2.0 — Backend SaaS para Barbearias & Salões

ELIGI é um sistema completo Modelo Saas

- Agendamentos inteligentes  
- Gestão de clientes  
- Serviços e profissionais  
- Pagamentos  
- Financeiro  
- Assinaturas  
- Notas fiscais  
- Marketplace  
- Analytics avançado  
- Notificações  
- Painel Admin  
- Multi-negócio (multi-tenant)  

O backend é modular, moderno e altamente escalável.

---

# 🧠 Arquitetura

- **Node.js + Express**
- **Typescript**
- **Prisma ORM (PostgreSQL)**
- **JWT Auth**
- **Bcrypt**
- **Multer + Cloud Storage**
- **EventBus**
- **Webhooks**
- **Clean Architecture + Domain Services**
- **Multi-tenant**
- **Pronto para Serverless**

---

# �

# 📂 Estrutura de Pastas

src/
app.ts
server.ts
core/
errors/
logs/
events/
config/
env/
cors/
security/
modules/
auth/
users/
business/
providers/
services/
appointments/
availability/
payments/
invoices/
notifications/
finance/
billing/
analytics/
marketplace/
admin/
webhooks/
lib/
prisma.ts
cache/
mail/
storage/
middlewares/
prisma/
routes/

yaml
Copiar código

---

# 🔐 Autenticação

- JWT (7 dias)
- Refresh token pronto para implementação
- Middleware `authMiddleware` aplicado em rotas protegidas
- Fluxo para usuário **client**, **provider**, **business_owner** e **admin**

---

# ��️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_REPO/eligi-backend-v2.git
cd eligi-backend-v2/backend
