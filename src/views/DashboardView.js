import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { listUsers, deleteUser } from "../redux/userActions";
import { Link } from "react-router-dom";
import { USER_DETAILS_RESET } from "../redux/userConstants";
import Header from "../Components/Header";
import Modal from "../Components/Modal";

const DashboardView = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.usersList);
  const {
    loading: loadingDel,
    error: errorDel,
    success: successDel,
  } = useSelector((state) => state.userDelete);

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
    dispatch(listUsers());
    if (users && !loading) {
      setUsersList(users);
    }
  }, [dispatch, successDel]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
    if (successDel) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1000);
    }
    const usersFiltered = users.filter((user) => user.id !== id);
    setUsersList(usersFiltered);
  };

  return (
    <>
      {showModal && <Modal info={successDel && "User deleted"} />}
      <Header />
      <Row className="align-items-center">
        <Col className="text-right">
          <Link to="/new-user" className="btn btn-primary my-3">
            Add User
          </Link>
        </Col>
      </Row>
      {loading || loadingDel ? (
        <Modal info="loading..." />
      ) : error || errorDel ? (
        <Modal info={error || errorDel} />
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>City</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.address.city}</td>
                  <td>{user.email}</td>
                  <td>
                    <LinkContainer to={`/user/${user.id}`}>
                      <Button variant="info" className="btn-sm" block>
                        Edit
                      </Button>
                    </LinkContainer>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      block
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default DashboardView;
