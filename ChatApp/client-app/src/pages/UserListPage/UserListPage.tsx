import React, {MouseEventHandler} from 'react';
import {Alert, Button, Table} from 'reactstrap';
import {useFetchUsersQuery} from "../../servies/userService";
import Loader from "../../components/Loader/Loader";
import {Link} from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

import "./UserListPage.css"

const UserPageList: React.FC = () => {
    const {data, isLoading, error} = useFetchUsersQuery();
    const [page, setPage] = React.useState(1);


    const nextPageHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        setPage(x => x + 1);
    }

    const prevPageHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        setPage(x => x - 1);
    }

    return (
        <div className={"page"}>
            <div className={"page-content"}>
                <div className={"page-head"}>
                    <h3>All user lists</h3>
                </div>
                <div className={"page-body"}>
                    {isLoading && <Loader/>}
                    {error && <Alert color="danger">Error while fetching user</Alert>}
                    {data &&
                        <>
                            <Table
                                size="sm"
                                style={{height: "450px"}}
                            >
                                <thead>
                                <tr style={{textAlign: "center"}}>
                                    <th>
                                        BIO
                                    </th>
                                    <th>
                                        Username
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map(item =>
                                    <tr key={item.id}>
                                        <td style={{textAlign: "center"}}>
                                            {item.firstName} {item.lastName}
                                        </td>
                                        <td style={{textAlign: "center"}}>
                                            {item.userName}
                                        </td>
                                        <td style={{textAlign: "center"}}>
                                            <Link to={`/user/${item.id}`}>
                                                Go to profile
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                            <Pagination
                                nextPageHandler={nextPageHandler}
                                prevPageHandler={prevPageHandler}
                                pageNumber={page}/>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default UserPageList
