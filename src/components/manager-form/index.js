
import {
    Link
  } from "react-router-dom";
  import {
    Container,
    Button,
    Form,
    Row,
    Col
  } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import * as apiService from '../../services/apiService';
  import { Redirect } from 'react-router';

  const React = require('react');
  const { useEffect, useState} = require('react');

  const ManagerFormComponent = (props) => {
    var managerId = props.location.search.split("=");
    managerId = managerId.length > 1 ? managerId[1] : '';
    const [managerData, setManagerData] = useState(null);
    const [showErrorInput, setShowErrorInput] = useState(false);
    const [managetInput, setManagetInput] = useState('');
    const titleForm = managerId ? "Editar Prenda" : "Agregar Prenda";
    const handerClick = () => {
      if(showErrorInput) {
        return;
      }

      apiService.createNewManager(managetInput, managerId).then(() => {
        window.location.href = "/manager"
      }).catch((error) => {
        console.log("error");
      })
    }

    const handleValueChange = (event) => {
        setShowErrorInput(false);
        if(event.target.value) {
            setManagetInput(event.target.value);
        } else {
            if(managetInput) {
                setManagetInput(event.target.value);
            }
            setShowErrorInput(true)
        }
     
    }

    useEffect(() => {
      apiService.getManagerList(managerId).then((data) => {
        if(data.manager && managerId) {
          console.log(data)
          setManagerData(data.manager);
          setManagetInput(data.manager.email)
        }
      })
    }, [])

    return (
      <Container>
        <Row className="mt-4">
          <Col className="mb-4" sm={12} md={12} lg={12}>
            <Link to="/">
              <Button variant="primary" type="button">
                  Volver
              </Button>
            </Link>
          </Col>
          <Col className="mb-4" sm={12} md={12} lg={12}>
            <h1>{titleForm}</h1>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <Form>
              <Col sm={12} md={12} lg={12}>
                <Form.Group>
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control  type="input" name="managerEmail" required  onChange={handleValueChange} value={managetInput} />
                  {
                    showErrorInput && (
                    <Form.Text className="text-danger">
                      El campo no puede estar vacio
                    </Form.Text>
                    )
                  }
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control as="select" type="select" name="managerEmail" required  onChange={handleValueChange} value={managetInput} />

                  <Form.Label>Precio Base</Form.Label>
                  <Form.Control  type="text" name="managerEmail" required  onChange={handleValueChange} value={managetInput} />

                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
              <Button variant="primary" type="button" onClick={handerClick}>
                  Guardar
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
  export default ManagerFormComponent
  