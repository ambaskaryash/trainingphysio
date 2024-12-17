import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
//import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Retrieve the Clerk JWT template (if necessary)
// Only if you are using a custom JWT template
// const clerkJwtKey = process.env.CLERK_JWT_KEY;

const publicPaths = ['/', '/login', '/register'];

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: any;
  pageProps: { session: Session } & { [key: string]: any };
}) {
  const router = useRouter();

  // Redirect to the Clerk-hosted login page if the user is not signed in
  // and is trying to access a private path
  useEffect(() => {
    if (
      !session &&
      !publicPaths.includes(router.pathname) &&
      typeof window !== 'undefined'
    ) {
      window.location.href = '/login';
    }
  }, [session, router.pathname]);

  return (
    <ClerkProvider
      {...authOptions}
      // jwtKey={clerkJwtKey} // Only if you are using a custom JWT template
    >
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        {/* Show the Clerk-hosted sign-in/sign-up page for public paths */}
        {publicPaths.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <RedirectToSignIn />
        )}
      </SignedOut>
    </ClerkProvider>
  );
}

export async function getServerSideProps({ req, res }: any) {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      session,
    },
  };
}