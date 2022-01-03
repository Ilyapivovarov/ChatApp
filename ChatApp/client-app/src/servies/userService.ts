import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenKey, BaseUrl, BaseUrlApi} from "../common/global";
import {User} from "../common/types";

export const userAPI = createApi({
    reducerPath: 'userAPI',
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
        fetchUsers: build.query<User[], void>({
            query: () => ({
                url: "user/",
            })
        }),
        fetchUser: build.query<User, number | string>({
            query: (id) => ({
                url: `user/${id}`
            })
        })
    })
})

export const {useFetchUsersQuery, useFetchUserQuery} = userAPI