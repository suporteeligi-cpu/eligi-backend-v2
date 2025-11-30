import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

// ROTAS:
import authRoutes from "./modules/auth/auth.routes";
import businessRoutes from "./modules/business/business.routes";
import providerRoutes from "./modules/providers/provider.routes";
import serviceRoutes from "./modules/services/service.routes";
import appointmentRoutes from "./modules/appointments/appointment.routes";
import availabilityRoutes from "./modules/availability/availability.routes";
import financeRoutes from "./modules/finance/finance.routes";
import adminRoutes from "./modules/admin/admin.routes";
import invoiceRoutes from "./modules/invoices/invoice.routes";
import webhookRoutes from "./modules/webhooks/webhook.routes";

app.use("/auth", authRoutes);
app.use("/business", businessRoutes);
app.use("/providers", providerRoutes);
app.use("/services", serviceRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/availability", availabilityRoutes);
app.use("/finance", financeRoutes);
app.use("/admin", adminRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/webhooks", webhookRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Backend ELIGI v2.0 rodando!" });
});

const PORT = process.env.PORT || 3333;

const server = app.listen(PORT, () => {
  console.log("\n══════════════════════════════════════════════");
  console.log(`  🚀 ELIGI Backend iniciado`);
  console.log(`  🌐 Porta: ${PORT}`);
  console.log(`  📡 URL:   http://localhost:${PORT}`);
  console.log("══════════════════════════════════════════════\n");
});

server.on("error", (err) => {
  console.error("❌ Erro ao conectar no Banco:", err);
});
