import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Iurl {
  _id: string;
  originalUrl: string;
  shortenId?: string;
  expiration?: Date;
  expair?: boolean;
  createdAt: Date;
}

export const Api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
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
    GetSingel: builder.query({
      query: (shortenId) => ({
        url: `/shorten/${shortenId}`,
      }),
    }),
  }),
});

export const {
  useGetUrlsQuery,
  useAddUrlMutation,
  useRemoveUrlMutation,
  useGetSingelQuery,
} = Api;
