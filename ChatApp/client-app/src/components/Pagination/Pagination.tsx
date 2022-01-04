import React, {MouseEventHandler} from 'react';
import {Button} from "reactstrap";

import "./Pagination.css"

interface PaginationProp{
    hidden?: boolean,
    pageNumber: number,
    nextPageHandler: MouseEventHandler<HTMLButtonElement>
    prevPageHandler: MouseEventHandler<HTMLButtonElement>
}

const Pagination : React.FC<PaginationProp> = (props) => {
    if (props.hidden)
        return (<></>)
    
    return (
        <div className={"pagination"}>
            <div className={"pag-button"}>
                <Button
                    disabled={props.pageNumber == 1}
                    onClick={props.prevPageHandler}
                    color="secondary"
                    size={"sm"}
                    outline
                >
                    {"<-"}
                </Button>
            </div>
            <div className={"current-page"}>
                {props.pageNumber}
            </div>
            <div className={"pag-button"}>
                <Button
                    onClick={props.nextPageHandler}
                    size={"sm"}
                    color="secondary"
                    outline
                >
                    {"->"}
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
