import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import dateFormat from "dateformat";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
export function EPIC() {
  return (
    <div>
      <Searchbar />
    </div>
  );
}
export function Searchbar() {
  const [inputDate, setInputDate] = React.useState(new Date());
  const[dateSet,setDateSet] = React.useState(new Date());
  const [data, setData] = React.useState(null);
  const [pressButton, setButton] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDateSet(inputDate);
    await EPICAPI(inputDate, setData);
    setButton(true);
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
      <Container>
    <br/>
      {(pressButton)?<SlideShow data={data} date={dateSet}/>:<></>}
      </Container>
      
    </>
  );
}
export function EPICAPI(input, setData) {
  let date = new Date() < new Date(input) ? new Date() : new Date(input);
  let dateString = dateFormat(date, "yyyy-mm-dd");
  let url = `https://bouncecodechallenge2025.onrender.com/EPIC/${dateString}`;
  let result = axios.get(url).then(function (response) {
    setData(response.data);
    console.log(response.data)
    return response.data;
  });
  return result;
}

export function SlideShow(props) {
    
  return (<>
  <h1>Earth Polychromatic Imaging Camera of {props.date}</h1>
    <Carousel {...props} slide={false}>
      {(props.data != null)? (
        props.data.images.map((key, i) => {
          return (
            <Carousel.Item>
              <Image className="d-block w-100" src={`${key}`} fluid/>
              <Carousel.Caption>
                <h3>{props.data.inform[i].date}  </h3>
                <p>
                    <li>
                    <b>latitude</b>:{props.data.inform[i].centroid_coordinates.lat}
                    </li>
                    <li>
                    <b>longution</b>{props.data.inform[i].centroid_coordinates.lon}
                    </li>
                </p>
                <p>
                    {props.data.inform[i].caption}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })
      ) : (
        
          <Carousel.Item>
            <Container>
            <Image
                fluid
              src="https://fossbytes.com/wp-content/uploads/2017/09/Windows-Black-Screen-640x360.png"
              className="d-block w-100"
              alt="..."
            />
            <Carousel.Caption>
            <Spinner animation="border" role="status"variant="light">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
              <h1>Loading </h1>
            </Carousel.Caption>
            </Container>
          </Carousel.Item>
        
      )}
    </Carousel>
    </>
  );
}
