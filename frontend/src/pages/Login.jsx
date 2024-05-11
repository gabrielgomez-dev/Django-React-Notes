import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <AuthForm route="/api/token/" loginOrRegister="login" />

              <div className="mt-4 text-end">
                No account? <Link to="/register">Register here</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
