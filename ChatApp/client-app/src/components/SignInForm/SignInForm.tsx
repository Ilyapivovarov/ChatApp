import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Row} from 'reactstrap';
import {SignIn} from "../../types/dataTypes";
import {useAuthActions} from "../../hooks/useAuthActions";

const SignInForm: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {signInUser} = useAuthActions()
    
    const onSubmit = (signIn : SignIn) => {
        signInUser(signIn)
    }
    
    return (
        <div>
            <Form onSubmit={() => onSubmit({userName, password})}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Username"
                                type="text"
                                value={userName}
                                required={true}
                                onChange={(e) => {
                                    e.persist();
                                    setUserName(e.target.value)
                                }}
                                formNoValidate={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                required={true}
                                onChange={(e) => {
                                    e.persist();
                                    setPassword(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button>
                    Sign in
                </Button>
            </Form>
        </div>
    );
};

export default SignInForm;
