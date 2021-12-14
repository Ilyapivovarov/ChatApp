import React from 'react';
import {useFetchAccountQuery} from "../../servies/accountService";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const ProfilePage = () => {
    const {id} = useParams();
    const {error, isLoading, data} = useFetchAccountQuery(0)
    console.log("data", data)
    console.log("error", error)
    return (
        <div>
            {data && <h1>Hi {data.userName}</h1>}
            {isLoading && <Loader/>}
            {error && <h1>{JSON.parse(JSON.stringify(error)).data}</h1>}
        </div>
    );
};

export default ProfilePage;
