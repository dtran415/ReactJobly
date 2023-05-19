import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

/**
 * 
 * @param {Object} company {handle, name, numEmployees, description, logoUrl} 
 * @returns 
 */
function Company({ company }) {
    const { handle, name, numEmployees, description, logoUrl } = company;

    return (
        <Link to={`/companies/${handle}`} className="text-decoration-none text-dark">
            <Card className="my-4">
                <CardBody>
                    {logoUrl ? <img src={logoUrl} alt="logo" className="my-2"/> : ""}
                    <div>Handle: {handle}</div>
                    <div>Name: {name}</div>
                    <div>Number of Employees: {numEmployees}</div>
                    <div>Description: {description}</div>
                </CardBody>
            </Card>
        </Link>
    );
}

export default Company;