import React from 'react';
import {useFetchUserQuery} from "../../servies/userService";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserPage : React.FC = () => {
    const {id} = useParams<string>();
    const {error, isLoading, data:user} = useFetchUserQuery(id!)
    return (
        <div>
            {isLoading && <Loader/>}
            {error && <h1>{JSON.parse(JSON.stringify(error)).data}</h1>}
            {user && <UserProfile user={user}/>}
        </div>
    );
};

export default UserPage;
