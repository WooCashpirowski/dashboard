import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { listUsers, deleteUser, listPageUsers } from "../redux/userActions";
import { USER_DETAILS_RESET } from "../redux/userConstants";
import Modal from "../Components/Modal";

const DashboardView = () => {
  const [showModal, setShowModal] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.usersList);
  const { pageList } = useSelector((state) => state.usersPageList);
  const {
    loading: loadingDel,
    error: errorDel,
    success: successDel,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
    dispatch(listUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
      const pageListfiltered = pageList.filter((user) => user.id !== id);
      dispatch(listPageUsers(pageListfiltered));
    }
    if (successDel) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1000);
    }
  };

  const sortByUserName = () => {
    if (sortAsc) {
      const sortedAsc = pageList.sort((a, b) =>
        a.username < b.username ? -1 : a.username > b.username ? 1 : 0
      );
      dispatch(listPageUsers(sortedAsc));
      setSortAsc(false);
    } else {
      const sortedDesc = users.sort((a, b) =>
        b.username < a.username ? -1 : b.username > a.username ? 1 : 0
      );
      dispatch(listPageUsers(sortedDesc));
      setSortAsc(true);
    }
  };

  const sortByUserId = () => {
    const sortedAsc = pageList.sort((a, b) =>
      a.id < b.id ? -1 : a.id > b.id ? 1 : 0
    );
    dispatch(listPageUsers(sortedAsc));
  };

  return (
    <>
      {showModal && <Modal info={successDel && "User deleted"} />}
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
        <>
          {pageList && pageList.length === 0 && (
            <Alert variant="primary">There are no users. Add some.</Alert>
          )}
          <Table>
            <thead>
              <tr>
                <th>
                  <div style={{ cursor: "pointer" }} onClick={sortByUserId}>
                    Id <AiOutlineArrowDown />
                  </div>
                </th>
                <th>Name</th>
                <th>
                  <div style={{ cursor: "pointer" }} onClick={sortByUserName}>
                    Username{" "}
                    {sortAsc ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </div>
                </th>
                <th>City</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageList &&
                pageList.map((user) => (
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
        </>
      )}
    </>
  );
};

export default DashboardView;
