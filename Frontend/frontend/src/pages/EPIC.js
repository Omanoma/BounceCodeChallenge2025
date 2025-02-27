import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React from "react";
import Carousel from "react-bootstrap/Carousel";
export function EPIC() {
  return (
    <div>
      <Searchbar />
    </div>
  );
}
export function Searchbar() {
  const [inputDate, setInputDate] = React.useState(new Date());
  const [data, setData] = React.useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <br />
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col md>
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
        </Container>
      </Form>
    </>
  );
}

export function slideShow(image, data) {
  return (
    <Carousel>
      {image.map((key, i) => {
        return (
          <Carousel.Item>
            <img
            className="d-block w-100"
            src={key}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
