import { base_url } from 'config/constant';
import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarById } from 'redux/action/carActions';
import img1 from "../../../../public/assets/defaultuser.png";
import { IoRadioButtonOn } from 'react-icons/io5';
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const ShowDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const carDetails = useSelector(state => state.carReducer.carDetails);
    console.log(carDetails,"this is the image of car")

    useEffect(() => {
        if (id) {
            dispatch(getCarById({ id }));
        }
    }, [dispatch, id]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">
                                <MdOutlineArrowCircleLeft 
                                    className='me-2 cusor-pointer'
                                    onClick={() => navigate('/app/carBrand/table')}
                                /> 
                                Car Details
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className='d-flex gap-4'>
                                <img
                                    src={carDetails?.brandLogo ? `${base_url}${carDetails?.brandLogo}` : img1}
                                    alt="img"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: "100%",
                                        border: "2px solid gray"
                                    }}
                                />
                                <div>
                                    <h3><b>Brand Name :-</b> {carDetails?.brandName}</h3>
                                    <h4>
                                        <b>Status :- </b>
                                        {carDetails?.status}{" "}
                                        {carDetails?.status === "Active" ? (
                                            <IoRadioButtonOn className="text-success" />
                                        ) : (
                                            <IoRadioButtonOn className="text-danger" />
                                        )}
                                    </h4>
                                    <h4><b>Models :- </b></h4>
                                    <ul>
                                        {carDetails?.models?.map((model) => (
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

export default ShowDetails