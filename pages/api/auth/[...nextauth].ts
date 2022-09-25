import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "../../../lib/mongodb";
import { UserData, UsersData } from "models/UserData";
import { ObjectID } from "bson";

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
          console.log("oh! a new user");
          try {
            // wait for mongoDB
            await clientPromise;

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
            created && console.log("initialized user data", initUserData);
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
