// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   // 使用 Google 驗證
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],

//   // 如果需要將使用者的資料儲存在資料庫中，可以在 database 這個參數加上 url
//   database: process.env.DATABASE_URL,
// });

GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
});
