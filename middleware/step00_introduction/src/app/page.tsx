import Link from 'next/link';

export default function Home() {
  return (
    <div className='mx-10'>
      <h1 className='my-10 text-lg font-bold'>Middleware</h1>
      <div className='mx-10'>
        <p className='text-base font-semibold'>Routes</p>
        <ul className='list-disc mt-3 px-10 space-y-2 text-blue-800'>
          <li>
            <Link href='/about1'>about1</Link>
          </li>
          <li>
            <Link href='/about2'>about2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
