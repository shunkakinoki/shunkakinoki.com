import { signIn, signOut, useSession } from "next-auth/react";
import type { FC } from "react";

const Auth: FC = () => {
  const { data } = useSession();

  return (
    <>
      {!data && (
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
      {data && (
        <div className="dark:text-white">
          Signed in as {data.user?.email} <br />
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
