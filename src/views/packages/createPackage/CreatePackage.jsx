import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as packageAction from '../../../redux/action/packageActions';

const CreatePackage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [initialValues, setInitialValues] = useState({
        packageName: '',
        price: '',
        radius: ''
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const payload = new FormData();

        payload.append('packageName', values.packageName);
        payload.append('price', values.price);
        payload.append('radius', values.radius);

        dispatch(packageAction.createPackage({
            values: payload,

            onNavigate: () => {
                setSubmitting(false);
                resetForm();
                navigate('/app/package/default');
            },
        }))
    };


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5"> Create Packages</Card.Title>
                            <span className="d-block m-t-5">
                                Package <code>Model</code> Form
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                validationSchema={Yup.object().shape({
                                    packageName: Yup.string().required('Package name is required'),
                                    price: Yup.string().required('Rrice is required'),
                                    radius: Yup.string().required('Radius is required'),
                                })}
                                onSubmit={onSubmit}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="g-3">
                                            <Col sm={6}>
                                                <Form.Group controlId="packageName">
                                                    <Form.Label>Package Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="packageName"
                                                        value={values.packageName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Package Name"
                                                        isInvalid={touched.packageName && !!errors.packageName}
                                                        className="focus:border-0 shadow-none p-2"

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.packageName}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="price">
                                                    <Form.Label>Package Price</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="price"
                                                        value={values.price}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Package Price"
                                                        isInvalid={touched.price && !!errors.price}
                                                        className="focus:border-0 shadow-none p-2"

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.price}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="radius">
                                                    <Form.Label>Package Radius</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="radius"
                                                        value={values.radius}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Radius"
                                                        isInvalid={touched.radius && !!errors.radius}
                                                        className="focus:border-0 shadow-none p-2"

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.radius}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col className="d-flex justify-content-end">
                                                <Button type="submit"
                                                    variant="primary btn-sm"
                                                    disabled={isSubmitting}>
                                                    {isSubmitting ? 'Submitting...' : 'Submit'}
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
    );
};

export default CreatePackage;
