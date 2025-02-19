import React, { useState } from 'react';
import { Row, Col, Alert, Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from "../../../redux/action/loginActions";
import { MdMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const JWTLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  // const [showModal, setShowModal] = useState(true);

  const isLoading = useSelector(state => state.settings.isLoading);

  const onNavigate = () => {
    navigate('/app/dashboard/default');
  }

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(loginActions.loginRequest({
      values, onNavigate, setSubmitting
    }));
  };

  return (
    <div>

      <Modal show={isLoading} centered dialogClassName="custom-modal">
        <Modal.Body className="p-4 text-center">
          Login successful! Redirecting...
          <div className="spinner-border spinner-border-sm ms-3" role="status"></div>
        </Modal.Body>
      </Modal>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <MdMailOutline />
                </span>
                <input
                  className="form-control"
                  name="email"
                  placeholder="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                />
              </div>
              {touched.email && errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            <div className="form-group mb-4 position-relative">
              <div className="input-group">
                <span className="input-group-text">
                  <RiLockPasswordFill />
                </span>
                <input
                  className="form-control"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {touched.password && errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
              <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Log as admin
              </label>
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert>{errors.submit}</Alert>
              </Col>
            )}

            <Row>
              <Col mt={2}>
                <Button
                  className="btn-block mb-4 btn-sm"
                  color="primary"
                  disabled={isSubmitting} size="large" type="submit" variant="primary">
                  Login
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default JWTLogin;
