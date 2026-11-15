import Link from 'next/link';

// The home page introduces the historical WCA delegate-record project while
// its review and migration workflows are built in later stories.
export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <h1>Delegate History</h1>
      <p className="text-body text-neutral-100">
        Reconstruct historical WCA delegate records missing from the WCA website. Check{' '}
        <Link href="/health" className="underline">
          backend status
        </Link>
        .
      </p>
    </main>
  );
}
