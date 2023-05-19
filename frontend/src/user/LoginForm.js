import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, FormGroup, Form, Input } from "reactstrap";

function LoginForm({login}) {
    const navigate = useNavigate();
    const initialState = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState)
    const [isLoading, setLoading] = useState(false);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = async evt => {
        evt.preventDefault();
        setLoading(true);
        try {
            const result = await login({ ...formData });
            setFormData(initialState);
            if (result) {
                navigate('/');
            } else {
                alert("Error signing up");
            }
        } catch(e) {
            console.log(e);
            const message = Array.isArray(e)?e.join("\n"):null;
            alert(message?message:"Unknown error");
        }
        setLoading(false);
    }

    if (isLoading) {
        return <h1>Loading&hellip;</h1>;
    }

    return (
        <Container className="LoginForm text-center mt-5">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        id="username"
                        onChange={handleChange}
                        name="username"
                        placeholder="Username"
                        value={formData.username} />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        name="password"
                        placeholder="Password"
                        value={formData.password} />
                </FormGroup>
                <Button color="primary">Login</Button>
            </Form>
        </Container>
    )
}

export default LoginForm;