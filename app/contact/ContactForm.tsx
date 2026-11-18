"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import { trackFormError, trackFormSuccess } from "@/lib/analytics";
import { mailto, site } from "@/lib/site";

type ContactFields = {
  name: string;
  email: string;
  message: string;
  /** Web3Forms honeypot: only bots tick it. */
  botcheck: boolean;
};

type Status = "idle" | "sending" | "sent" | "failed";

const fieldClasses =
  "block w-full rounded-control border border-rule bg-surface px-3.5 py-2.5 text-body text-ink " +
  "transition-[border-color] duration-150 ease-out hover:border-graphite/50 " +
  "aria-[invalid=true]:border-pink-deep";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFields>({ mode: "onTouched" });

  const onSubmit = async (data: ContactFields) => {
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2b8771bc-263d-4fe9-b48c-e807b9f27255",
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `New Contact Form Submission from ${data.name}`,
          from_name: "Kdentee LLC Website",
          // Sent only when ticked, like a native checkbox in a form post.
          ...(data.botcheck ? { botcheck: true } : {}),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        trackFormSuccess("Contact Form");
      } else {
        setStatus("failed");
        trackFormError("Contact Form - API Error");
      }
    } catch {
      setStatus("failed");
      trackFormError("Contact Form - Network Error");
    }
  };

  if (status === "sent") return <SentMessage />;

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[40rem]">
      <div className="space-y-6">
        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${fieldClasses} min-h-11`}
            {...register("name", {
              validate: (v) => v.trim() !== "" || "Enter your name.",
            })}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="next"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${fieldClasses} min-h-11`}
            {...register("email", {
              validate: (v) => v.trim() !== "" || "Enter your email address.",
              pattern: {
                value: /^\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\s*$/i,
                message: "That email address doesn’t look right.",
              },
            })}
          />
        </Field>

        <Field id="contact-message" label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            rows={6}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${fieldClasses} min-h-36 resize-y`}
            {...register("message", {
              validate: (v) => v.trim() !== "" || "Write a short message.",
            })}
          />
        </Field>

        {/* Honeypot (Web3Forms): invisible to people and assistive tech; bots fill it in. */}
        <input
          type="checkbox"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          className="hidden"
          style={{ display: "none" }}
          {...register("botcheck")}
        />
      </div>

      {status === "failed" ? (
        <p role="alert" className="mt-8 max-w-prose text-pink-deep">
          Your message didn’t send. Email me at{" "}
          <TextLink href={mailto}>{site.email}</TextLink> instead.
        </p>
      ) : null}

      <Button type="submit" disabled={sending} className="mt-8">
        {/* Both labels share one grid cell so the button keeps its width while sending. */}
        <span className="grid">
          <span className={`[grid-area:1/1] ${sending ? "invisible" : ""}`}>Send message</span>
          <span className={`[grid-area:1/1] ${sending ? "" : "invisible"}`}>Sending…</span>
        </span>
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: FieldError;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium text-ink">
        {label}
      </label>
      {children}
      {error?.message ? (
        <p id={`${id}-error`} className="mt-2 text-small text-pink-deep">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

// Replaces the form once Web3Forms confirms. Focus moves here so screen readers announce it.
function SentMessage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div ref={ref} role="status" tabIndex={-1} className="max-w-[40rem] focus:outline-none">
      <h2 className="text-h2">Message sent.</h2>
      <p className="mt-3 max-w-prose text-graphite">Thanks. I’ll reply by the next business day.</p>
    </div>
  );
}
