import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { ObjectID } from "bson";
import connectMongoose from "@/utils/connectMongoose";
import UserData, { UserDataType } from "models/UserData";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
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
            const m = await clientPromise;
            // wait for mongoose
            await connectMongoose();

            const initUserData: UserDataType = await UserData.create({
              userId: user.id,
              collections: [
                {
                  label: "sandbox",
                  snippetIds: [],
                },
              ],
              snippets: [],
            });
            console.log(initUserData);
          } catch (err: any) {
            console.log(err.message);
          }
        }
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
