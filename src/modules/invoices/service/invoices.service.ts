import { InvoiceRepository } from "../repository/invoices.repository";
import { NuvemFiscalProvider } from "../provider/nuvemfiscal.provider";
import { AppError } from "../../../core/errors/AppError";

export class InvoiceService {
  private repo = new InvoiceRepository();
  private nfse = new NuvemFiscalProvider();

  async createInvoice(data: any) {
    if (!data.paymentId) {
      throw new AppError("paymentId é obrigatório.", 400);
    }

    // Emissão com provedor
    const nf = await this.nfse.generateNFSe(data);

    // Criar no banco
    const invoice = await this.repo.create({
      ...data,
      nfseNumber: nf.nfseNumber,
      nfseUrl: nf.verificationUrl,
      status: nf.status
    });

    return invoice;
  }

  async getInvoice(id: string) {
    const invoice = await this.repo.findById(id);
    if (!invoice) throw new AppError("Nota não encontrada.", 404);
    return invoice;
  }

  async listByBusiness(businessId: string) {
    return this.repo.listByBusiness(businessId);
  }

  async updateInvoice(id: string, data: any) {
    await this.getInvoice(id);
    return this.repo.update(id, data);
  }
}
