import { Spinner } from "react-bootstrap";

export default function LoadingIndicator() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span><br />
    </Spinner>
  );
}
