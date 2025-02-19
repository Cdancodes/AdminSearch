
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as customerAction from "../../../redux/action/customerActions";
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerById } from 'redux/action/customerActions';
import BrandLogoUploader from 'components/ImageUploader/BrandLogoUploader';
import { base_url } from 'config/constant';

const UpdateCustomer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const customers = useSelector(state => state.customerReducer.customerDetails);

    console.log(customers, "this is the customer details")

    useEffect(() => {
        if (id) {
            dispatch(getCustomerById({ id }))
        }
    }, [dispatch, id]);


    const [initialValues, setInitialValues] = useState({
        customerName: '',
        profileImage: '',
        email: '',
        dateOfBirth: '',
        pincodes: [],
        countryCode: '',
        phoneCode: '',
        phoneNumber: '',
        gender: '',
        currentAddress: {
            address: '',
            city: '',
            state: '',
            country: ''
        },
    });

    useEffect(() => {
        if (customers) {
            setInitialValues(prev => ({
                ...prev,
                customerName: customers.customerName || '',
                profileImage: customers.profileImage || '',
                email: customers.email || '',
                dateOfBirth: customers.dateOfBirth ? customers.dateOfBirth.split('T')[0] : '',
                pincodes: customers.pincodes || [],
                countryCode: customers.countryCode || '',
                phoneCode: customers.phoneCode || '',
                phoneNumber: customers.phoneNumber || '',
                gender: customers.gender || '',
                currentAddress: {
                    address: customers.currentAddress?.address || '',
                    state: customers.currentAddress?.state || '',
                    city: customers.currentAddress?.city || '',
                    country: customers.currentAddress?.country || ''
                }
            }));
        }
    }, [customers]);

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const payload = new FormData();

        console.log(values.pincodes, "this is the values of pincodes")

        if (values.profileImage && values.profileImage instanceof File) {
            payload.append('profileImage', values.profileImage);
        }
        payload.append('id', id);
        payload.append('customerName', values.customerName);
        payload.append('email', values.email);
        payload.append('dateOfBirth', values.dateOfBirth);
        values.pincodes.forEach(pincode => {
            payload.append('pincodes[]', pincode.trim());
        });
        payload.append('countryCode', values.countryCode);
        payload.append('phoneCode', values.phoneCode);
        payload.append('phoneNumber', values.phoneNumber);
        payload.append('gender', values.gender);
        payload.append('currentAddress[address]', values.currentAddress.address);
        payload.append('currentAddress[city]', values.currentAddress.city);
        payload.append('currentAddress[state]', values.currentAddress.state);
        payload.append('currentAddress[country]', values.currentAddress.country);

        dispatch(customerAction.updateCustomer({
            values: payload,

            onNavigate: () => {
                setSubmitting(false);
                resetForm();
                navigate('/app/customer/default');
            }
        }));
    };


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Update Customer</Card.Title>
                            <span className="d-block m-t-5">
                                Update <code>Customer</code> Form
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                const validationSchema={Yup.object().shape({
                                    // customerName: Yup.string().required("Customer name is required"),
                                    // profileImage: Yup.string().required("Customer image is required"),
                                    // email: Yup.string().email("Invalid email format").required("Email is required"),
                                    // dateOfBirth: Yup.string().required("Date of birth is required"),
                                    // // pincodes: Yup.string().required("Pincode is required"),
                                    // countryCode: Yup.string().required("Country code is required"),
                                    // phoneCode: Yup.string().required("Phone code is required"),
                                    // phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
                                    // gender: Yup.string().required("Gender is required"),
                                    // currentAddress: Yup.object().shape({
                                    //     street: Yup.string().required("Street is required"),
                                    //     city: Yup.string().required("City is required"),
                                    //     state: Yup.string().required("State is required"),
                                    //     postalCode: Yup.string().required("Postal code is required")
                                    // })
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
                                                useFor="Customer Profile Image"
                                            initialImage={customers?.brandLogo ? `${base_url}${customers?.brandLogo}` : null}
                                            />

                                            <Col sm={6}>
                                                <Form.Group controlId="customerName">
                                                    <Form.Label>Customer Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="customerName"
                                                        value={values.customerName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Customer Name"
                                                        isInvalid={touched.customerName && !!errors.customerName}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.customerName}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className='mt-3' controlId="email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Email"
                                                        isInvalid={touched.email && !!errors.email}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <hr/>

                                            <Col sm={6}>
                                                <Form.Group controlId="pincodes">
                                                    <Form.Label>Pin Codes</Form.Label>

                                                    {Array.isArray(values.pincodes) && values.pincodes.length > 0 ? (
                                                        values.pincodes.map((pincode, index) => (
                                                            <div key={index} className="mb-2">
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`pincodes[${index}]`}
                                                                    value={pincode}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder={`Enter Pincode ${index + 1}`}
                                                                    isInvalid={touched.pincodes && !!errors.pincodes}
                                                                    className="focus:border-0 shadow-none p-2"
                                                                />
                                                                {errors.pincodes && touched.pincodes && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.pincodes}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Form.Control
                                                            type="text"
                                                            name="pincodes"
                                                            value=""
                                                            placeholder="Enter Pincode"
                                                            onChange={(e) => {
                                                                setFieldValue("pincodes", [e.target.value.trim()]);
                                                            }}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.pincodes && !!errors.pincodes}
                                                            className="focus:border-0 shadow-none p-2"
                                                        />
                                                    )}

                                                    <Button
                                                        variant="link"
                                                        className="mt-2"
                                                        onClick={() => setFieldValue("pincodes", [...values.pincodes, ""])}
                                                    >
                                                        Add Another Pincode
                                                    </Button>

                                                    <Form.Text className="text-muted">
                                                        You can add more pincodes if needed.
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="gender">
                                                    <Form.Label>Gender</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="gender"
                                                        value={values.gender}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter  Gender"
                                                        isInvalid={touched.gender && !!errors.gender}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.gender}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="dateOfBirth">
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={values.dateOfBirth}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.dateOfBirth}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <hr />

                                            <Row>
                                                <Col sm={4}>
                                                    <Form.Group controlId="countryCode">
                                                        <Form.Label>Country Code</Form.Label>
                                                        <Form.Select
                                                            name="countryCode"
                                                            value={values.countryCode}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.countryCode && !!errors.countryCode}
                                                            className="focus:border-0 shadow-none p-2"
                                                        >
                                                            <option value="">Select Country Code</option>
                                                            <option value="IN">IN - India</option>
                                                            <option value="US">US - United States</option>
                                                            <option value="GB">GB - United Kingdom</option>
                                                            <option value="CA">CA - Canada</option>
                                                            <option value="AU">AU - Australia</option>
                                                            <option value="DE">DE - Germany</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.countryCode}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="phoneCode">
                                                        <Form.Label>Phone Code</Form.Label>
                                                        <Form.Select
                                                            name="phoneCode"
                                                            value={values.phoneCode}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.phoneCode && !!errors.phoneCode}
                                                            className="focus:border-0 shadow-none p-2"
                                                        >
                                                            <option value="">Select Phone Code</option>
                                                            <option value="+91">+91 - India</option>
                                                            <option value="+1">+1 - United States</option>
                                                            <option value="+44">+44 - United Kingdom</option>
                                                            <option value="+1">+1 - Canada</option>
                                                            <option value="+61">+61 - Australia</option>
                                                            <option value="+49">+49 - Germany</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.phoneCode}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group controlId="phoneNumber">
                                                        <Form.Label>Phone Number</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="phoneNumber"
                                                            value={values.phoneNumber}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Enter Phone Number"
                                                            isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                                            className="focus:border-0 shadow-none p-2"
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.phoneNumber}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <p>Address</p>
                                            <hr />

                                            <Col sm={6}>
                                                <Form.Group controlId="address">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="currentAddress.address"
                                                        value={values?.currentAddress?.address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Address"
                                                        isInvalid={touched?.currentAddress?.address && !!errors?.currentAddress?.address}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.currentAddress?.address}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="city">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="currentAddress.city"
                                                        value={values?.currentAddress?.city}
                                                        placeholder='Enter city name'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched?.currentAddress?.city && !!errors?.currentAddress?.city}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.currentAddress?.city}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="state">
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="currentAddress.state"
                                                        value={values?.currentAddress?.state}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Banner Name"
                                                        isInvalid={touched?.currentAddress?.state && !!errors?.currentAddress?.state}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.currentAddress?.state}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col sm={6}>
                                                <Form.Group controlId="country">
                                                    <Form.Label>Country</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="currentAddress.country"
                                                        value={values?.currentAddress?.country}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter Country "
                                                        isInvalid={touched?.currentAddress?.country && !!errors?.currentAddress?.country}
                                                        className="focus:border-0 shadow-none p-2"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.currentAddress?.country}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col className="d-flex justify-content-end">
                                                <Button
                                                    onClick={() => navigate('/app/customer/default')}
                                                    variant="danger btn-sm">
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="primary btn-sm" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Update...' : 'Update'}
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

export default UpdateCustomer