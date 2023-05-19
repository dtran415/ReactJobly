import React, {useState}  from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

function SignUpForm({signup}) {
    const navigate = useNavigate();
    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
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
        try{
            const result = await signup({ ...formData });
            setFormData(initialState);
            if (result) {
                navigate('/');
            } else {
                alert("Error signing up");
            }
        } catch(e) {
            console.log(e);
            const message = e.join("\n");
            alert(message?message:"Unknown error");
        }
        setLoading(false);
        
    }

    if (isLoading) {
        return <h1>Signing Up&hellip;</h1>;
    }

    return (
        <Container className="SignUpForm mt-5">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        id="username"
                        onChange={handleChange}
                        name="username"
                        placeholder="Username"
                        value={formData.username} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        name="password"
                        placeholder="Password"
                        value={formData.password} />
                </FormGroup>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input 
                        id="firstName"
                        onChange={handleChange}
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        onChange={handleChange}
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        onChange={handleChange}
                        name="email"
                        placeholder="Email"
                        value={formData.email} />
                </FormGroup>
                <Button color="primary">Sign Up</Button>
            </Form>
        </Container>
    )
}

export default SignUpForm;