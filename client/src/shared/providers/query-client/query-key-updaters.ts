import { QueryKeyItem, QueryKeyList } from '@/shared/providers/query-client/query-key-factories.ts'
import { queryClient } from '@/shared/providers/query-client/query-client.ts'

export const updateQueryItem = <T>(queryKey: QueryKeyItem<T> | QueryKeyList<T>, data: T) => {
  queryClient.setQueryData(queryKey, data)
}
