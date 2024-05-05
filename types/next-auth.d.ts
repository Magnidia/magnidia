import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: JWT;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
