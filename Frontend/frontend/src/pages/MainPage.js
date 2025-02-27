import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import dateFormat from "dateformat";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Spinner from "react-bootstrap/Spinner";

export function Searchbar() {
  const [popAppear, setPopAppear] = React.useState(false);
  const [inputDate, setInputDate] = React.useState(new Date());
  const [data, setData] = React.useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    APIAPOD(inputDate, setData);
    setPopAppear(true);
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Container>
          <h1>Choose a Date to Get the Astronomy Picture of the Day</h1>
          <br />
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Select a Date"
                >
                  <Form.Control
                    type="date"
                    size="lg"
                    name="D"
                    value={inputDate}
                    onChange={(event) => {
                      setInputDate(event.target.value);
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col className="d-flex align-items-center" md="auto">
                <Button type="submit" variant="primary" size="lg">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <PopUp show={popAppear} onHide={() => setPopAppear(false)} data={data} />
    </>
  );
}
export async function APIAPOD(input, setData) {
  let date = (new Date()<new Date(input))?new Date():new Date(input)
  let dateString = dateFormat(date, "yyyy-mm-dd");
  let url = `https://bouncecodechallenge2025.onrender.com/APOD/${dateString}`;
  let result = axios.get(url).then(function (response) {
    setData(response.data);
    return response.data;
  });
  return result;
}
export function PopUp(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.data != null ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Astronomy Picture of {props.data.date}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{props.data.title}</h4>

            <Image src={props.data.url} fluid />
            <br />
            <br />
   
            <p>{props.data.explanation}</p>

            <p>
              <b>Copyright:</b>  {props.data.copyright}
            </p>
          </Modal.Body>

          <Modal.Footer>
            <br></br>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
export function APOD() {
  return (
    <>
      <Searchbar />
    </>
  );
}
