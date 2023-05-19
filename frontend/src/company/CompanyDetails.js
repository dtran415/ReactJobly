import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

function CompanyDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState(null);

    const {handle} = useParams();

    useEffect(() => {
        async function getCompany(handle) {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCompany(company);
            } catch (e) {
                const message = e.join("\n");
                alert(message ? message : "Unknown error");
            }
            setIsLoading(false);
        }
        getCompany(handle);
    }, [handle]);

    if (isLoading)
        return <h1>Loading&hellip;</h1>

    const { name, numEmployees, description, logoUrl, jobs } = company;
    return (
        <div>
            <Card className="m-4">
                <CardBody>
                    {logoUrl ? <img src={logoUrl} alt="logo" /> : ""}
                    <div>Handle: {handle}</div>
                    <div>Name: {name}</div>
                    <div>Number of Employees: {numEmployees}</div>
                    <div>Description: {description}</div>
                </CardBody>
            </Card>

            <h1 className="mx-4">Jobs</h1>
            {jobs.map(job => <Job key={job.id} job={job} />)}
        </div>

    );
}

export default CompanyDetails;