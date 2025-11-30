import axios from "axios";

export const nuvemFiscal = {

  async issueNfse(payload: any) {
    try {
      const res = await axios.post(
        "https://api.nuvemfiscal.com.br/api/v1/nfse",
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.NUVEM_FISCAL_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      return res.data;

    } catch (err: any) {
      throw new Error(err.response?.data?.message ?? "Erro ao emitir NFS-e");
    }
  }
};
