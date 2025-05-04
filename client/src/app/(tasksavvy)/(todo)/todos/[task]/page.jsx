
import React from 'react'

async function Tasks({params}) {
  const {task} = await params
  // console.log(params);
  return (
    <div>tasks group-{task} </div>
  )
}

export default Tasks