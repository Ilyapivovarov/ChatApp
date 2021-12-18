import {Account} from "../types/dataTypes";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenKey, BaseUrl} from "../common/global";

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
        fetchAccounts: build.query<Account[], void>({
            query: () => ({
                url: "account/",
            })
        }),
        fetchAccount: build.query<Account, number | string>({
            query: (id) => ({
                url: `account/${id}`
            })
        })
    })
})

export const {useFetchAccountQuery, useFetchAccountsQuery} = accountAPI