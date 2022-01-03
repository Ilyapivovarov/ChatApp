import React from 'react';
import {Alert, Table} from 'reactstrap';
import {useFetchUsersQuery} from "../../servies/userService";
import Loader from "../../components/Loader/Loader";
import {Link} from "react-router-dom";

const UserPageList: React.FC = () => {
    const {data, isLoading, error} = useFetchUsersQuery();
    return (
        <div className={"page"}>
            <div className={"page-head"}>
                <h3>All user lists</h3>
            </div>
            <div className={"page-body"}>
                {isLoading && <Loader/>}
                {error && <Alert color="danger" title={"Error"}/>}
                {data && <Table
                    hover
                    responsive
                    size="sm"
                >
                    <thead>
                    <tr>
                        <th>
                            First name
                        </th>
                        <th>
                            Last name
                        </th>
                        <th>
                            Username
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item =>
                        <tr key={item.id}>
                            <td>
                                {item.firstName}
                            </td>
                            <td>
                                {item.lastName}
                            </td>
                            <td>
                                {item.userName}
                            </td>
                            <td>
                                <Link to={`/user/${item.id}`}>
                                    Go to profile
                                </Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>}
            </div>
        </div>
    );
};

export default UserPageList
