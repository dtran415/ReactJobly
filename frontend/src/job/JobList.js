import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import Job from "./Job";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

function JobList() {
    const [isLoading, setIsLoading] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (!jobs)
            setIsLoading(true);
        async function getJobs() {
            const jobs = await JoblyApi.getJobs();
            setJobs(jobs);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    if (isLoading)
        return <h1>Loading&hellip;</h1>
    return (
        <Container>
            <h1>Jobs</h1>
            {jobs.map(job =>
                <div key={job.id} className="my-4">
                    <Link to={`/jobs/${job.id}`} className="text-decoration-none text-dark">
                        <Job job={job} />
                    </Link>
                </div>
            )}
        </Container>
    )
}

export default JobList;