import { left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import { passwordService } from "./password";

const verifyUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const user = await userRepository.getUser({ login });

  if (!user) {
    return left("wron-login-or-password" as const);
  }

  const isCompare = await passwordService.comparePassword({
    hash: user.passwordHash,
    password: password,
    salt: user?.salt,
  });

  if(!isCompare){
    return left("wron-login-or-password" as const);
  }

  return right(user)
};

export const verifyUserService = { verifyUser };
