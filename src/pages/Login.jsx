import { signIn, signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import { useMemo } from "react";
import { useRouter } from "next/router";


function Login() {
  const {session, loading} = useSession();

  const router = useRouter();
  const { id } = router.query;

  const params = useMemo(
    () => ({ id, accessToken: session?.accessToken }),
    [id, session]
  );


  const fetcher = (url, params) => fetch(url + params.id).then((r) => r.json());

  const { data: product, error } = useSWR(id && !loading ? ["/products", params] : null, fetcher);

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
