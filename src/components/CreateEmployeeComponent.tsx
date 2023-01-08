import CreateEmployeeRequest from "../types/CreateEmployeeRequest";

import { Button, Card, Form } from "react-bootstrap";
import { ReactElement, useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

import "./../styles/create-employee-component.scss"

const CreateEmployeeComponent: React.FC = (): ReactElement => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [validated, setValidated] = useState(false);// Form validation specific state

    const navigate = useNavigate();

    const handleReset = (): void => {
        setFirstName("");
        setLastName("");
        setEmail("");
    };

    const navigateToHome = (): void => navigate("/");

    const handleSubmit = (event: {
        currentTarget: any; preventDefault: () => void;
        stopPropagation: () => void;
    }): void => {
        const form = event.currentTarget;
        let validToSave: boolean = true;
        event.preventDefault();
        
        if (!form.checkValidity()) {
            // Un-comment and remove the same satement above it it is nto required to navigate to home after submission
            // event.preventDefault();
            event.stopPropagation();
            validToSave = false;
        }

        setValidated(true); // Form validation specific. Implies that the form validation is applied

        if (validToSave) {
            const createEmployeeRequest: CreateEmployeeRequest = { firstName, lastName, email };
            // TODO: cover the .catch(...) exception scenario
            createEmployee(createEmployeeRequest).then(response => navigateToHome());
        }
    };

    return (
        <div id="create-employee-card-wrapper">
            <Card>
                <Card.Header as="h4">Create Employee</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={event => setFirstName(event?.target?.value)}
                                placeholder="Enter your first name"
                            />
                            <Form.Control.Feedback>First name looks good !</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please provide employee's first name ! </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={event => setLastName(event?.target?.value)}
                                placeholder="Enter your last name"
                            />
                            <Form.Control.Feedback>Last name looks good !</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please provide employee's last name !</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                onChange={event => setEmail(event?.target?.value)}
                                placeholder="Enter your email address"
                            />
                            <Form.Control.Feedback>Email address looks good !</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please provide a valid email address for the employee !</Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            className="form-button"
                            id="submit-button"
                            variant="primary"
                            size="sm"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            className="form-button"
                            id="cancel-button"
                            variant="warning"
                            size="sm"
                            type="reset"
                            onClick={handleReset}
                        >
                            Clear
                        </Button>
                        <Button
                            className="form-button"
                            id="cancel-button"
                            variant="success"
                            size="sm"
                            type="button"
                            onClick={navigateToHome}
                        >
                            Home
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CreateEmployeeComponent;
