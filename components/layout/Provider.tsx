"use client";

import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
}

const Provider = ({children}: Props) => (
  <SessionProvider>
    {children}
  </SessionProvider>
)

export default Provider;