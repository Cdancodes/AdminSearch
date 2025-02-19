import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { FaEdit, FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { deletePackage, getPackages } from 'redux/action/packageActions';


const PackageTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const packages = useSelector(state => state.packageReducer.packages);

    useEffect(() => {
        dispatch(getPackages());
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deletePackage({ id }))
    }

    const cls = "p-0 text-secondary";


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="d-flex justify-content-end align-items-center">
                            <form className="me-3 position-relative"
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
                                onClick={() => navigate('/app/createPackage/default')}
                            >
                                Create
                            </button>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Sr. no</th>
                                        <th>Package Name</th>
                                        <th>Price</th>
                                        <th>Radius</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {packages.map((item, i) => (
                                        <tr key={i} className="p-0">
                                            <th scope="row" class="p-0">{i + 1}</th>
                                            <td className={cls}>{item.packageName}</td>
                                            <td className={cls}>$ {item.price}</td>
                                            <td className={cls}>{item.radius} km</td>
                                            <td className="d-flex align-items-center justify-content-center">
                                                <FaRegEye
                                                    onClick={() => navigate(`/app/showPackage/default/${item._id}`)}
                                                    className="text-orange cursor-pointer me-2" style={{ cursor: 'pointer' }} />
                                                <FaEdit
                                                    onClick={() => navigate(`/app/udpatePackage/default/${item._id}`)}
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

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PackageTable;
