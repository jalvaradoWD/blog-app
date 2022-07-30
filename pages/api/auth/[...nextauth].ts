import NextAuth, { Awaitable, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../lib/mongodb';
import { DefaultJWT } from 'next-auth/jwt';
config();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token }) => {
      return jwt.sign({ ...token, userId: token!.id }, secret, {
        algorithm: 'HS256',
      });
    },
    decode: async ({ secret, token }): Promise<DefaultJWT | string | any> => {
      return jwt.verify(token!, secret, { algorithms: ['HS256'] });
    },
  },
};

export default NextAuth(authOptions);
