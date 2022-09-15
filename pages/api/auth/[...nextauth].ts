import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { ObjectID } from "bson";
import { UserData } from "@/mocks/userData";

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
          const m = await clientPromise;

          const initUserData: UserData = {
            userId: user.id,
            collections: [
              {
                _id: new ObjectID(),
                label: "sandbox",
                snippets: [
                  {
                    _id: new ObjectID(),
                    title: "Hello World example",
                    language: "html",
                    description: "My first snippet on SnipLib.",
                    content: "<h1>Hello World</h1>",
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    favorite: false,
                    public: false,
                    tags: ["hello", "world"],
                  },
                ],
              },
            ],
          };

          const createdUserData = await m
            .db("sniplib")
            .collection("usersData")
            .insertOne(initUserData);
          console.log("data created", createdUserData);
        }
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
