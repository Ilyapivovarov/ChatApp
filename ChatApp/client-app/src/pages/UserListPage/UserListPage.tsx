import {Autocomplete, TextField, Typography} from '@mui/material';
import React from 'react';

const top100Films = [
    {
        title: 'Asd'
    }
]

const UserPageList: React.FC = () => {
    return (
        <div className={"page"}>
            <div className={"page-head"}>
                <Typography>All user lists</Typography>
                <Autocomplete
                    id="user-search"
                    size={"small"}
                    disableClearable
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </div>
            <div className={"page-body"}>

            </div>
        </div>
    );
};

export default UserPageList
