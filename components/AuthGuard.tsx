import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuth = session && status === "authenticated" ? true : false;

  useEffect(() => {
    if (status === "loading") return;
    if (!isAuth) router.push("/");
  }, [isAuth, status, router]);

  if (isAuth) return <>{children}</>;

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1>Loading...</h1>
    </div>
  );
};

export default AuthGuard;
