import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenKey, BaseUrl} from "../common/global";
import {Chat} from "../common/types";

export const roomAPI = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(AccessTokenKey);
            if (token)
                headers.set('authorization', `Bearer ${token}`)
            return headers;
        },
    }),
    endpoints: (build) => ({
        fetchRooms: build.query<Chat[], void>({
            query: () => ({
                url: "chat/"
            })
        }),
        fetchRoom: build.query<Chat, number | string>({
            query: (id) => ({
                url: `chat/${id}`
            })
        })
    })
})

export const {useFetchRoomQuery, useFetchRoomsQuery} = roomAPI