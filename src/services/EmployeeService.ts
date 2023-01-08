import axios, { AxiosResponse } from "axios";

import CreateEmployeeRequest from "../types/CreateEmployeeRequest";
import { EMPLOYEE_SERVICE_BASE_URL } from "../utils/Constants";

export const getAllEmployees = async (): Promise<AxiosResponse> => {
    return await axios.get(EMPLOYEE_SERVICE_BASE_URL, { headers: { Accept: 'application/json' } })
        .then(response => response)
        .catch(error => {
            let errorMessage: string = (axios.isAxiosError(error))
                ? `Axios error occurred while executing getAllEmployees. Error: ${JSON.stringify(error)}`
                : `Unexpected error occurred while executing getAllEmployees. Error: ${JSON.stringify(error)}`;
            throw new Error(errorMessage);
        });
};

export const getEmployeeById = async (id: number): Promise<AxiosResponse> => {
    return await axios.get(`${EMPLOYEE_SERVICE_BASE_URL}/${id}`, { headers: { Accept: 'application/json' } })
        .then(response => response)
        .catch(error => {
            let errorMessage: string = (axios.isAxiosError(error))
                ? `Axios error occurred while executing getEmployeeById. Error: ${JSON.stringify(error)}`
                : `Unexpected error occurred while executing getEmployeeById. Error: ${JSON.stringify(error)}`;
            throw new Error(errorMessage);
        });
};

export const createEmployee = async (createEmployeeReuqest: CreateEmployeeRequest): Promise<AxiosResponse> => {
    return await axios.post(EMPLOYEE_SERVICE_BASE_URL, createEmployeeReuqest)
        .then(response => response)
        .catch(error => {
            let errorMessage: string = (axios.isAxiosError(error))
                ? `Axios error occurred while executing createEmployee. Error: ${JSON.stringify(error)}`
                : `Unexpected error occurred while executing createEmployee. Error: ${JSON.stringify(error)}`;
            throw new Error(errorMessage);
        });
};

export const updateEmployee = async (id: number, updateEmployeeReuqest: CreateEmployeeRequest): Promise<AxiosResponse> => {
    return await axios.put(`${EMPLOYEE_SERVICE_BASE_URL}/${id}`, updateEmployeeReuqest)
        .then(response => response)
        .catch(error => {
            let errorMessage: string = (axios.isAxiosError(error))
                ? `Axios error occurred while executing updateEmployee. Error: ${JSON.stringify(error)}`
                : `Unexpected error occurred while executing updateEmployee. Error: ${JSON.stringify(error)}`;
            throw new Error(errorMessage);
        });
};

export const deleteEmployee = async (id: number): Promise<AxiosResponse> => {
    return await axios.delete(`${EMPLOYEE_SERVICE_BASE_URL}/${id}`)
        .then(response => response)
        .catch(error => {
            let errorMessage: string = (axios.isAxiosError(error))
                ? `Axios error occurred while executing deleteEmployee. Error: ${JSON.stringify(error)}`
                : `Unexpected error occurred while executing deleteEmployee. Error: ${JSON.stringify(error)}`;
            throw new Error(errorMessage);
        });
}
