"use client";

import { useActionState } from "react";
import { Layout } from "../ui/layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { CustomAlert } from "../ui/custom-alert";
import { BottomLink } from "../ui/link";
import { signInAction, SignInFormState } from "../actions/sign-in";
import { routes } from "@/kernel/routes";

export const SignInForm = () => {
  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState
  );

  return (
    <Layout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      action={action}
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}> Sign In</SubmitButton>}
      error={<CustomAlert error={formState.errors?._errors} />}
      link={
        <BottomLink
          text="Don't have an account?"
          linkText="Sign up"
          url={routes.signUp()}
        />
      }
    />
  );
};
