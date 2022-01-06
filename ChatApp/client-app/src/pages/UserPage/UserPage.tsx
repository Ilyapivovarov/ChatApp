import React from 'react';
import {useFetchUserQuery} from "../../servies/userService";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserPage : React.FC = () => {
    const {id} = useParams<string>();
    const {error, isLoading, data} = useFetchUserQuery(id!)
    return (
        <div>
            {isLoading && <Loader/>}
            {error && <h1>{JSON.parse(JSON.stringify(error)).data}</h1>}
            {data && <UserProfile user={data}/>}
        </div>
    );
};

export default UserPage;
