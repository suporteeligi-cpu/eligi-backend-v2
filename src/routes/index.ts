import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/users.routes";
import businessRoutes from "../modules/business/business.routes";
import providerRoutes from "../modules/providers/providers.routes";
import serviceRoutes from "../modules/services/services.routes";
import appointmentRoutes from "../modules/appointments/appointments.routes";
import availabilityRoutes from "../modules/availability/availability.routes";
import paymentRoutes from "../modules/payments/payments.routes";
import invoiceRoutes from "../modules/invoices/invoices.routes";
import financeRoutes from "../modules/finance/finance.routes";
import billingRoutes from "../modules/billing/billing.routes";
import marketplaceRoutes from "../modules/marketplace/marketplace.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import adminRoutes from "../modules/admin/admin.routes";
import webhookRoutes from "../modules/webhooks/webhooks.routes";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/business", businessRoutes);
router.use("/providers", providerRoutes);
router.use("/services", serviceRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/availability", availabilityRoutes);
router.use("/payments", paymentRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/finance", financeRoutes);
router.use("/billing", billingRoutes);
router.use("/marketplace", marketplaceRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/admin", adminRoutes);
router.use("/webhooks", webhookRoutes);
