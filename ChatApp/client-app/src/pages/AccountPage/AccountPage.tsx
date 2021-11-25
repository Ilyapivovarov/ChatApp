import React, {useEffect, useState} from 'react';
import {fetchAccount} from "../../servies/accountService";
import {useCustomSelector} from "../../hooks/useCustomSelector";
import {Account} from "../../types/dataTypes";

const ProfilePage = () => {
    const {currentUser} = useCustomSelector(x => x.auth);
    const [account, setAccount] = useState<Account | null>();
    
    useEffect(() => {
        if (currentUser != null) {
            fetchAccount(currentUser.id)
                .then(r => {
                    if (r.isSuccess)
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
