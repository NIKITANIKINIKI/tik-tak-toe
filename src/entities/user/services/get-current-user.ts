import { userRepository } from "../repositories/user";
import { sessionService } from "./session";

export const getCurrentUser = async (
  getCookies?: () => Promise<string | undefined>
) => {
  const { session } = await sessionService.verifySession(getCookies);

  const user = await userRepository.getUser({ id: String(session.id) });

  return user;
};
