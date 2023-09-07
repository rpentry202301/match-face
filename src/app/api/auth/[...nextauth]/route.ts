import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        id: {
          label: 'ユーザーID',
          type: 'number',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.BE_URL}/users/${credentials?.id}?password=${credentials?.password}`,
          {
            cache: 'no-store',
            method: 'GET',
          }
        );
        const userData = await response.json();
        const user = userData.user;
        if (user.id && user.password) {
          return user;
        } else if (userData.length === 0) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (token && user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = { name: token.name, email: token.email, id: token.id };
      return session;
    },
  },
  // pages: {
  //   signIn: '/auth/sign-in',
  // },
});
export { handler as GET, handler as POST };
