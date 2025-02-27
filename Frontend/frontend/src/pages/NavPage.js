import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { APOD, Searchbar } from './MainPage';
import {EPIC} from './EPIC'
import {Outlet,BrowserRouter,Route, Routes,} from "react-router-dom";

export function NavBar() {
    return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
          <Container>
            <Navbar.Brand href="/">Bounce Coding Challenge 2025</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/APOD">APOD</Nav.Link>
                <Nav.Link href="/EPIC">Earth</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </>
    );
  }
export function Router(){
    return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavBar />}>
                <Route index element={<APOD />} />
                <Route path="APOD" element={<Searchbar />} />
                <Route path="EPIC" element={<EPIC />}  />
                <Route path="*" element={<APOD/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      );
}

export default NavBar;