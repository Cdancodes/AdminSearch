import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { getBanners, deleteBanner } from '../../../redux/action/bannerActions';
import img1 from "../../../../public/assets/defaultuser.png";
import { base_url } from 'config/constant';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoRadioButtonOn } from "react-icons/io5";


const BannerList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const banners = useSelector(state => state.bannerReducer.banners);

    useEffect(() => {
        dispatch(getBanners({}));
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteBanner({ id }))
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
                                onClick={() => navigate('/app/createBanner/default')}
                            >
                                Create
                            </button>
                        </Card.Header>

                        <Card.Body>
                            <Table responsive>
                                <thead>
                                    <tr className='p-0'>
                                        <th scope='row' className='p-1'>Sr. no.</th>
                                        <th className="p-0">Banner Image</th>
                                        <th className="p-0">Banner Name</th>
                                        <th className="p-0">Description</th>
                                        <th className="p-0">Redirect</th>
                                        <th className="p-0">Type</th>
                                        <th className="p-0">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {banners && banners?.map((item, i) => (
                                        <tr key={i} className="p-0 cursor-pointer bg-light-hover">
                                            <th scope="row" className='p-0'>{i + 1}</th>
                                            <td className="p-1">
                                                <img
                                                    src={item.url ? `${base_url}${item.url}` : img1}
                                                    alt="banner"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: "100%",
                                                        border: "2px solid gray"
                                                    }}
                                                />
                                            </td>

                                            <td className={cls}>{item.title}</td>
                                            <td className={cls}>{item.description}</td>
                                            <td className={cls}>{item.useFor}</td>
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
                                                    onClick={() => navigate(`/app/updateBanner/default/${item._id}`)}
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

export default BannerList;