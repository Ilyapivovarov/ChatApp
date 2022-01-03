import React from 'react';
import {Message, User} from "../../common/types";

enum DataTablePropType {
    Messages,
    Users
}

interface UsersTableProp {
    type: DataTablePropType.Messages
    data: User[],
}

interface MessagesTableProp {
    type: DataTablePropType.Messages
    data: Message[],
}

const DataTable = () => {
    return (
        <div>
            
        </div>
    );
};

export default DataTable;
