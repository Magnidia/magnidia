import db from "./db";

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id: id },
  });
  return user;
};
