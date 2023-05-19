import React, { useEffect, useState } from "react";
import Company from "./Company";
import JoblyApi from "../api";
import { Container } from "reactstrap";

function CompanyList() {
    const [isLoading, setIsLoading] = useState(false);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        if (!companies)
            setIsLoading(true);
        async function getCompanies() {
            const companies = await JoblyApi.getCompanies();
            setCompanies(companies);
            setIsLoading(false);
        }
        getCompanies();
    }, []);

    if (isLoading)
        return <h1>Loading&hellip;</h1>
    return (
        <Container>
            <h1>Companies</h1>
            {companies.map(company => <Company key={company.handle} company={company} />)}
        </Container>
    )
}

export default CompanyList;