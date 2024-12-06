"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

function ClerkProviderContainer({ children }: IProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default ClerkProviderContainer;
