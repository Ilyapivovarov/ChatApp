import React, {useEffect, useState} from 'react';
import {fetchAccount} from "../../servies/accountService";
import {Account} from "../../types/dataTypes";
import {useAppSelector} from "../../hooks/redux";

const ProfilePage = () => {
    const {currentUser} = useAppSelector(x => x.authReducer);
    const [account, setAccount] = useState<Account | null>();
    
    useEffect(() => {
        if (currentUser != null) {
            fetchAccount(currentUser.id)
                .then(r => {
                    if (r.hasValue)
                        setAccount(r.value);
                })
        }
    }, []);

    return (
        <div>
            <h1>Hi {account?.userName}</h1>
        </div>
    );
};

export default ProfilePage;
