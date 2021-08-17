import { signIn, signOut, useSession } from "next-auth/client";
import type { FC } from "react";

const Auth: FC = () => {
  const [session] = useSession();

  return (
    <>
      {!session && (
        <div className="dark:text-white">
          Not signed in <br />
          <button
            onClick={() => {
              return signIn();
            }}
          >
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div className="dark:text-white">
          Signed in as {session.user?.email} <br />
          <button
            onClick={() => {
              return signOut();
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
