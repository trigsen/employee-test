import type { DefaultError, UseQueryOptions } from '@tanstack/react-query'
import { useQuery, useMutation } from '@tanstack/react-query'

import type { QueryKeyItem, QueryKeyList, MutationKeyItem } from './query-key-factories.ts'
import { GetUrlParametersType, TupleToUnion } from '@/shared/types/utility-types.ts'

export interface UseGetQueryParams<RETURN_TYPE extends unknown | unknown[]> {
  options?: Omit<UseQueryOptions<RETURN_TYPE, Error>, 'queryFn'>
  queryKey: QueryKeyItem<RETURN_TYPE> | QueryKeyList<RETURN_TYPE>
  shouldFetch?: boolean
  shouldRetry?: boolean
}

export const useGetQuery = <RETURN_TYPE>(
  url: string,
  { options, queryKey, shouldFetch = true, shouldRetry = false }: UseGetQueryParams<RETURN_TYPE>
) => {
  return useQuery({
    ...options,
    enabled: shouldFetch,
    queryFn: async (): Promise<RETURN_TYPE> => {
      const baseUrl = import.meta.env.VITE_API_URL!

      const response = await fetch(`${baseUrl}${url}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return response.json()
    },
    queryKey,
    retry: shouldRetry
  })
}

interface UseMutateQueryParams<RETURN_TYPE, VARIABLES extends Record<string, unknown>> {
  method?: 'post' | 'put'
  mutationKey: MutationKeyItem<RETURN_TYPE, VARIABLES>
}

export const useMutateQuery = <
  RETURN_TYPE extends unknown | unknown[],
  URL extends string,
  VARIABLES extends Record<string, unknown>
>(
  url: URL,
  { method = 'post', mutationKey }: UseMutateQueryParams<RETURN_TYPE, VARIABLES>
) => {
  type PathParametersType = Record<TupleToUnion<GetUrlParametersType<URL>>, string>

  type PathParametersInVariables =
    TupleToUnion<GetUrlParametersType<URL>> extends never
      ? object
      : {
          pathParameters: PathParametersType
        }

  return useMutation<RETURN_TYPE | undefined, DefaultError, VARIABLES & PathParametersInVariables>({
    mutationFn: async (variables) => {
      const baseUrl = import.meta.env.VITE_API_URL!

      const pathParametersRecord = variables.pathParameters as Record<string, string> | undefined

      let urlPaths = url.split('/')

      if (pathParametersRecord) {
        urlPaths = urlPaths.map((urlPath) => {
          // If there is a url path param ex. ':id'
          if (urlPath.includes(':')) {
            return pathParametersRecord[urlPath.replace(':', '')]
          }

          return urlPath
        })
      }

      const constructedUrl = urlPaths.join('/')

      const response = await fetch(`${baseUrl}${constructedUrl}`, {
        method,
        body: JSON.stringify(variables),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return response.json()
    },
    mutationKey
  })
}
