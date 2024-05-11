import React from "react";
import Navigation from "../components/Navigation";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
