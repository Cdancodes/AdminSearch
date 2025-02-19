import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import img1 from "../../../../public/assets/defaultuser.png";
import { base_url } from 'config/constant';
import { FaEdit, FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getBikes, deleteBike } from 'redux/action/bikeActions';
import { IoRadioButtonOn } from 'react-icons/io5';

const BikeBrand = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(state => state.bikeReducer.bikes)

    useEffect(() => {
        dispatch(getBikes({}));
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteBike({ id }))
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
                                onClick={() => navigate('/app/createBike/default')}
                            >
                                Create
                            </button>
                        </Card.Header>


                        <Card.Body>
                            <Table responsive>
                                <thead>
                                    <tr className='p-0'>
                                        <th scope='row' className='p-1'>Sr. no.</th>
                                        <th className="p-0">Brand Id</th>
                                        <th className='p-0'>Brand Image</th>
                                        <th className="p-0">Brand Name</th>
                                        <th className="p-0">Status</th>
                                        <th className="p-0">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data?.map((item, i) => (
                                        <tr key={i} className='p-0'>
                                            <th scope="row" className='p-0'>{i + 1}</th>
                                            <td className="p-0">{item.brandId}</td>
                                            <td className="p-1">
                                                <img
                                                    src={item.brandLogo ? `${base_url}${item.brandLogo}` : img1}
                                                    alt="img"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: "100%",
                                                        border: "2px solid gray"
                                                    }}
                                                />
                                            </td>

                                            <td className={cls}>{item.brandName}</td>
                                            <td className={cls}>
                                                {item.status}{" "}
                                                {item.status === "Active" ? (
                                                    <IoRadioButtonOn className="text-success" />
                                                ) : (
                                                    <IoRadioButtonOn />
                                                )}
                                            </td>
                                            <td className="justify-content-around align-items-center">
                                                <FaRegEye
                                                    onClick={() => navigate(`/app/bikeDetails/default/${item._id}`)}
                                                    className="text-orange cursor-pointer me-2" style={{ cursor: 'pointer' }} />
                                                <FaEdit
                                                     onClick={() => navigate(`/app/updateBike/default/${item._id}`)}
                                                    className="text-info cursor-pointer me-2" style={{ cursor: 'pointer' }} />
                                                <MdDelete
                                                    onClick={() => handleDelete(item._id)}
                                                    className="text-danger cursor-pointer" style={{ cursor: 'pointer' }} />
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
    )
}

export default BikeBrand