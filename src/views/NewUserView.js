import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createUser } from "../redux/userActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Components/Modal";

const EditUserView = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userCreate);
  const { pageList } = useSelector((state) => state.usersPageList);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(name, email));
    const newUser = {
      id: pageList.length + 11,
      name,
      username: name.split(" ")[0],
      address: {
        city: "",
      },
      email,
    };
    pageList.push(newUser);
    history.push("/");
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Modal info="loading..." />
      ) : (
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

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
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
      )}
    </>
  );
};

export default EditUserView;
