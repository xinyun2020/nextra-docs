import React from "react";

export const PlexMono = ({
  children,
}: {
  children: React.PropsWithChildren;
}) => {
  return <div className="font-plex italic">{children}</div>;
};

export const FiraCode = ({
  children,
}: {
  children: React.PropsWithChildren;
}) => {
  return <div className="font-fira">{children}</div>;
};
