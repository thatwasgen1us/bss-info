import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataResponse } from "../interface";

export const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getBaseData: builder.query<DataResponse | undefined, void>({
      query: () => "top_rate", 
    }),
    getBaseInfo: builder.query({
      query: (base) => `site_info/${base}` 
    }),
  }),
});

export const { useGetBaseDataQuery, useGetBaseInfoQuery } = Api;