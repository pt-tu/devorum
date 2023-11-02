import Head from "next/head";

export default function App() {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <main className="grid grid-cols-12 gap-5 relative flex-col items-center justify-between h-full px-10">
        <p className="text-gray-bg">main</p>
      </main>
    </Head>
  );
}
