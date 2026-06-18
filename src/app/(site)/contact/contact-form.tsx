"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "./actions";
import { Button } from "@/components/ui/primitives";

const initialState: ContactState = { ok: false };

const fieldClass =
  "w-full rounded-[var(--radius)] border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:border-primary";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Sending…" : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.ok) {
    return (
      <div className="rounded-[var(--radius)] border border-success/30 bg-success/10 p-6 text-center">
        <p className="font-semibold text-success">Thank you!</p>
        <p className="mt-1 text-sm text-muted">
          Your message has been received. We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name *
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Phone
          </label>
          <input id="phone" name="phone" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium">
            Subject
          </label>
          <input id="subject" name="subject" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
        />
      </div>

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <SubmitButton />
    </form>
  );
}
