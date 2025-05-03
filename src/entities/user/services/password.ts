import { pbkdf2, randomBytes } from "crypto";

async function hashPassword(
  password: string,
  salt = randomBytes(16).toString("hex")
) {
  const hash = await new Promise<Buffer>((res, rej) =>
    pbkdf2(password, salt, 1000, 64, "sha512", (error, value) => {
      error ? rej(error) : res(value);
    })
  );

  return {
    hash: hash.toString("hex"),
    salt,
  };
}

async function comparePassword({
  hash,
  password,
  salt,
}: {
  hash: string;
  password: string;
  salt: string;
}): Promise<boolean> {
  return hash === (await hashPassword(password, salt)).hash;
}

export const passwordService = { hashPassword, comparePassword };
