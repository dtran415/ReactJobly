import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import UserContext from "../user/UserContext";
import JoblyApi from "../api";

function Job({ job }) {
    const { id, title, salary, equity, companyName } = job;
    const {user, setUser} = useContext(UserContext);
    const [isAppliedTo, setAppliedTo] = useState(user.applications.includes(id));

    async function onClickApply(e) {
        e.preventDefault();
        try{
            const applied = await JoblyApi.applyToJob(user.username, id);
            if (applied) {
                user.applications.push(id);
                setUser(user);
                setAppliedTo(true);
            }
        } catch(e) {
            console.log(e);
            alert("Error applying to job");
        }
    }

    return (
        <Card>
            <CardBody>
                <div>ID: {id}</div>
                {companyName?<div>Company: {companyName}</div>:""}
                <div>Title: {title}</div>
                <div>Salary: {salary}</div>
                {equity?<div>Equity: {equity}</div>:""}
                {isAppliedTo?<Button className="mt-2">Applied</Button>:<Button className="mt-2" color="primary" onClick={onClickApply}>Apply</Button>}
            </CardBody>
        </Card>
    )

}

export default Job;