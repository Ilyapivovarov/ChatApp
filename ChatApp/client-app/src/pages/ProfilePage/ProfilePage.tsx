import React from 'react';
import {fetchAccount} from "../../servies/accountService";

const ProfilePage = () => {

    console.log(fetchAccount(1, ))
    return (
        <div>
            <h1>Hi</h1>
        </div>
    );
};

export default ProfilePage;
