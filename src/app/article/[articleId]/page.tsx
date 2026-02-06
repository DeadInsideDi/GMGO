import './page.scss'

export type TArticleIdProps = {
  params: Promise<{ articleId: string }>
}

export default async function ArticleId({ params }: TArticleIdProps) {
  const { articleId } = await params
  return (
    <>
      <div>ArticleId: {articleId}</div>
    </>
  )
}
