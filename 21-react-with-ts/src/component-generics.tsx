import { PropsWithChildren, memo } from 'react'

interface ITableProps<TData> {
  field: keyof TData
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <TData extends Record<string, any>>(props: PropsWithChildren<ITableProps<TData>>) => {
  return <div>{props.children}</div>
}

export default Table
