import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listUserDetails, updateUser } from "../redux/userActions";
import { USER_UPDATE_RESET } from "../redux/userConstants";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";

const EditUserView = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2>New user</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Row>
                <Col>
                  <Link to="/">
                    <Button variant="info" block>
                      Cancel
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Button type="submit" variant="primary" block>
                    Create
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditUserView;
