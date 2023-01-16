import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://webmanuals-arbetsprov-api.onrender.com/api",
  }),
  tagTypes: ["shorten"],
  endpoints: (builder) => ({
    getUrls: builder.query({
      query: () => ({
        url: "/shorten",
      }),
      providesTags: ["shorten"],
    }),
    AddUrl: builder.mutation({
      query: (data) => ({
        url: "/shorten",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["shorten"],
    }),
    RemoveUrl: builder.mutation({
      query: (id) => ({
        url: `/shorten/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["shorten"],
    }),
    UpdateExpair: builder.mutation({
      query: ({ id, ...expair }) => ({
        url: `/shorten/${id}`,
        method: "PATCH",
        body: expair,
      }),
      invalidatesTags: ["shorten"],
    }),
  }),
});

export const {
  useGetUrlsQuery,
  useAddUrlMutation,
  useRemoveUrlMutation,
  useUpdateExpairMutation,
} = Api;
