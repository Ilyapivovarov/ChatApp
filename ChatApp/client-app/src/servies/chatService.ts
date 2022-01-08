import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenKey, BaseUrl, BaseUrlApi} from "../common/global";
import {Chat, User} from "../common/types";

export const chatAPI = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrlApi,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(AccessTokenKey);
            if (token)
                headers.set('authorization', `Bearer ${token}`)
            return headers;
        },
    }),
    endpoints: (build) => ({
        fetchChats: build.query<Chat[], void>({
            query: () => ({
                url: "chat/"
            })
        }),
        fetchChat: build.query<Chat, number | string>({
            query: (id) => ({
                url: `chat/${id}`
            })
        }),
        getOrCreateChat: build.mutation<Chat, User[]>({
            query: (users : User[]) => ({
                url: "chat/get-or-create-chat",
                body: users,
                method: "PUT"
            })
        })
    })
})

export const {useFetchChatQuery, useFetchChatsQuery, useGetOrCreateChatMutation} = chatAPI