import crypto from "crypto";

export const cryptoUtil = {
  hash: (val: string) => crypto.createHash("sha256").update(val).digest("hex"),
  random: (size = 32) => crypto.randomBytes(size).toString("hex"),
};
