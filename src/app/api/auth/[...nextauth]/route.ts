import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.BE_URL}/users/${credentials?.email}?password=${credentials?.password}`,
          {
            cache: 'no-store',
            method: 'GET',
            // headers: {
            //   'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            //   userId: 1,
            //   password: 'testtest',
            // }),
          }
        );
        const userData = await response.json();
        const user = userData.user;
        console.log('user', user);
        if (user && user.email === credentials?.email) {
          return user;
        } else if (userData.length === 0) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
export { handler as GET, handler as POST };
