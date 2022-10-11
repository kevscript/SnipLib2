import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import AuthGuard from "@/components/AuthGuard";
import { ReactElement, ReactNode } from "react";
import { DataProvider } from "@/hooks/useUserData";

export type NextCustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  authRequired?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

const queryClient = new QueryClient();

function MyApp({ pageProps: { session, ...pageProps }, ...props }: AppProps) {
  const { Component }: { Component: NextCustomPage } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          {Component.authRequired ? (
            <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
          ) : (
            <>{getLayout(<Component {...pageProps} />)}</>
          )}
        </DataProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
