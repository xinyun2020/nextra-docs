import Link from "next/link";
import React from "react";

const HomeButton = () => {
  return (
    <>
      <Link className="btn" href={"/"}>
        Back
      </Link>
    </>
  );
};

export default HomeButton;
