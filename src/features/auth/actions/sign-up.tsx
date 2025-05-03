"use server"

import { createUser, sessionService } from "@/entities/user";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";
import { z } from "zod";

export type SignUpFormState = {
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

export const signUpAction = async (state: unknown, formData: FormData) => {
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

  const createdUserResult = await createUser(res.data);

  if (createdUserResult.type === "right") {
    await sessionService.addSession(createdUserResult.value);

    redirect(routes.home());
  }

  const userError = {
    "user-login-exists": "Пользователь с таким login существует",
  }[createdUserResult.error];

  return {
    formData,
    errors: {
      _errors: userError,
    },
  };
};
