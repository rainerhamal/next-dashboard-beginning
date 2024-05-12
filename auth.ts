//3. Password hashing
//Create a new file called auth.ts that spreads your authConfig object

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

//Adding the Credentials provider
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';


//create a new getUser function that queries the user from the database
async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User> `SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth( {
    ...authConfig,
    providers: [ Credentials( {
        //Adding the sign in functionality
        async authorize ( credentials )
        {
            const parsedCredentials = z.object( { email: z.string(), password: z.string().min( 6 ) } ).safeParse( credentials );

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;
              }
              console.log('Invalid credentials');
              return null;
        },
    } ),
    ],
} );