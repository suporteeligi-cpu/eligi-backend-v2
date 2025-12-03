# 🗄 DATABASE_SCHEMA.md — ELIGI v2.0

A seguir, uma visão conceitual das principais tabelas.

---

# 👤 User
- id  
- name  
- email  
- phone  
- password  
- role  
- active  

---

# 🏢 Business
- id  
- ownerId  
- name  
- description  
- phone  
- addressId  
- active  

---

# 💈 Provider
- id  
- userId  
- businessId  
- bio  
- avatar  
- rating  

---

# 🧴 Service
- id  
- businessId  
- name  
- duration  
- price  

---

# 📅 Appointment
- id  
- businessId  
- providerId  
- clientId  
- serviceId  
- date  
- time  
- status  

---

# 💳 Payment
- id  
- businessId  
- providerId  
- amount  
- status  
- method  
- externalId  

---

# 🧾 Invoice
- id  
- businessId  
- providerId  
- paymentId  
- nfseStatus  
- nfseNumber  

---

# 💼 Subscription
- id  
- businessId  
- planId  
- status  
- externalId  

---

# ⭐ Review
- id  
- clientId  
- providerId  
- appointmentId  
- rating  
- comment  

---

# ❤️ Favorite
- id  
- clientId  
- providerId?  
- businessId?  

---

# 🔔 Notification
- id  
- userId  
- title  
- message  
- channel  

---

# 🌐 WebhookEvent
- id  
- provider  
- event  
- payload (JSON)  

---
