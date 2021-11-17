import React from 'react';
import {Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';

const SignInForm : React.FC = () => {
    return (
        <div>
            <Form>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Email
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="with a placeholder"
                                type="email"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="password placeholder"
                                type="password"
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default SignInForm;
