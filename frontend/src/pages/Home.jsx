import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <DefaultLayout>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div>
              <h1 className="text-center mt-5">Welcome to My Notes App</h1>
              <p className="text-center mt-3">
                This is a simple note-taking app built using Django and React.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}
