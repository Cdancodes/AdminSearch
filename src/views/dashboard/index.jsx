import React, { useEffect, useState } from 'react';
import { Country, State, City } from "country-state-city";
import { Row, Col, Card, Table, Tabs, Tab, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { range } from '../../config/constant';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import Select from "react-select";

const dashSalesData = [
  { title: 'Daily Sales', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' },
  { title: 'Monthly Sales', amount: '$2.942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
  { title: 'Yearly Sales', amount: '$8.638.32', icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
];

const DashDefault = () => {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    setCountries(Country.getAllCountries().map((c) => ({ label: c.name, value: c.isoCode })));
  }, []);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setStates(State.getStatesOfCountry(selectedOption?.value).map((s) => ({ label: s.name, value: s.isoCode })));
    setSelectedState(null); 
    setCities([]); 
    setSelectedCity(null);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setCities(City.getCitiesOfState(selectedCountry?.value, selectedOption.value).map((c) => ({ label: c.name, value: c.name })));
    setSelectedCity(null); 
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const tabContent = (
    <React.Fragment>
      <div className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
        <div className="m-r-10 photo-table flex-shrink-0">
          <Link to="#">
            <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
          </Link>
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className="m-0 d-inline">Silje Larsen</h6>
          <span className="float-end d-flex  align-items-center">
            <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
            3784
          </span>
        </div>
      </div>
      <div className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
        <div className="m-r-10 photo-table flex-shrink-0">
          <Link to="#">
            <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
          </Link>
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className="m-0 d-inline">Julie Vad</h6>
          <span className="float-end d-flex  align-items-center">
            <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
            3544
          </span>
        </div>
      </div>
      <div className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
        <div className="m-r-10 photo-table flex-shrink-0">
          <Link to="#">
            <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
          </Link>
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className="m-0 d-inline">Storm Hanse</h6>
          <span className="float-end d-flex  align-items-center">
            <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
            2739
          </span>
        </div>
      </div>
      <div className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
        <div className="m-r-10 photo-table flex-shrink-0">
          <Link to="#">
            <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
          </Link>
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className="m-0 d-inline">Frida Thomse</h6>
          <span className="float-end d-flex  align-items-center">
            <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
            1032
          </span>
        </div>
      </div>
      <div className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
        <div className="m-r-10 photo-table flex-shrink-0">
          <Link to="#">
            <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
          </Link>
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className="m-0 d-inline">Silje Larsen</h6>
          <span className="float-end d-flex  align-items-center">
            <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
            8750
          </span>
        </div>
      </div>
      <div className="d-flex friendlist-box align-items-center justify-content-center">
        <div className="m-r-10 photo-table flex-shrink-0">
          <Link to="#">
            <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
          </Link>
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className="m-0 d-inline">Storm Hanse</h6>
          <span className="float-end d-flex  align-items-center">
            <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
            8750
          </span>
        </div>
      </div>
    </React.Fragment>
  );




  return (
    <React.Fragment>
      <Row>

        <Col xl={12} xxl={4}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Total Earning </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className='d-flex justify-content-between'>
                <Col sm={3}>
                  <h3>Rs. 3432300</h3>
                </Col>

                <Col sm={3}>
                  <Form.Group controlId="date">
                    <Form.Label>Date range</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      className="focus:border-0 shadow-none p-2 btn-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.dateOfBirth} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className='my-2'>
                <Col sm={3}>
                  <Form.Group controlId="status bg-white">
                    <Form.Label>Country</Form.Label>
                    <Select
                      options={countries}
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="basic-single"
                      classNamePrefix="select"
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group controlId="status bg-white">
                    <Form.Label>State</Form.Label>
                    <Select
                      options={states}
                      value={selectedState}
                      onChange={handleStateChange}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={!selectedCountry}
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group controlId="status bg-white">
                    <Form.Label>City</Form.Label>
                    <Select
                      options={cities}
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={!selectedState} 
                    />
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group controlId="status bg-white">
                    <Form.Label>Time Range</Form.Label>
                    <Select
                      options={range?.map((item) => ({ label: item.name, value: item.code }))}
                      className="basic-single"
                      classNamePrefix="select"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={8}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Recent Users</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Isabella Christensen</h6>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        11 MAY 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Mathilde Andersen</h6>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        11 MAY 10:35
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Karla Sorensen</h6>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Ida Jorgensen</h6>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted f-w-300">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        19 MAY 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Albert Andersen</h6>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        21 July 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Upcoming Event</h5>
                </div>
                <div className="col-auto">
                  <label className="label theme-bg2 text-white f-14 f-w-400 float-end">34%</label>
                </div>
              </div>
              <h2 className="mt-2 f-w-300">
                45<sub className="text-muted f-14">Competitors</sub>
              </h2>
              <h6 className="text-muted mt-3 mb-0">You can participate in event </h6>
              <i className="fab fa-angellist text-c-purple f-50" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-zap f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">235</h3>
                  <span className="d-block text-uppercase">total ideas</span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">26</h3>
                  <span className="d-block text-uppercase">total locations</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-facebook-f text-primary f-36" />
                </div>
                <div className="col text-end">
                  <h3>12,281</h3>
                  <h5 className="text-c-green mb-0">
                    +7.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>35,098
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '60%', height: '6px' }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>350
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: '45%', height: '6px' }}
                      aria-valuenow="45"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-twitter text-c-blue f-36" />
                </div>
                <div className="col text-end">
                  <h3>11,200</h3>
                  <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>34,185
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-green"
                      role="progressbar"
                      style={{ width: '40%', height: '6px' }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>800
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-blue"
                      role="progressbar"
                      style={{ width: '70%', height: '6px' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-google-plus-g text-c-red f-36" />
                </div>
                <div className="col text-end">
                  <h3>10,500</h3>
                  <h5 className="text-c-blue mb-0">
                    +5.9% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>25,998
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '80%', height: '6px' }}
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>900
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: '50%', height: '6px' }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Rating</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h2 className="f-w-300 d-flex align-items-center float-start m-0">
                    4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h2>
                </div>
                <div className="col-6">
                  <h6 className="d-flex  align-items-center float-end m-0">
                    0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h6>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-end">384</h6>
                  <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '70%' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                  </h6>
                  <h6 className="align-items-center float-end">145</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '35%' }}
                      aria-valuenow="35"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                  </h6>
                  <h6 className="align-items-center float-end">24</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '25%' }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                  </h6>
                  <h6 className="align-items-center float-end">1</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '10%' }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                  </h6>
                  <h6 className="align-items-center float-end">0</h6>
                  <div className="progress m-t-30  m-b-5" style={{ height: '6px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '0%' }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={8} className="user-activity">
          <Card>
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Today">
                {tabContent}
              </Tab>
              <Tab eventKey="week" title="This Week">
                {tabContent}
              </Tab>
              <Tab eventKey="all" title="All">
                {tabContent}
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
