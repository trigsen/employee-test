export type GetUrlParametersType<
  URL extends string,
  TUPLE extends string[] = []
> = URL extends `${string}/:${infer STRING_PARAMETER}/${infer REST_STRING}`
  ? GetUrlParametersType<REST_STRING, [...TUPLE, STRING_PARAMETER]>
  : URL extends `${string}/:${infer LAST_STRING_PARAMETER}` | `:${infer LAST_STRING_PARAMETER}`
    ? [...TUPLE, LAST_STRING_PARAMETER]
    : TUPLE

export type TupleToUnion<TUPLE, UNION = never> = TUPLE extends [infer ELEMENT, ...infer REST]
  ? TupleToUnion<REST, UNION | ELEMENT>
  : UNION
