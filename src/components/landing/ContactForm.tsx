import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { siteConfig } from "@/config/site";
import { contactSchema, type ContactFormValues } from "@/lib/contact";
import { submitContact } from "@/lib/submit-contact";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[oklch(0.7_0.22_290/_0.5)] focus:ring-2 focus:ring-[oklch(0.7_0.22_290/_0.2)]";

const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground";

type ContactFormProps = {
  idPrefix?: string;
  className?: string;
};

export function ContactForm({ idPrefix = "contact", className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const phone = siteConfig.contact.phone.trim();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      industry: "",
      website: "",
      message: "",
      budget: "",
      timeline: "",
      consent: false,
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    try {
      const result = await submitContact({ data });
      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(
        `Nie udało się wysłać wiadomości. Napisz bezpośrednio na ${siteConfig.contact.email}.`,
      );
    }
  };

  if (submitted) {
    return (
      <div className={cn("glass flex flex-col items-center rounded-3xl px-8 py-16 text-center", className)}>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.22_290)] text-black">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">Dziękuję za wiadomość!</h3>
        <p className="mt-3 max-w-md text-muted-foreground">
          Odpowiem w ciągu 24 godzin na podany adres e-mail
          {phone ? (
            <>
              {" "}
              lub pod numerem{" "}
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-foreground">
                {phone}
              </a>
            </>
          ) : null}
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Wyślij kolejne zapytanie
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        "glass relative grid grid-cols-1 gap-5 rounded-3xl p-6 md:grid-cols-2 md:p-8",
        className,
      )}
    >
      <div>
        <label htmlFor={`${idPrefix}-name`} className={labelClass}>
          Imię *
        </label>
        <input id={`${idPrefix}-name`} className={inputClass} {...register("name")} />
        {errors.name && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-company`} className={labelClass}>
          Firma
        </label>
        <input id={`${idPrefix}-company`} className={inputClass} {...register("company")} />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
          Telefon *
        </label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          autoComplete="tel"
          className={inputClass}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className={labelClass}>
          E-mail *
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          autoComplete="email"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-industry`} className={labelClass}>
          Branża
        </label>
        <input id={`${idPrefix}-industry`} className={inputClass} {...register("industry")} />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-website`} className={labelClass}>
          Adres strony
        </label>
        <input
          id={`${idPrefix}-website`}
          type="url"
          placeholder="https://"
          className={inputClass}
          {...register("website")}
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          Czego potrzebujesz? *
        </label>
        <textarea
          id={`${idPrefix}-message`}
          rows={4}
          className={`${inputClass} resize-y min-h-[120px]`}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-budget`} className={labelClass}>
          Budżet (opcjonalnie)
        </label>
        <input id={`${idPrefix}-budget`} className={inputClass} {...register("budget")} />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-timeline`} className={labelClass}>
          Termin realizacji (opcjonalnie)
        </label>
        <input id={`${idPrefix}-timeline`} className={inputClass} {...register("timeline")} />
      </div>

      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-[oklch(0.7_0.22_290)]"
            {...register("consent")}
          />
          <span>
            Wyrażam zgodę na kontakt w celu przedstawienia oferty. Dane przetwarzane zgodnie z{" "}
            <a
              href="/polityka-prywatnosci"
              className="text-foreground underline-offset-4 hover:underline"
            >
              polityką prywatności
            </a>
            . *
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${idPrefix}-website-confirm`}>Nie wypełniaj tego pola</label>
        <input
          id={`${idPrefix}-website-confirm`}
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      {submitError ? (
        <p className="md:col-span-2 text-sm text-destructive" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Wysyłanie…
            </>
          ) : (
            <>
              Wyślij zapytanie
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
