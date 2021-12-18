import React from 'react';
import {useFetchAccountQuery} from "../../servies/accountService";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const ProfilePage : React.FC = () => {
    const {id} = useParams<string>();
    const {error, isLoading, data} = useFetchAccountQuery(id!)
    return (
        <div>
            {data && <h1>Hi {data.userName}</h1>}
            {isLoading && <Loader/>}
            {error && <h1>{JSON.parse(JSON.stringify(error)).data}</h1>}
        </div>
    );
};

export default ProfilePage;
