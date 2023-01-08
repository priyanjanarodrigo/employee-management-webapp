import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ReactElement } from 'react';

import './App.scss';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';


const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Container fluid="lg">

        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          <Route path="/add-employee" element={<CreateEmployeeComponent />}></Route>
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />}></Route>
          <Route path="/view-employee/:id" element={<ViewEmployeeComponent />}></Route>
        </Routes>

      </Container>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;

// Video to be continued : 2:26;47
