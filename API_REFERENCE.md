# 📘 API_REFERENCE.md — ELIGI v2.0

Documentação oficial das rotas do backend ELIGI.

Formato:
- Método
- URL
- Autenticação
- Descrição
- Body
- Response
- Códigos de erro

---

# 🔑 AUTH

## POST /auth/register
Cria um usuário.

**Body**
```json
{
  "name": "",
  "email": "",
  "password": "",
  "role": "client | provider | business_owner"
}


POST /auth/login

Login e geração de token.

Body

{
  "email": "",
  "password": ""
}


Response

{
  "token": "",
  "user": { ... }
}

👤 USERS
GET /users/me

Auth: Bearer
Retorna perfil do usuário logado.

🏢 BUSINESS
POST /business

Cria negócio.

GET /business/:id

Dados completos do negócio.

PUT /business/:id

Atualiza informações.

💈 PROVIDERS
POST /providers

Cria profissional.

GET /providers?businessId=

Lista profissionais do negócio.

GET /providers/:id

Dados do barbeiro.

�� SERVICES
POST /services

Cria serviço.

GET /services?businessId=

Lista serviços.

📅 APPOINTMENTS
POST /appointments

Cria agendamento.

Body

{
  "businessId": "",
  "providerId": "",
  "clientId": "",
  "serviceId": "",
  "date": "",
  "time": ""
}

GET /appointments?providerId=&date=

Agenda do profissional.

🕒 AVAILABILITY
GET /availability/:providerId

Horários livres e exceções.

💳 PAYMENTS
POST /payments

Cria intenção de pagamento.

GET /payments/:businessId

Lista pagamentos.

🧾 INVOICES (NFSe)
POST /invoices

Gera nota fiscal.

GET /invoices/:businessId

Lista notas.

💸 FINANCE
GET /finance/summary/:businessId

Resumo financeiro.

GET /finance/payments/:businessId

Pagamentos filtrados.

💼 BILLING (Assinaturas)
GET /billing/plans

Lista planos.

POST /billing/plans

Cria plano.

POST /billing/subscribe

Assinar o ELIGI.

GET /billing/subscription/:businessId

Assinatura ativa.

PUT /billing/change-plan

Trocar plano.

⭐ MARKETPLACE
POST /marketplace/favorite

Favoritar profissional/negócio.

GET /marketplace/favorite/:clientId

Lista favoritos.

DELETE /marketplace/favorite/:id

Remove favorito.

POST /marketplace/review

Avaliação do barbeiro.

GET /marketplace/review/provider/:providerId

Lista avaliações + média.

🔔 NOTIFICATIONS
POST /notifications/send

Envia notificação.

📈 ANALYTICS
GET /analytics/summary/:businessId

Resumo geral.

GET /analytics/services/:businessId

Ranking de serviços.

GET /analytics/providers/:businessId

Ranking de barbeiros.

GET /analytics/growth/:businessId

Crescimento mensal.

🛡 ADMIN

Somente superadmin

GET /admin/users
GET /admin/businesses
PUT /admin/users/:id/status
PUT /admin/businesses/:id/status
GET /admin/subscriptions
GET /admin/metrics
🌐 WEBHOOKS (público)
POST /webhooks/:provider

Recebe eventos externos.

Providers aceitos:

mercadopago

stripe

nuvem-fiscal


---

# 📗 **2. ARCHITECTURE.md**  
(explicação técnica completa da arquitetura)

---

```md
# 🏛 ARCHITECTURE.md — ELIGI v2.0

O ELIGI v2.0 segue uma arquitetura modular, escalável e inspirada em plataformas SaaS como Booksy, Trinks, Fresha e Squire.

---

# 📐 Principais Padrões

- **Clean Architecture**  
- **Domain-driven folder structure**  
- **Services isolados**  
- **Repositories desacoplados**  
- **Middlewares independentes**  
- **EventBus para eventos internos**  
- **Webhooks para eventos externos**  
- **Camadas desacopladas por domínio**

---

# 🧱 Camadas



routes → controllers → services → repositories → prisma/database


### Routes  
Recebem requisições e direcionam para controllers.

### Controllers  
Interpretam input e chamam o domínio.

### Services  
Camada de lógica de negócio.

### Repositories  
Camada de acesso ao banco via Prisma.

### Prisma  
Modelos, migrations e tipagem gerada.

---

# 🧩 Estrutura Modular

Cada módulo segue o padrão:



module/
controller/
service/
repository/
dto/
*.routes.ts


---

# 🔌 EventBus

Local:  
`src/core/events/eventBus.ts`

Serve para:

- pagamento aprovado  
- assinatura renovada  
- emissão de nota  
- novo agendamento  

---

# 🛡 Segurança

- JWT  
- Hash com Bcrypt  
- Rate limiting  
- CORS configurado  
- Logs de auditoria  
- Webhooks validados  

---

# 🧪 Testes (suportado)

Padrão:



tests/
modules/
e2e/
utils/


---

# 🗂 Multi-tenant

Cada modelo inclui:



businessId


Isso permite escalar ilimitadamente:

- 1 negócio  
- 100 negócios  
- 10.000 negócios  
- multi-franquias  

---

# ☁️ Deploy Cloud-Native

Projetado para:

- Railway  
- Render  
- Fly.io  
- Docker / Kubernetes  

---
