import { invoiceRepository } from "../repository/invoice.repository";
import { nuvemFiscal } from "../provider/nuvemfiscal.provider";
import { paymentRepository } from "../../payments/repository/payment.repository";

export const invoiceService = {

  async issue(appointment: any) {
    // evitar duplicidade
    const exists = await invoiceRepository.findByAppointment(appointment.id);
    if (exists) return exists;

    const payload = {
      // EXEMPLO SIMPLIFICADO
      servico: {
        descricao: appointment.service.name,
        valor: appointment.price
      },
      prestador: {
        cnpj: appointment.business.document,
        razao_social: appointment.business.name
      },
      tomador: {
        email: appointment.user.email,
        cpf_cnpj: appointment.user.document ?? undefined
      }
    };

    const nf = await nuvemFiscal.issueNfse(payload);

    const invoice = await invoiceRepository.create({
      userId: appointment.userId,
      appointmentId: appointment.id,
      tipo: "NFS-e",
      urlPdf: nf.pdf_url
    });

    return invoice;
  },

  async listByBusiness(businessId: string) {
    return invoiceRepository.listByBusiness(businessId);
  }
};
