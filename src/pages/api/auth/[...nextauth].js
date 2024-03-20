import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {
  validateUser,
  saveUserToSF,
  getUserFromSF,
} from 'src/lib/functions/snowflake-users'
export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'jsmith@company.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // and return a user object if the credentials are valid.
        // If the credentials are invalid, return `null`.
        // If the credentials are valid but the user is not found, return `false`.
        const userEmail = await getUserFromSF(credentials.email)
        if (userEmail === null) {
          console.log('User not found please sign up')
        }
        const user = await validateUser(credentials.email, credentials.password)
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.email = token.user['EMAIL']
      session.user.password = token.user['PASSWORD']
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
  pages: {
    signIn: '/signin',
  },
})
