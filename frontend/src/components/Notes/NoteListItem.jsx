import React from "react";
import { Button, ListGroup } from "react-bootstrap";

export default function NoteListItem({ note, onDelete }) {
  const noteCreatedAtFormat = new Date(note.created_at).toLocaleDateString(
    "es-LA"
  );

  return (
    <ListGroup.Item key={note.id}>
      <div className="pt-2">
        <h4>{note.title}</h4>
        <p>{note.content}</p>
        <p>{noteCreatedAtFormat}</p>
      </div>
      <Button variant="danger" onClick={() => onDelete(note.id)}>
        Delete
      </Button>
    </ListGroup.Item>
  );
}
