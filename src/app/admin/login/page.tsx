"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";
import { Button } from "@/components/ui/primitives";
import { Logo } from "@/components/layout/logo";

const initialState: LoginState = {};

const fieldClass =
  "w-full rounded-[var(--radius)] border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Signing in…" : "Sign In"}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <Logo size={72} priority />
          </div>
          <h1 className="mt-4 text-xl font-bold text-secondary">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-muted">
            Sign in to manage the website content.
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-[var(--radius)] border border-border bg-surface p-6"
        >
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={fieldClass}
            />
          </div>

          {state.error && <p className="text-sm text-danger">{state.error}</p>}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
