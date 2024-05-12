//1. Adding the pages option. authConfig object will contain the configuration options for NextAuth.js
import type { NextAuthConfig } from "next-auth";

export const authConfig = {

    //You can use the pages option to specify the route for custom sign-in, sign-out, and error pages.
    // adding signIn: '/login' into our pages option, the user will be redirected to our custom login page, rather than the NextAuth.js default page
    pages: {
        signIn: '/login',
    },

    //add the logic to protect your routes. This will prevent users from accessing the dashboard pages unless they are logged in
    callbacks: {
        //auth property contains the user's session, and the request property contains the incoming request
        authorized({auth, request: { nextUrl }}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; //Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], //The providers option is an array where you list different login options. Add providers with an empty array for now
} satisfies NextAuthConfig;