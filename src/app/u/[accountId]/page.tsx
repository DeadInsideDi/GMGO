import './page.scss'

export type TAccountIdProps = {
  params: Promise<{ accountId: string }>
}

export default async function AccountId({ params }: TAccountIdProps) {
  const { accountId } = await params
  return (
    <>
      <div>AccountId: {accountId}</div>
    </>
  )
}
