"use server"

import { createUser, sessionService, verifyUserService } from "@/entities/user";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";
import { z } from "zod";

export type SignInFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const res = formDataSchema.safeParse(data);

  if (!res.success) {
    const formatedErrors = res.error.format();

    return {
      formData,
      errors: {
        login: formatedErrors.login?._errors.join(", "),
        password: formatedErrors.password?._errors.join(", "),
        _errors: formatedErrors._errors.join(", "),
      },
    };
  }

  const verifyUser = await verifyUserService.verifyUser(res.data);

  if (verifyUser.type === "right") {
    await sessionService.addSession(verifyUser.value);

    redirect(routes.home());
  }

  const userError = {
    "wron-login-or-password": "Неверный логин или пароль",

  }[verifyUser.error];

  return {
    formData,
    errors: {
      _errors: userError,
    },
  };
};
