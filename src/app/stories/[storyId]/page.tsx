import './page.scss'

export type TStoryIdProps = {
  params: Promise<{ storyId: string }>
}

export default async function StoryId({ params }: TStoryIdProps) {
  const { storyId } = await params
  return (
    <>
      <div>StoryId: {storyId}</div>
    </>
  )
}
