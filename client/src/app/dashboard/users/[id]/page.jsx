import Link from 'next/link'
import React from 'react'

export default async function Page({ params }) {

  const { id } = await params
  return (
    <>
    
    <div>usersData page : {id}</div>
      <Link href="/">Home page</Link>

    </>
  )
}


// 'use client';
// import { useParams } from 'next/navigation';

// export default function Page() {
//   const params = useParams();

//   return (
//     <>
//       <div>usersData page : {params.id}</div>
//       <Link href="/">Home page</Link>
//     </>
//   );
// }
