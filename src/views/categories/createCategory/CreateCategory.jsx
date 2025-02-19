import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MdDescription } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';



function CreateCategory() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const [initialValues, setInitialValues] = useState({
        productImg: '',
        productId: '',
        categoryTitle: '',
        description: '',
        categoryInputs: [""],
        status: ''
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {

        setSubmitting(false);
        resetForm();

    }

    return (

        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Create Category</Card.Title>
                            <span className="d-block m-t-5">
                                Category <code>Model</code> Form
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                const validationSchema={Yup.object().shape({
                                    productImg: Yup.string().required("Product Image is required"),
                                    productId: Yup.string().required("Product ID is required"),
                                    categoryTitle: Yup.string().required("Category Title is required"),
                                    description: Yup.string().required("Description is required"),
                                    categoryInputs: Yup.array()
                                        .of(Yup.string().required("Category input is required"))
                                        .min(1, "At least one category input is required"),
                                    status: Yup.string().required("Status is required"),
                                })}
                                onSubmit={onSubmit}
                            >
                                {({ errors, handleBlur, setFieldValue, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="g-3">
                                            <Col sm={6}>
                                                <Form.Group controlId="productImg">
                                                    <Form.Label>Product Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="productImg"
                                                        value={values.productImg}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Brand Name"
                                                        isInvalid={touched.productImg && !!errors.productImg}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.productImg}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="productId">
                                                    <Form.Label>Product Id</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="productId"
                                                        value={values.productId}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Brand Item"
                                                        isInvalid={touched.productId && !!errors.productId}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.productId}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="categoryTitle">
                                                    <Form.Label>Category Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="categoryTitle"
                                                        value={values.categoryTitle}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Brand Number"
                                                        isInvalid={touched.categoryTitle && !!errors.categoryTitle}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.categoryTitle}
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
                                                <Form.Group controlId="categoryInputs">
                                                    <Form.Label>Sub-Category Inputs</Form.Label>

                                                    <div className="d-flex flex-wrap">
                                                        {values.categoryInputs.length > 0 && (
                                                            <div className="d-flex flex-wrap">
                                                                {values.categoryInputs.map((input, index) => (
                                                                    <div key={index} className="d-flex align-items-center mb-2 me-2">
                                                                        <div className="badge bg-info d-flex align-items-center px-3 py-1">
                                                                            {input}
                                                                            <span
                                                                                className="ms-2 text-white cursor-pointer"
                                                                                onClick={() => {
                                                                                    const newInputs = values.categoryInputs.filter((_, i) => i !== index);
                                                                                    setFieldValue("categoryInputs", newInputs);
                                                                                }}
                                                                            >
                                                                                ✖
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                    </div>

                                                    <Form.Control
                                                        type="text"
                                                        name="categoryInputs"
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        onKeyUp={(e) => {
                                                            if ((e.key === " " || e.key === "Enter") && inputValue.trim()) {
                                                                setFieldValue("categoryInputs", [...values.categoryInputs, inputValue.trim()]);
                                                                setInputValue("");
                                                            }
                                                        }}
                                                        onBlur={handleBlur}
                                                        placeholder="Type and press space or enter"
                                                        isInvalid={touched.categoryInputs && !!errors.categoryInputs}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.categoryInputs}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
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
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
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
                                                    onClick={() => navigate('/app/categorieTable/CategoryList')}
                                                >
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

export default CreateCategory