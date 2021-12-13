import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenKey, BaseUrl} from "../common/global";
import {Room} from "../types/dataTypes";
import {RequestResult} from "../common/RequestResult";

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
        fetchRooms: build.query<Room[], void>({
           query: () => ({
               url: "room/",
           })
        }),
        fetchRoom: build.query<RequestResult<Room>, number | string>({
            query: (id) => ({
                url: `room/${id}`
            })
        })
    })
})

export const {useFetchRoomsQuery, useFetchRoomQuery} = roomAPI