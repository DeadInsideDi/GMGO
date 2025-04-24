import './page.scss'

export type TSearchProps = {
  searchParams: Promise<{ query?: string }>
}

export default async function Search({ searchParams }: TSearchProps) {
  const { query } = await searchParams
  return (
    <>
      <div>Search {query}</div>
    </>
  )
}
