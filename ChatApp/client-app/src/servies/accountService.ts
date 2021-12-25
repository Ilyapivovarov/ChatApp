import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenKey, BaseUrl} from "../common/global";
import {User} from "../common/types";

export const accountAPI = createApi({
    reducerPath: 'accountAPI',
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
        fetchAccounts: build.query<User[], void>({
            query: () => ({
                url: "account/",
            })
        }),
        fetchAccount: build.query<User, number | string>({
            query: (id) => ({
                url: `account/${id}`
            })
        })
    })
})

export const {useFetchAccountQuery, useFetchAccountsQuery} = accountAPI