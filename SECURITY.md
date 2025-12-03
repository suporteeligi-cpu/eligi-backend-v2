# 🔐 SECURITY.md — ELIGI v2.0

Práticas de segurança aplicadas:

---

# 🔐 Autenticação

- JWT com expiração curta  
- Secret forte  
- Refresh tokens prontos para uso  
- Verificação em todas as rotas privadas  

---

# 🔒 Senhas

- Bcrypt com salt  
- Nunca armazenar em texto plano  

---

# 🛡 Middlewares Inclusos

- authMiddleware  
- validateMiddleware  
- rateLimiter  
- corsMiddleware  
- errorHandler  

---

# 🚨 Auditoria

- Registro de eventos em  
  `WebhookEvent`  
- Logs importantes no EventBus  

---

# 🌐 Segurança de Webhooks

- Endpoints públicos isolados  
- Possibilidade de validar assinatura  
- Respostas sempre 200 para evitar retries excessivos  

---

# 🧱 Segurança no Banco

- Multi-tenant (businessId)  
- Usuário nunca acessa dados de outro negócio  
- Foreign keys fortes  
- Cascade bem definido  

---

# �� Produção

- HTTPS obrigatório  
- Chaves secretas no .env  
- CORS restrito ao frontend  
- Banco inacessível publicamente  
- Deploy com containers isolados  

---
