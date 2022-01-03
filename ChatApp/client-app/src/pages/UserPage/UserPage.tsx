import React from 'react';
import {useFetchUserQuery} from "../../servies/userService";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const UserPage : React.FC = () => {
    const {id} = useParams<string>();
    const {error, isLoading, data} = useFetchUserQuery(id!)
    return (
        <div>
            {data && <h1>Hi {data.userName}</h1>}
            {isLoading && <Loader/>}
            {error && <h1>{JSON.parse(JSON.stringify(error)).data}</h1>}
        </div>
    );
};

export default UserPage;
