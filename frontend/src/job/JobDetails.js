import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import Company from "../company/Company";
import Job from "./Job";

function JobDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [job, setJob] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        async function getJob(id) {
            try {
                const job = await JoblyApi.getJob(id);
                setJob(job);
            } catch (e) {
                const message = e.join("\n");
                alert(message ? message : "Unknown error");
            }
            setIsLoading(false);
        }
        getJob(id);
    }, [id]);

    if (isLoading)
        return <h1>Loading&hellip;</h1>

    return (
        <Container>
            <Company company={job.company} />

            <h1>Job Details</h1>
            <Job job={job} />
        </Container>

    );
}

export default JobDetails;