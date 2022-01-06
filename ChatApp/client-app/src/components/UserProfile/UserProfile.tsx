import React from 'react';
import {User} from "../../common/types";

import "./UserProfile.css"
import {Button, Col, Container, Row} from "reactstrap";

interface UserProfileProps {
    user: User
}

const UserProfile: React.FC<UserProfileProps> = ({user, children}) => {
    return (
        <div className={"user-profile"}>
            <div className={"main-content"}>
                <div className={"left-column content"}>
                    <div className={"user-img column-content"}>
                        IMG
                    </div>
                    <div className={"user-action column-content"}>
                        <div className={"button-wrapper"}>
                            <Button block color={"success"} size={"sm"}>
                                Добавить в друзья
                            </Button>
                        </div>
                        <div className={"button-wrapper"}>
                            <Button block color={"primary"} size={"sm"}>
                                Написать
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={"right-column content "}>
                    <div className={"user-info column-content"}>
                        <Container className={"txt-align-left"}>
                            <Row>
                                <Col>Имя пользователя</Col>
                                <Col>{user.userName}</Col>
                            </Row>
                            <Row>
                                <Col>Имя Фамилия</Col>
                                <Col>{user.firstName} {user.lastName}</Col>
                            </Row>
                            <Row>
                                <Col>Колличество друзей</Col>
                                {user.friends != null && user.friends.length > 0 ?
                                    <Col>{user.friends.length}</Col>
                                    : <Col>Список друзей пуст</Col>}
                            </Row>

                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
