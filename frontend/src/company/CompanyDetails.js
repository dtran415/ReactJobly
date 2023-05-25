import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Job from "../job/Job";
import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from "../api";

function CompanyDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState(null);

    const {handle} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getCompany(handle) {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCompany(company);
            } catch (e) {
                const message = e.join("\n");
                alert(message ? message : "Unknown error");
                navigate('/companies');
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
            {jobs.map(job => <div key={job.id} className="m-4"><Job job={job} /></div>)}
        </div>

    );
}

export default CompanyDetails;