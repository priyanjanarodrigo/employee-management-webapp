import Employee from "../types/Employee";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { ReactElement, useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../services/EmployeeService";
import { useNavigate } from 'react-router-dom';

import './../styles/list-employee-component.scss'

const ListEmployeeComponent: React.FC = (): ReactElement => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const navigate = useNavigate();

    const handleAddEmployee = () => navigate("/add-employee");

    const proceedToUpdateEmployee = (id: number): void => {
        navigate(`/update-employee/${id}`);
    }

    const proceedToViewEmplopyee = (id: number): void => {
        navigate(`/view-employee/${id}`);
    }

    const deleteEmployeeById = (id: number): void => {
        deleteEmployee(id).then(response => {
            if (response?.status === 204) {
                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }

    // TODO: cover the .catch(...) exception scenario
    useEffect(() => { getAllEmployees().then(resposne => setEmployees(resposne?.data)) }, []);

    return (
        <div>
            <h1 className="text-center">Employee List</h1>

            <Button id="add-employee-button" variant="primary" size="sm" onClick={handleAddEmployee}>Add Employee</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee?.id}>
                            <td>{employee?.firstName}</td>
                            <td>{employee?.lastName}</td>
                            <td>{employee?.email}</td>
                            <td>
                                <Button className="action-button" variant="info" size="sm" onClick={() => proceedToUpdateEmployee(employee?.id)}>Update</Button>
                                <Button className="action-button" variant="danger" size="sm" onClick={() => deleteEmployeeById(employee?.id)}>Delete</Button>
                                <Button className="action-button" variant="success" size="sm" onClick={() => proceedToViewEmplopyee(employee?.id)}>View Details</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default ListEmployeeComponent

/*
    const getAllEmployees = async () => {
        await axios.get(EMPLOYEE_SERVICE_BASE_URL, { headers: { Accept: 'application/json' } })
            .then(response => {
                const allEmployees: Employee[] = response?.data;
                setEmployees(allEmployees)
            }).catch(error => {
                console.error((axios.isAxiosError(error) ? `Axios` : `Unexpected`)
                    , ` error occurred while executing getAllEmployees. Error: ${JSON.stringify(error)}`);
            })
    };
*/