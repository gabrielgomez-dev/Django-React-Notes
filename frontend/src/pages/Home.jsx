import React from "react";
import NoteList from "../components/Notes/NoteList";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <NoteList />
    </>
  );
}
