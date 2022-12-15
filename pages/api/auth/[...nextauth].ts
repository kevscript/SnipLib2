import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { mongoConnect } from "../../../lib/mongodb";
import { UserData, UsersData } from "models/UserData";
import { ObjectID } from "bson";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: (process.env.NODE_ENV === "production"
        ? process.env.GITHUB_ID_PROD
        : process.env.GITHUB_ID_DEV) as string,
      clientSecret: (process.env.NODE_ENV === "production"
        ? process.env.GITHUB_SECRET_PROD
        : process.env.GITHUB_SECRET_DEV) as string,
    }),

    // ...add more providers here
  ],
  adapter: MongoDBAdapter(mongoConnect),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async jwt({ token, user, isNewUser }) {
      if (user) {
        token.id = user.id;
        if (isNewUser) {
          try {
            // wait for mongoDB
            await mongoConnect;

            const initUserData: UserData = {
              _id: new ObjectID(),
              userId: new ObjectID(user.id),
              lists: [
                {
                  _id: new ObjectID(),
                  label: "sandbox",
                  original: true,
                  snippetIds: [],
                },
              ],
              snippets: [],
            };

            const created = await UsersData.insertOne(initUserData);
          } catch (err: any) {
            console.log(err.message);
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};
export default NextAuth(authOptions);
