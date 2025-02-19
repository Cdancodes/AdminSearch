import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const navigate = useNavigate()


    const page = 1;
    const totalPages = 10;

    const handlePrevPage = () => {

    }

    const handleNextPage = () => {

    }

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


                                <button
                                    type="button"
                                    className="btn btn-info btn-sm py-1"
                                    onClick={() => navigate('/app/createCategory/CreateCategory')}
                                >
                                    Create
                                </button>
                            </div>
                        </Card.Header>
                        <Card.Body>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
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
    )
}

export default CategoryList