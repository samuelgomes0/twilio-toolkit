import { Twilio } from "twilio";

async function getTwilioClient(environment: string) {
  const { accountSid, authToken }: { accountSid: string; authToken: string } =
    await import(`../config/${environment}.json`);
  return new Twilio(accountSid, authToken);
}

export default getTwilioClient;
