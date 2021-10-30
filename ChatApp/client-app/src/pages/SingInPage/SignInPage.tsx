import React, {useState} from 'react';
import {Button, Input} from "reactstrap";
import {useActions} from "../../hooks/useActions";
import {useUserSelector} from "../../hooks/useAuth";
import {Redirect} from "react-router-dom";

const SingInPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const {signInUser} = useActions()
    const {error, isAuthorized} = useUserSelector(state => state.users);
    
    if (isAuthorized)
        return (
            <Redirect to={"/"}/>
        )
        
    return (
        <div>
            <h1>Sign in page</h1>
            <div>
                <Input
                    value={username}
                    onChange={(e) => {
                        e.persist();
                        setUsername((username) => e.target.value)
                    }}
                />
                
                <div>
                    <h2>{error}</h2>
                </div>
                
               <div>
                   <Button onClick={() => signInUser(username)}> Sign in </Button>
               </div>
            </div>
        </div>
    );
};

export default SingInPage;