import './page.scss'

export type TCategoryNameProps = {
  params: Promise<{ categoryName: string }>
}

export default async function CategoryName({ params }: TCategoryNameProps) {
  const { categoryName } = await params
  return (
    <>
      <div>CategoryName: {categoryName}</div>
    </>
  )
}
