import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React from "react";
import { BilibiliIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from ".";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { UserButton } from "@clerk/clerk-react";

const NavbarIcons = () => {
  const user = useUser();
  const userIsSignedIn = user.isSignedIn;

  const SignOutButton = () => {
    const { signOut } = useClerk();
    return <button onClick={() => signOut()}>Sign out</button>;
  };

  return (
    <>
      <div className="hidden lg:flex flex-row gap-1.5">
        {/* <YoutubeIcon /> */}
        {/* <BilibiliIcon /> */}
        {/* <RedbookIcon /> */}
        {/* <TwitterIcon /> */}
        {/* <InstagramIcon /> */}
      </div>

      <ThemeToggle />
      {!!userIsSignedIn && (
        <UserButton signInUrl={"/cv"} afterSignOutUrl={"/"} />
      )}
    </>
  );
};

export default NavbarIcons;
