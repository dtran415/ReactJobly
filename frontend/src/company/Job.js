import React from "react";
import { Card, CardBody } from "reactstrap";

function Job({ job }) {
    const { id, title, salary, equity } = job;

    return (
        <Card className="m-4">
            <CardBody>
                <div>ID: {id}</div>
                <div>Title: {title}</div>
                <div>Salary: {salary}</div>
                <div>Equity: {equity}</div>
            </CardBody>
        </Card>
    )

}

export default Job;