import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateBrand = () => {
    const navigate = useNavigate();
    const { id, name } = useParams();

    const [initialValues, setInitialValues] = useState({
        brandName: '',
        brandItem: '',
        brandNumber: '',
        modelName: ''
    });

    useEffect(() => {
        if (id) {
            const carDetails = JSON.parse(localStorage.getItem('carDetails')) ?? [];
            const itemToEdit = carDetails.find(item => item.id === id);
            if (itemToEdit) {
                setInitialValues(itemToEdit);
            }
        }
    }, [id]);

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const carDetails = JSON.parse(localStorage.getItem('carDetails')) ?? [];

        if (id && !name) {
            const updatedData = carDetails.map(item =>
                item.id === id ? { ...item, ...values } : item
            );
            localStorage.setItem('carDetails', JSON.stringify(updatedData));
        } else if (id && name) {
            const updatedData = carDetails.map(item =>
                item.id === id ? { ...item, ...values } : item
            );
            localStorage.setItem('carDetails', JSON.stringify(updatedData));
        }
        else {
            const uniqueId = uuidv4();
            const dataWithId = { id: uniqueId, ...values };
            localStorage.setItem('carDetails', JSON.stringify([...carDetails, dataWithId]));
        }

        setSubmitting(false);
        resetForm();
        navigate('/app/carBrand/table');
    };


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">{id ? 'Update' : 'Create'} Car Brand</Card.Title>
                            <span className="d-block m-t-5">
                                Car <code>Model</code> Form
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                validationSchema={Yup.object().shape({
                                    brandName: Yup.string().required('Brand Name is required'),
                                    brandItem: Yup.string().required('Brand Item is required'),
                                    brandNumber: Yup.string()
                                        .matches(/^\d+$/, 'Must be a number')
                                        .required('Brand Number is required'),
                                    modelName: Yup.string().required('Model Name is required'),
                                })}
                                onSubmit={onSubmit}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="g-3">
                                            <Col sm={6}>
                                                <Form.Group controlId="brandName">
                                                    <Form.Label>Brand Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="brandName"
                                                        value={values.brandName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Brand Name"
                                                        isInvalid={touched.brandName && !!errors.brandName}
                                                        className="focus:border-0 shadow-none p-2"
                                                        readOnly={id && name ? true : false}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.brandName}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="brandItem">
                                                    <Form.Label>Brand Item</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="brandItem"
                                                        value={values.brandItem}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Brand Item"
                                                        isInvalid={touched.brandItem && !!errors.brandItem}
                                                        className="focus:border-0 shadow-none p-2"
                                                        readOnly={id && name ? true : false}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.brandItem}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="brandNumber">
                                                    <Form.Label>Brand Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="brandNumber"
                                                        value={values.brandNumber}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Brand Number"
                                                        isInvalid={touched.brandNumber && !!errors.brandNumber}
                                                        className="focus:border-0 shadow-none p-2"
                                                        readOnly={id && name ? true : false}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.brandNumber}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="modelName">
                                                    <Form.Label>Model Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="modelName"
                                                        value={values.modelName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Model Name"
                                                        isInvalid={touched.modelName && !!errors.modelName}
                                                        className="focus:border-0 shadow-none p-2"
                                                        readOnly={id && name ? true : false}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.modelName}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col className="d-flex justify-content-end">
                                                {!name && <Button type="submit" variant="primary btn-sm" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Submitting...' : id && !name ? 'Update' : 'Submit'}
                                                </Button>}
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

export default CreateBrand;
