import Link from 'next/link'
import React from 'react'

export default function Page({ params }) {
  return (
    <>
    
    <div>usersData page : {params.id}</div>
    <Link href={"/"}>Home page </Link>
    </>
  )
}
