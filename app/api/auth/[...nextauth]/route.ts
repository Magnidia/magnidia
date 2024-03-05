import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import db from '@/utils/db';

export const authOptions : AuthOptions = {
    // adapter: PrismaAdapter(db),
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                checks: ['none'],
            })
        ],
        session: {
            strategy: 'jwt',
        },
        // secret: process.env.SECRET,

    
}

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST }