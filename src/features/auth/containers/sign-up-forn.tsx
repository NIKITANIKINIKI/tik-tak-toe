"use client";

import { useActionState } from "react";
import { Layout } from "../ui/layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { CustomAlert } from "../ui/custom-alert";
import { BottomLink } from "../ui/link";
import { signUpAction, SignUpFormState } from "../actions/sign-up";
import { routes } from "@/kernel/routes";

export const SignUpForm = () => {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUpFormState
  );

  return (
    <Layout
      title="Sign Up"
      description="Welcome back! Please sign up to your account"
      action={action}
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}> Sign Un</SubmitButton>}
      error={<CustomAlert error={formState.errors?._errors} />}
      link={
        <BottomLink
          text="Do you have an account?"
          linkText="Sign in"
          url={routes.signIn()}
        />
      }
    />
  );
};
