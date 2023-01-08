import CreateEmployeeRequest from "../types/CreateEmployeeRequest";

import { Alert, Button, Card, Form } from "react-bootstrap";
import { ReactElement, useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployeeComponent: React.FC = (): ReactElement => {
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [validated, setValidated] = useState(false);// Form validation specific state
    const [isEmployeeDataFound, setIsEmployeeDataFound] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleReset = (): void => {
        setFirstName("");
        setLastName("");
        setEmail("");
    };

    useEffect(() => {
        getEmployeeById(Number(params?.id)).then(response => {
            const { data } = response;
            if (data) {
                setId(data?.id);
                setFirstName(data?.firstName);
                setLastName(data?.lastName);
                setEmail(data?.email);
                setIsEmployeeDataFound(true)

            } else {
                setIsEmployeeDataFound(false)
            }
        })
    }, [params?.id]);

    const navigateToHome = (): void => navigate("/");

    const handleSubmit = (event: {
        currentTarget: any; preventDefault: () => void;
        stopPropagation: () => void;
    }): void => {
        const form = event.currentTarget;
        let validToUpdate: boolean = true;
        event.preventDefault();

        if (!form.checkValidity()) {
            // Un-comment and remove the same satement above it it is nto required to navigate to home after submission
            // event.preventDefault();
            event.stopPropagation();
            validToUpdate = false;
        }

        setValidated(true); // Form validation specific. Implies that the form validation is applied

        if (validToUpdate) {
            const updateEmployeeRequest: CreateEmployeeRequest = { firstName, lastName, email };
            // TODO: cover the .catch(...) exception scenario
            updateEmployee(id, updateEmployeeRequest).then(response => navigateToHome());
        }
    };

    return (
        <div id="create-employee-card-wrapper">
            <Alert hidden={isEmployeeDataFound} variant="danger">Sorry, employee details were not found for the employee id : {params?.id} ! </Alert>
            <Card hidden={!isEmployeeDataFound}>
                <Card.Header as="h4">Update Employee</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={id}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={event => setFirstName(event?.target?.value)}
                                placeholder="Enter your first name"
                                value={firstName}
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
                                value={lastName}
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
                                value={email}
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
};

export default UpdateEmployeeComponent;
