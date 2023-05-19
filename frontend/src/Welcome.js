import React, { useContext } from "react";
import UserContext from "./user/UserContext";
import { Container } from "reactstrap";

function Welcome() {
    const user = useContext(UserContext);
    return (
        <Container className="mt-5">
            <h1>Welcome {user?user.firstName:"to Jobly"}</h1>
        </Container>
    )
}

export default Welcome;