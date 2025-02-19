import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as bannerAction from "../../../redux/action/bannerActions";
import { useNavigate } from 'react-router-dom';

const CreateBanner = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        title: '',
        url: '',
        description: '',
        useFor: '',
        // useFor: ''
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {

        const payload = new FormData();

        if (values.url) {
            payload.append('url', values.url); 
        }

        payload.append('title', values.title);
        payload.append('description', values.description);
        payload.append('useFor', values.useFor);

        dispatch(bannerAction.createBanner({
            values: payload,
            onNavigate: () => {
                setSubmitting(false);
                resetForm();
                navigate('/app/banner/BannerList');
            }
        }));
    };


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Create Banner</Card.Title>
                            <span className="d-block m-t-5">
                                Create <code>Banner</code> Form
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                const validationSchema={Yup.object().shape({
                                    title: Yup.string().required("Banner name is required"),
                                    url: Yup.string().required("Banner image is required"),
                                    description: Yup.string().required("Description is required"),
                                    useFor: Yup.string().required("Banner Type is required")
                                })}
                                onSubmit={onSubmit}
                            >
                                {({ errors, handleBlur, setFieldValue, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="g-3">
                                            <Col sm={6}>
                                                <Form.Group controlId="title">
                                                    <Form.Label>Banner name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="title"
                                                        value={values.title}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Banner Name"
                                                        isInvalid={touched.title && !!errors.title}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.title}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="url">
                                                    <Form.Label>Banner Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="url"
                                                        onChange={(e) => {
                                                            const file = e.currentTarget.files[0];
                                                            setFieldValue("url", file); // Correct way to store file in Formik
                                                        }}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Brand Item"
                                                        isInvalid={touched.url && !!errors.url}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.url}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="description">
                                                    <Form.Label>Decription</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="description"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Model Name"
                                                        isInvalid={touched.description && !!errors.description}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.description}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="useFor">
                                                    <Form.Label>Banner TYpe</Form.Label>
                                                    <Form.Select
                                                        name="useFor"
                                                        value={values.useFor}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.useFor && !!errors.useFor}
                                                        className="focus:border-0 shadow-none p-2"
                                                    >
                                                        <option value="">Select Status</option>
                                                        <option value="app_home_banner">App-Home-Banner</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.useFor}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col className="d-flex justify-content-end">
                                                <Button variant="danger btn-sm">
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="primary btn-sm" disabled={isSubmitting}>
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
    )
}

export default CreateBanner