import React from "react";
import NoteList from "../../components/Notes/NoteList";
import DefaultLayout from "../../layouts/DefaultLayout";

export default function NoteIndex() {
  return (
    <DefaultLayout>
      <NoteList />
    </DefaultLayout>
  );
}
