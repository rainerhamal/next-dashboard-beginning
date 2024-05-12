//2.  import the authConfig object into a Middleware file. initializing NextAuth.js with the authConfig object and exporting the auth property
//employing Middleware for this task, the protected routes will not even start rendering until the Middleware verifies the authentication

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};