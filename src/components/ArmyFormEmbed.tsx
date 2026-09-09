import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import {
  trackArmyApplicationResult,
  trackArmyFormStart,
  trackArmyFormView,
} from "@/lib/analytics";
import { backupArmyApplication } from "@/lib/army-backup";

const channels = ["Instagram", "TikTok", "WhatsApp", "Clientes", "Amigos", "Outros"];

type FormState = {
  name: string;
  whatsapp: string;
  city: string;
  state: string;
  instagram: string;
  tiktok: string;
  motivation: string;
  otherChannel: string;
  website: string;
  privacy: boolean;
};

const initialForm: FormState = {
  name: "",
  whatsapp: "",
  city: "",
  state: "",
  instagram: "",
  tiktok: "",
  motivation: "",
  otherChannel: "",
  website: "",
  privacy: false,
};

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-[#9b3029]">
      {message}
    </p>
  ) : null;

const ArmyFormEmbed = ({ id = "inscricao" }: { id?: string }) => {
  const [form, setForm] = useState(initialForm);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    trackArmyFormView();
  }, []);

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].reduce(
      (acc, key) => {
        const value = params.get(key);
        if (value) acc[key] = value.slice(0, 200);
        return acc;
      },
      {} as Record<string, string>,
    );
  }, []);

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      trackArmyFormStart();
    }
  };

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    markStarted();
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    if (status === "error") setStatus("idle");
  };

  const toggleChannel = (channel: string, checked: boolean) => {
    markStarted();
    setSelectedChannels((current) =>
      checked ? [...current, channel] : current.filter((item) => item !== channel),
    );
    setErrors((current) => ({ ...current, channels: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Digite seu nome.";
    if (form.whatsapp.replace(/\D/g, "").length < 10)
      nextErrors.whatsapp = "Digite um WhatsApp com DDD.";
    if (form.city.trim().length < 2) nextErrors.city = "Digite sua cidade.";
    if (!/^[A-Za-z]{2}$/.test(form.state.trim())) nextErrors.state = "Informe a UF com 2 letras.";
    if (!selectedChannels.length) nextErrors.channels = "Escolha pelo menos uma forma de divulgação.";
    if (selectedChannels.includes("Outros") && form.otherChannel.trim().length < 2)
      nextErrors.otherChannel = "Conte qual seria o outro canal.";
    if (form.motivation.trim().length < 8)
      nextErrors.motivation = "Conte em uma frase por que quer participar.";
    if (!form.privacy) nextErrors.privacy = "Você precisa concordar com o uso dos dados para a seleção.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.website || !validate()) return;
    setStatus("sending");

    try {
      const applicationId = crypto.randomUUID();
      const application = {
        id: applicationId,
        name: form.name.trim(),
        whatsapp: form.whatsapp.trim(),
        city: form.city.trim(),
        state: form.state.trim().toUpperCase(),
        channels: selectedChannels,
        instagram: form.instagram.trim() || null,
        tiktok: form.tiktok.trim() || null,
        other_channel: form.otherChannel.trim() || null,
        motivation: form.motivation.trim(),
        source: "areum_army",
        consent_privacy: true,
        utm,
      };

      const supabaseRequest = supabase
        ? supabase.from("army_applications").insert(application).then(({ error }) => {
            if (error) throw error;
          })
        : Promise.reject(new Error("Serviço principal indisponível"));

      const backupRequest = backupArmyApplication({
        id: applicationId,
        name: application.name,
        whatsapp: application.whatsapp,
        city: application.city,
        state: application.state,
        channels: selectedChannels,
        instagram: application.instagram,
        tiktok: application.tiktok,
        otherChannel: application.other_channel,
        motivation: application.motivation,
        utm,
      });

      const results = await Promise.allSettled([supabaseRequest, backupRequest]);
      if (results.every((result) => result.status === "rejected")) {
        throw new Error("Serviços de inscrição indisponíveis");
      }

      setStatus("success");
      trackArmyApplicationResult("success");
      setForm(initialForm);
      setSelectedChannels([]);
      setErrors({});
    } catch {
      setStatus("error");
      trackArmyApplicationResult("error");
    }
  };

  if (status === "success") {
    return (
      <div id={id} className="army-form-card scroll-mt-28 text-center" aria-live="polite">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4dedf] text-[#8f453d]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a75b50]">Inscrição recebida</p>
        <h2 className="mt-2 font-heading text-4xl font-semibold leading-tight text-[#302523]">
          Você deu o primeiro passo.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#6b5752]">
          Sua candidatura foi enviada para análise. A inscrição não garante aprovação.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-sm font-semibold text-[#8f453d] underline decoration-[#d7ada6] underline-offset-4"
        >
          Enviar outra inscrição
        </button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={submit} noValidate className="army-form-card scroll-mt-28" aria-label="Inscrição AREUM ARMY">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a75b50]">Inscrição gratuita</p>
      <h2 className="mt-2 font-heading text-4xl font-semibold leading-[1.05] text-[#302523] md:text-5xl">
        Quero fazer parte da AREUM ARMY
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#6b5752]">
        Preencha seus dados. As inscrições passam por análise.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="army-name">Nome completo</Label>
          <Input id="army-name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "army-name-error" : undefined} className="army-input" />
          <FieldError id="army-name-error" message={errors.name} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="army-whatsapp">WhatsApp com DDD</Label>
          <Input id="army-whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(47) 99999-9999" value={form.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "army-whatsapp-error" : undefined} className="army-input" />
          <FieldError id="army-whatsapp-error" message={errors.whatsapp} />
        </div>

        <div>
          <Label htmlFor="army-city">Cidade</Label>
          <Input id="army-city" autoComplete="address-level2" value={form.city} onChange={(event) => updateField("city", event.target.value)} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "army-city-error" : undefined} className="army-input" />
          <FieldError id="army-city-error" message={errors.city} />
        </div>

        <div>
          <Label htmlFor="army-state">Estado (UF)</Label>
          <Input id="army-state" autoComplete="address-level1" maxLength={2} placeholder="SC" value={form.state} onChange={(event) => updateField("state", event.target.value.toUpperCase())} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? "army-state-error" : undefined} className="army-input uppercase" />
          <FieldError id="army-state-error" message={errors.state} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-[#302523]">Como você pretende divulgar?</legend>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {channels.map((channel) => (
              <label
                key={channel}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm text-[#4f3b37] transition hover:border-[#b87568] ${
                  selectedChannels.includes(channel)
                    ? "border-[#8f453d] bg-[#fff6f4]"
                    : "border-[#dfcac4] bg-white"
                }`}
              >
                <Checkbox checked={selectedChannels.includes(channel)} onCheckedChange={(checked) => toggleChannel(channel, checked === true)} aria-label={channel} />
                {channel}
              </label>
            ))}
          </div>
          <FieldError id="army-channels-error" message={errors.channels} />
        </fieldset>

        {selectedChannels.includes("Outros") && (
          <div className="sm:col-span-2">
            <Label htmlFor="army-other">Qual outro canal?</Label>
            <Input id="army-other" value={form.otherChannel} onChange={(event) => updateField("otherChannel", event.target.value)} aria-invalid={Boolean(errors.otherChannel)} aria-describedby={errors.otherChannel ? "army-other-error" : undefined} className="army-input" />
            <FieldError id="army-other-error" message={errors.otherChannel} />
          </div>
        )}

        <div>
          <Label htmlFor="army-instagram">Instagram <span className="text-[#8b7772]">(opcional)</span></Label>
          <Input id="army-instagram" autoComplete="off" placeholder="@seuperfil" value={form.instagram} onChange={(event) => updateField("instagram", event.target.value)} className="army-input" />
        </div>

        <div>
          <Label htmlFor="army-tiktok">TikTok <span className="text-[#8b7772]">(opcional)</span></Label>
          <Input id="army-tiktok" autoComplete="off" placeholder="@seuperfil" value={form.tiktok} onChange={(event) => updateField("tiktok", event.target.value)} className="army-input" />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="army-motivation">O que você quer construir com essa oportunidade?</Label>
          <Textarea id="army-motivation" placeholder="Conte por que a renda extra faria diferença e como pretende divulgar a AREUM." maxLength={600} value={form.motivation} onChange={(event) => updateField("motivation", event.target.value)} aria-invalid={Boolean(errors.motivation)} aria-describedby={errors.motivation ? "army-motivation-error" : undefined} className="army-input min-h-28 resize-y" />
          <FieldError id="army-motivation-error" message={errors.motivation} />
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <Label htmlFor="army-website">Website</Label>
          <Input id="army-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => updateField("website", event.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#5f4b46]">
            <Checkbox checked={form.privacy} onCheckedChange={(checked) => updateField("privacy", checked === true)} className="mt-1" aria-describedby={errors.privacy ? "army-privacy-error" : undefined} />
            <span>
              Concordo com o uso dos meus dados para análise da inscrição, conforme a{" "}
              <a href="/politica-de-privacidade" target="_blank" className="font-semibold text-[#8f453d] underline underline-offset-4">Política de Privacidade</a>.
            </span>
          </label>
          <FieldError id="army-privacy-error" message={errors.privacy} />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-xl border border-[#d99b94] bg-[#fff4f2] px-4 py-3 text-sm leading-6 text-[#8a2f29]">
          Não foi possível enviar agora. Seus dados continuam preenchidos; tente novamente em instantes.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="army-primary-cta mt-7 w-full">
        {status === "sending" ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando inscrição</> : <>ENVIAR MINHA INSCRIÇÃO <ArrowRight className="h-5 w-5" /></>}
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-[#806c67]">
        Inscrição gratuita e sujeita à aprovação. Não existe garantia de renda.
      </p>
    </form>
  );
};

export default ArmyFormEmbed;
