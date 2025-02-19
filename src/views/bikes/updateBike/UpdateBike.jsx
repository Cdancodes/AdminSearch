import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as bikeAction from '../../../redux/action/bikeActions';
import { getBikeById } from '../../../redux/action/bikeActions';
import BrandLogoUploader from 'components/ImageUploader/BrandLogoUploader';
import { base_url } from 'config/constant';

const UpdateBike = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState("");
    const [addedItems, setAddedItems] = useState([]);
    console.log(addedItems, "this is the added items....!")

    const bikeDetails = useSelector(state => state.bikeReducer.bikeDetails);

    // console.log(bikeDetails, "this is the bike details....!")

    useEffect(() => {
        if (id) {
            dispatch(bikeAction.getBikeById({ id }));
        }
    }, [dispatch, id]);

    const [initialValues, setInitialValues] = useState({
        brandId: "",
        brandName: "",
        modelName: "",
        models: [],
        status: "",
        brandLogo: ""
    });

    useEffect(() => {
        if (bikeDetails && bikeDetails.brandId) {
            setInitialValues((prevValues) => ({
                ...prevValues,
                brandId: bikeDetails.brandId,
                brandName: bikeDetails.brandName,
                status: bikeDetails.status,
                brandLogo: bikeDetails.brandLogo
            }));
            setAddedItems(bikeDetails.models || []);
        }

    }, [bikeDetails, setInitialValues]);


    const handleAddItem = () => {
        if (initialValues.modelName && initialValues.models.length > 0) {
            setAddedItems([...addedItems, { modelName: initialValues.modelName, versions: initialValues.models }]);
            setInitialValues({ modelName: "", models: [] });
        }
    };

    const onSubmit = (values, { setSubmitting, resetForm }) => {

        const payload = new FormData();

        payload.append("_id", id);

        if (values.brandLogo instanceof File) {
            payload.append("brandLogo", values.brandLogo);
        }

        payload.append('brandId', values.brandId);
        payload.append('brandName', values.brandName);
        payload.append('status', values.status);
        payload.append('models', JSON.stringify(addedItems));

        dispatch(bikeAction.updateBike({
            values: payload,
            onNavigate: () => {
                setSubmitting(false);
                resetForm();
                navigate('app/bikeBrand/BikeBrand');
            }
        }))
    }


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Update Bike model</Card.Title>
                            <span className="d-block m-t-5">
                                Update <code>Bike</code> Form
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                const validationSchema={Yup.object().shape({
                                    // brandId: Yup.string().required("car name is required"),
                                    // brandName: Yup.string().required("car name is required"),
                                    // models: Yup.array()
                                    //     .of(Yup.string().required("Model name is required"))
                                    //     .min(1, "At least one model is required"),
                                    // status: Yup.string().required("Status is required"),
                                    // brandLogo: Yup.string().required("car logo is required")
                                })}
                                onSubmit={onSubmit}
                            >
                                {({ errors, handleBlur, setFieldValue, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="g-3">

                                            <BrandLogoUploader
                                                setFieldValue={setFieldValue}
                                                handleBlur={handleBlur}
                                                touched={touched}
                                                errors={errors}
                                                initialImage={bikeDetails?.brandLogo ? `${base_url}${bikeDetails?.brandLogo}` : null}
                                            />

                                            <Col sm={6}>
                                                <Row>
                                                    <Form.Group controlId="brandId">
                                                        <Form.Label>Brand Id</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="brandId"
                                                            value={values.brandId}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Enter Banner Name"
                                                            isInvalid={touched.brandId && !!errors.brandId}
                                                            className="focus:border-0 shadow-none p-2"
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.brandId}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>

                                                <Row className="mt-3">
                                                    <Form.Group controlId="brandName">
                                                        <Form.Label>Brand Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="brandName"
                                                            value={values.brandName}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Enter Banner Name"
                                                            isInvalid={touched.brandName && !!errors.brandName}
                                                            className="focus:border-0 shadow-none p-2"
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.brandName}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                            </Col>

                                            <div>
                                                {addedItems.length > 0 && (
                                                    <div className="mb-5">
                                                        {addedItems.map((item, index) => (
                                                            <div key={index} className="p-1 bg-light rounded mb-2">
                                                                <b>{item.modelName}:</b> {item.versions.join(", ")}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <Row className="d-flex align-items-center mt-2">
                                                    <Col sm={4}>
                                                        <Form.Group controlId="modelName">
                                                            <Form.Label>Model Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="modelName"
                                                                value={initialValues.modelName}
                                                                onChange={(e) => setInitialValues({ ...initialValues, modelName: e.target.value })}
                                                                placeholder="Enter Model Name"
                                                                className="focus:border-0 shadow-none p-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col sm={4}>
                                                        <Form.Group controlId="models">
                                                            <Form.Label>Version</Form.Label>
                                                            <div className="d-flex flex-wrap">
                                                                {initialValues.models.map((input, index) => (
                                                                    <div key={index} className="badge bg-info text-white me-2 p-2">
                                                                        {input}
                                                                        <span
                                                                            className="ms-2 cursor-pointer"
                                                                            onClick={() => setInitialValues({ ...initialValues, models: initialValues.models.filter((_, i) => i !== index) })}
                                                                        >
                                                                            ✖
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <Form.Control
                                                                type="text"
                                                                value={inputValue}
                                                                onChange={(e) => setInputValue(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if ((e.key === " " || e.key === "Enter") && inputValue.trim()) {
                                                                        e.preventDefault();
                                                                        setInitialValues({ ...initialValues, models: [...initialValues.models, inputValue.trim()] });
                                                                        setInputValue("");
                                                                    }
                                                                }}
                                                                placeholder="Type and press space or enter"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col sm={2} className="d-flex justify-content-start align-items-center mt-4">
                                                        <Button variant="primary btn-sm" onClick={handleAddItem}>
                                                            Add
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <Col sm={3}>
                                                <Form.Group controlId="status">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select
                                                        name="status"
                                                        value={values.status}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.status && !!errors.status}
                                                        className="focus:border-0 shadow-none p-2"
                                                    >
                                                        <option value="">Select Status</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.status}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col className="d-flex justify-content-end">
                                                <Button variant="danger btn-sm"
                                                    onClick={() => navigate('/app/bikeBrand/BikeBrand')}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="primary btn-sm" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Submitting...' : 'Update'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default UpdateBike