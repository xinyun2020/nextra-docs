import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import RandomNoteButton from "../components/RandomNote/RandomNoteButton";

const CLERK_THEME = {
  variables: {
    colorPrimary: "#38c7b7",
    colorText: "#000000"
  }
} as const;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} appearance={CLERK_THEME}>
      <Component {...pageProps} />
      <RandomNoteButton />
    </ClerkProvider>
  );
}
