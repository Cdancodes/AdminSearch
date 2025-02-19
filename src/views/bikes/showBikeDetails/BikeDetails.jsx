import { base_url } from 'config/constant';
import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBikeById } from 'redux/action/bikeActions';
import img1 from "../../../../public/assets/defaultuser.png";
import { IoRadioButtonOn } from 'react-icons/io5';
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const BikeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const bikeDetails = useSelector(state => state.bikeReducer.bikeDetails);

    useEffect(() => {
        if (id) {
            dispatch(getBikeById({ id }));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (bikeDetails) {
            console.log(bikeDetails);
        }
    }, [bikeDetails]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">
                                <MdOutlineArrowCircleLeft 
                                    className='me-2 cusor-pointer'
                                    onClick={() => navigate('/app/bikeBrand/BikeBrand')}
                                /> 
                                Bike Details
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className='d-flex gap-4'>
                                <img
                                    src={bikeDetails?.brandLogo ? `${base_url}${bikeDetails?.brandLogo}` : img1}
                                    alt="img"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: "100%",
                                        border: "2px solid gray"
                                    }}
                                />
                                <div>
                                    <h3><b>Brand Name :-</b> {bikeDetails?.brandName}</h3>
                                    <h4>
                                        <b>Status :- </b>
                                        {bikeDetails?.status}{" "}
                                        {bikeDetails?.status === "Active" ? (
                                            <IoRadioButtonOn className="text-success" />
                                        ) : (
                                            <IoRadioButtonOn className="text-danger" />
                                        )}
                                    </h4>
                                    <h4><b>Models :- </b></h4>
                                    <ul>
                                        {bikeDetails?.models?.map((model) => (
                                            <li key={model._id}>
                                                <b>{model.modelName}:</b> {model.versions.join(", ")}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default BikeDetails