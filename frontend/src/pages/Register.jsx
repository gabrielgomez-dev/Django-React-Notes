import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AuthForm from "../components/Form";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <AuthForm route="/api/register/" loginOrRegister="register" />

              <div className="mt-4 text-end">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
