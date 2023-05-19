import React from "react";
import { Card, CardBody } from "reactstrap";

function Job({ job }) {
    const { id, title, salary, equity, companyName } = job;

    return (
        <Card>
            <CardBody>
                <div>ID: {id}</div>
                {companyName?<div>Company: {companyName}</div>:""}
                <div>Title: {title}</div>
                <div>Salary: {salary}</div>
                {equity?<div>Equity: {equity}</div>:""}
            </CardBody>
        </Card>
    )

}

export default Job;