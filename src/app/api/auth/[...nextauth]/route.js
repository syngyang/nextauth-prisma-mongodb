import NextAuth from 'next-auth/next';
import prisma from '@/app/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import bcrypt from 'bcrypt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name:"credentials",
      credentials: {
        email: {label: "Email", type:"text", placeholder: "polyframe@outlook.com"},
        password: {label: "Password", type:"password"},
        username: { label: 'Username', type:'text', placeholder: 'polyframe'}
      },
      async authorize(credentials) {
        // const user = { id: 1, name: "양승욱", email:"syngyang@gmail.com"}
        // return user;

         // check to see if email and password is there
         if(!credentials.email || !credentials.password) {
          throw new Error('Please enter an email and password')
      }

      // check to see if user exists
      const user = await prisma.user.findUnique({
          where: {
              email: credentials.email
          }
      });

      // if no user was found 
      if (!user || !user?.hashedPassword) {
          throw new Error('등록되지 않은 사용자입니다.')
      }

      // check to see if password matches
      const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

      // if password does not match
      if (!passwordMatch) {
          throw new Error('패스워드가 잘못되었습니다')
      }

      return user;

      }
    })
  ],
  secret:process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST } 