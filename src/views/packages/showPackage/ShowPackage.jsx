
import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackageById } from 'redux/action/packageActions';
import img1 from "../../../../public/assets/defaultuser.png";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const ShowPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const packageDetails = useSelector(state => state.packageReducer.packageDetails);
  console.log(packageDetails, "this is the image of car");


  useEffect(() => {
    if (id) {
      dispatch(getPackageById({ id }));
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
                  onClick={() => navigate('/app/package/default')}
                />
                Package Details
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='d-flex gap-4'>
                {/* <img
                                    src={carDetails?.brandLogo ? `${base_url}${carDetails?.brandLogo}` : img1}
                                    alt="img"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: "100%",
                                        border: "2px solid gray"
                                    }}
                                /> */}
                {packageDetails?.length > 0 ? (
                  <div className="d-flex flex-column">
                    <h3><b>Package Name :-</b> {packageDetails[0]?.packageName ?? "N/A"}</h3>
                    <h4><b>Price :- </b> {packageDetails[0]?.price ?? "N/A"}</h4>
                    <h4><b>Radius :- </b> {packageDetails[0]?.radius ? `${packageDetails[0].radius} Km` : "N/A"}</h4>
                  </div>
                ) : (
                  <p>No package details available</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default ShowPackage