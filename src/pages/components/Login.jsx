import { signIn, signOut, useSession } from "next-auth/client";

function Login() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && <button onClick={() => signIn()}>登入</button>}
      {session && (
        <>
          <p>使用者 email: {session.user.email}</p>
          <button onClick={() => signOut()}>登出</button>
        </>
      )}
    </>
  );
}

export default Login;
