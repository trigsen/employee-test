interface CreateBaseListQueryKeyOptions {
  base: string
  baseId?: never
  entity?: never
  filters?: { [key: string]: unknown }
}
interface CreateEntityListQueryKeyOptions {
  base: string
  baseId: string | number
  entity: string
  filters?: { [key: string]: unknown }
}

type CreateListQueryKeyOptions = CreateBaseListQueryKeyOptions | CreateEntityListQueryKeyOptions

interface CreateItemQueryKeyOptions {
  base: string
  baseId?: string | number
  entity?: string
  params?: { [key: string]: unknown }
}

export type QueryKeyList<DATA_TYPE> = [
  DATA_TYPE | 'list',
  CreateListQueryKeyOptions['base'],
  CreateListQueryKeyOptions['baseId'],
  CreateListQueryKeyOptions['entity'],
  CreateListQueryKeyOptions['filters']
]

export type QueryKeyItem<DATA_TYPE> = [
  DATA_TYPE | 'item',
  CreateItemQueryKeyOptions['base'],
  CreateItemQueryKeyOptions['baseId'],
  CreateItemQueryKeyOptions['entity'],
  CreateItemQueryKeyOptions['params']
]

export type MutationKeyItem<DATA_TYPE, VARIABLES extends Record<string, unknown>> = [
  DATA_TYPE | 'item-mutation',
  VARIABLES | 'item-variables',
  CreateItemQueryKeyOptions['base'],
  CreateItemQueryKeyOptions['baseId'],
  CreateItemQueryKeyOptions['entity'],
  CreateItemQueryKeyOptions['params']
]

/**
 * This function creates a query key for list of DATA_TYPE.
 * Example 1 for resource `/api/movies`:
 * ```
 * createListQueryKey<MovieDefinition>({
 *   base: 'movies',
 * }),
 * ```
 * Example 2 for resource `/api/movies/${movieUuid}/character?genre=comedy`:
 * ```
 * createListQueryKey<MovieDefinition>({
 *   base: 'movies',
 *   baseId: movieUuid,
 *   entity: 'character',
 *   filters: { genre: 'comedy' },
 * }),
 * ```
 * @param base Name of the API resource
 * @param baseId Identifier of the API resource item
 * @param entity Entity of the API resource item
 * @param filters Filters applied to the query
 */
export function createListQueryKey<DATA_TYPE extends unknown[]>({
  base,
  baseId,
  entity,
  filters
}: CreateListQueryKeyOptions) {
  const queryKey: QueryKeyList<DATA_TYPE> = ['list', base, baseId, entity, filters]

  return queryKey
}

/**
 * This function creates a query key with DATA_TYPE.
 * Example:
 * Example 1 for resource `/api/profile` that contains a static object listing information about the current profile:
 * ```
 * createItemQueryKey<ProfileDefinition>({
 *   base: 'profile',
 * }),
 * ```
 * Example 2 for resource `/api/movies/${movieUuid}`:
 * ```
 * createItemQueryKey<MovieDefinition>({
 *   base: 'movies',
 *   baseId: movieUuid,
 * }),
 * ```
 * Example 3 for resource `/api/movies/${movieUuid}/actor` that contains information about the actor of this movie:
 * ```
 * createItemQueryKey<UserDefinition>({
 *   base: 'movies',
 *   baseId: movieUuid,
 *   entity: 'actor',
 * }),
 * ```
 * @param base Name of the API resource
 * @param baseId Identifier of the API resource item
 * @param entity Entity of the API resource item
 * @param params Parameter of the API resource item
 */
export function createItemQueryKey<DATA_TYPE>({
  base,
  baseId,
  entity,
  params
}: CreateItemQueryKeyOptions) {
  const queryKey: QueryKeyItem<DATA_TYPE> = ['item', base, baseId, entity, params]
  return queryKey
}

export function createItemMutationKey<DATA_TYPE, VARIABLES extends Record<string, unknown>>({
  base,
  baseId,
  entity,
  params
}: CreateItemQueryKeyOptions) {
  const queryKey: MutationKeyItem<DATA_TYPE, VARIABLES> = [
    'item-mutation',
    'item-variables',
    base,
    baseId,
    entity,
    params
  ]
  return queryKey
}
