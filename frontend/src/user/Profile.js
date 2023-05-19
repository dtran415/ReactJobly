import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

function Profile({user, updateUser}) {
    const {username, password, firstName, lastName, email} = user;

    const initialState = {username, password, firstName, lastName, email}
    const [formData, setFormData] = useState(initialState)
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = async evt => {
        evt.preventDefault();
        try{
            const result = await updateUser({ ...formData });
            if (result) {
                // clear password field
                setFormData({...formData, password:""})
                alert("User updated");
            } else {
                alert("Error updating user");
            }
        } catch(e) {
            console.log(e);
            const message = Array.isArray(e)?e.join("\n"):null;
            alert(message?message:"Unknown error");
        }        
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
                        value={formData.username}
                        readOnly />
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
                <Button color="primary">Update</Button>
            </Form>
        </Container>
    )
}

export default Profile;