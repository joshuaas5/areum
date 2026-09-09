type ArmyBackupPayload = {
  id: string;
  name: string;
  whatsapp: string;
  city: string;
  state: string;
  channels: string[];
  instagram: string | null;
  tiktok: string | null;
  otherChannel: string | null;
  motivation: string;
  utm: Record<string, string>;
};

const GOOGLE_FORM_ENDPOINT =
  "https://docs.google.com/forms/d/e/1FAIpQLScEknrzIXiVOYlm1htQjoTmp0s-KUmfTq4qk9sQ2fmkX3xJIg/formResponse";

const fields = {
  name: "entry.1801119649",
  whatsapp: "entry.2124582206",
  city: "entry.1495634344",
  state: "entry.630503339",
  channels: "entry.124651641",
  tiktok: "entry.1307057769",
  motivation: "entry.361267092",
  source: "entry.23830591",
  utm: "entry.1481292146",
  status: "entry.164789485",
  instagram: "entry.458511709",
  id: "entry.1671704907",
} as const;

export const backupArmyApplication = async (payload: ArmyBackupPayload) => {
  const channelList = payload.otherChannel
    ? [...payload.channels.filter((channel) => channel !== "Outros"), payload.otherChannel]
    : payload.channels;
  const body = new URLSearchParams({
    [fields.name]: payload.name,
    [fields.whatsapp]: payload.whatsapp,
    [fields.city]: payload.city,
    [fields.state]: payload.state,
    [fields.channels]: channelList.join(", "),
    [fields.instagram]: payload.instagram ?? "",
    [fields.tiktok]: payload.tiktok ?? "",
    [fields.motivation]: payload.motivation,
    [fields.source]: "areumco.com.br/army",
    [fields.utm]: Object.keys(payload.utm).length ? JSON.stringify(payload.utm) : "",
    [fields.id]: payload.id,
    [fields.status]: "Pendente",
  });

  await fetch(GOOGLE_FORM_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    credentials: "omit",
    keepalive: true,
    body,
  });
};
