import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../services/EmployeeService";
import { Alert, Button, Card, Row } from "react-bootstrap";
import './../styles/view-employee-component.scss';

const ViewEmployeeComponent: React.FC = (): ReactElement => {
    const navigate = useNavigate();
    const params = useParams();

    const [id, setId] = useState(-1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmployeeDataFound, setIsEmployeeDataFound] = useState(false);

    const navigateToHome = (): void => {
        navigate("/");
    }

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

    if (isEmployeeDataFound) {
        return (
            <Card className="view-employee-wrapper col-md-6">
                <h3 className="text-center">View Employee</h3>
                <Card.Body>
                    <Row>
                        <label>Employee ID :</label>
                        <div>
                            <p><b>{id}</b></p>
                        </div>
                    </Row>
                    <Row>
                        <label>First Name :</label>
                        <div>
                            <p><b>{firstName}</b></p>
                        </div>
                    </Row>
                    <Row>
                        <label>Last Name :</label>
                        <div>
                            <p><b>{lastName}</b></p>
                        </div>
                    </Row>
                    <Row>
                        <label>Email Address :</label>
                        <div>
                            <p><b>{email}</b></p>
                        </div>
                    </Row>
                    <Button
                        className="form-button"
                        id="cancel-button"
                        variant="success"
                        size="sm"
                        type="button"
                        onClick={navigateToHome}
                    >
                        Back to Home
                    </Button>
                </Card.Body>
            </Card>
        )
    } else {
        return (
            <div className="view-employee-wrapper">
                <Alert hidden={isEmployeeDataFound} variant="danger">
                    <p>Sorry, employee details were not found for the employee id : {params?.id} !</p>
                    <Alert.Link onClick={navigateToHome}>Navigate back to home page</Alert.Link>
                </Alert>
            </div>
        )
    }
};

export default ViewEmployeeComponent;