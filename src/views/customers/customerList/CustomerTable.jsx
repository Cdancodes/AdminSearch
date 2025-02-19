import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getCustomers, deleteCustomer } from 'redux/action/customerActions';
import { IoRadioButtonOn } from 'react-icons/io5';
import { base_url } from 'config/constant';
import img1 from "../../../../public/assets/defaultuser.png";
import { useNavigate } from 'react-router-dom';


const CustomerTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.customerReducer
  );

  console.log(customers, "this is the customers...!")

  const [page, setPage] = useState(currentPage);

  const handleDelete = (id) => {
    dispatch(deleteCustomer({ id }))
  }

  useEffect(() => {
    dispatch(getCustomers({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const cls = "p-0 text-secondary";


  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title as="h5">Customer Table</Card.Title>
              <div className='d-flex'>
                <form className="me-3 position-relative "
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="search"
                    className="form-control p-1"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <BiSearch
                    className="position-absolute top-50 translate-middle-y end-0 me-2 text-muted"
                    style={{ pointerEvents: "none" }}
                  />
                </form>

                <div></div>

                {/* <button
                  type="button"
                  className="btn btn-info btn-sm py-1"
                  onClick={() => navigate('/app/createCustomer/default')}
                >
                  Create
                </button> */}
              </div>
            </Card.Header>
            <Card.Body>
              {/* {loading ? <>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                  <div className="spinner-grow text-info" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>

              </> : */}
              <Table responsive>
                <thead>
                  <tr>
                    <th>Sr. no</th>
                    <th>Profile Image</th>
                    <th>Customer Name</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {customers && customers.map((item, i) => (
                    <tr key={i} className="p-0">
                      <th scope="row" class="p-0">{i + 1}</th>
                      <td className="p-1">
                        <img
                          src={item.profileImage ? `${base_url}${item.profileImage}` : img1}
                          alt="banner"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: "100%",
                            border: "2px solid gray"
                          }}
                        />
                      </td>
                      <td className={cls}>{item.customerName}</td>
                      <td className={cls}>{item.gender}</td>
                      <td className={cls}>{item.phoneNumber}</td>
                      <td className={cls}>{item.email}</td>
                      <td className={cls}>
                        {item.status}{" "}
                        {item.status === "Active" ? (
                          <IoRadioButtonOn className="text-success" />
                        ) : (
                          <IoRadioButtonOn />
                        )}
                      </td>

                      <td className="">
                        <FaEdit
                          onClick={() => navigate(`/app/udpateCustomer/default/${item._id}`)}
                          className="text-info cursor-pointer me-3"
                          style={{ cursor: "pointer" }}
                        />
                        <MdDelete
                          onClick={() => handleDelete(item._id)}
                          className="text-danger cursor-pointer"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <nav>
                <ul className="pagination">
                  <li >
                    <button
                      className="page-link"
                      onClick={handlePrevPage}
                    >
                      Previous
                    </button>
                  </li>
                  <span className='ms-5 me-5'> Page {page} of {totalPages} </span>
                  <li
                  >
                    <button
                      className="page-link" 
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CustomerTable;
