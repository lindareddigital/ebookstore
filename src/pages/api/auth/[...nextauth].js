import NextAuth from "next-auth";
import Providers from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  //   // 使用 Google 驗證
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Providers.Credentials({
    //   async authorize(credentials) {
    //     const res = await fetch("http://localhost:8000/auth/login", {
    //       method: "POST",
    //       body: JSON.stringify(credentials),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     const user = await res.json();

    //     if (res.ok && user) {
    //       return user;
    //     }

    //     return null;
    //   },
    // }),
  ],

  //   // 如果需要將使用者的資料儲存在資料庫中，可以在 database 這個參數加上 url
  //   database: process.env.DATABASE_URL,

  // ... session and providers
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
  },
};

// GoogleProvider({
//   clientId: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   allowDangerousEmailAccountLinking: true,
// });


export default NextAuth(authOptions)

