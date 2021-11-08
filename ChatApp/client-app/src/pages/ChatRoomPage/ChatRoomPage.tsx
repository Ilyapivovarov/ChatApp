import React, {useEffect} from 'react';
import {useUserSelector} from "../../hooks/useAuth";
import {useRoomActionCreator} from "../../hooks/useRoom";

const ChatRoomPage: React.FC = () => {
    const {fetchRoom} = useRoomActionCreator();
    const {room, loading, error} = useUserSelector(x => x.rooms);

    useEffect(() => {
        fetchRoom(1);
    }, []);

    console.log(room)
    
    if (loading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }

    if (room) {
        return (
            <div>
                <h1>{room.admin.userName}</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>{error}</h1>
        </div>
    );
};

export default ChatRoomPage;
