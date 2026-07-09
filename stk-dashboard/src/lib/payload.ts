export function buildStkPayload(apiKey: string, email: string, amount: number | string, msisdn: string, reference: string) {
  if (!apiKey || !email || !amount || !msisdn || !reference) {
    throw new Error("Missing required fields for STK Push");
  }
  return {
    api_key: apiKey,
    email: email,
    amount: String(amount),
    msisdn: msisdn,
    reference: reference,
  };
}
