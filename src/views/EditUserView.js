import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listUserDetails, updateUser } from "../redux/userActions";
import { USER_UPDATE_RESET } from "../redux/userConstants";
import { useDispatch, useSelector } from "react-redux";

const EditUserView = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading: loadingDetails, user } = useSelector(
    (state) => state.userDetails
  );
  const { pageList } = useSelector((state) => state.usersPageList);

  const { loading: loadingUpdate, success: successUpdate } = useSelector(
    (state) => state.userUpdate
  );

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    } else {
      if (!user || !user.name) {
        dispatch(listUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, userId, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: userId, name, email }));
    const updatedUser = {
      id: parseInt(userId),
      name,
      username: name.split(" ")[0],
      address: {
        city: "",
      },
      email,
    };

    pageList.forEach((item) => item.id == userId && pageList.splice(item, 1));
    pageList.push(updatedUser);
    history.push("/");
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loadingDetails || loadingUpdate ? (
        <h3>loading...</h3>
      ) : (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <h2>Edit user</h2>
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
                      Update
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
