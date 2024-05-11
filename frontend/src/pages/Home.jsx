import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Alert,
} from "react-bootstrap";
import api from "../../api";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotesFromAPI();
  }, []);

  const fetchNotesFromAPI = async () => {
    try {
      const { data } = await api.get("/api/notes/");
      setNotes(data);
    } catch (error) {
      setError("Failed to fetch notes");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this note?"
      );

      if (confirmed) {
        const response = await api.delete(`/api/notes/${noteId}/delete/`);

        if (response.status === 204) {
          fetchNotesFromAPI();
        } else {
          setError("Failed to delete note");
        }
      }
    } catch (error) {
      setError("Failed to delete note");
    }
  };

  const createNewNote = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/notes/", {
        title,
        content,
      });

      if (response.status === 201) {
        fetchNotesFromAPI();
        setTitle("");
        setContent("");
      } else {
        setError("Failed to add a new note");
      }
    } catch (error) {
      setError("Failed to add a new note");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-4 mb-4">Notes</h1>
          <Form onSubmit={createNewNote} className="mb-4">
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Control
                required
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Note
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {notes.map((note) => (
              <ListGroup.Item key={note.id}>
                <div className="pt-2">
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                </div>
                <Button variant="danger" onClick={() => deleteNote(note.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
