import { getProviders, signIn } from 'next-auth/react'

export default function Login({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white text-lg font-medium p-5 rounded-full hover:bg-green-500"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}
