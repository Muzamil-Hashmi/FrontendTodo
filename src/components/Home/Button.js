import React from 'react'

const Button = ({input,handleadd}) => {
  return (
<>


<button className={`py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl 
                        ${input === "" ? "disabled" : ""} `} 
                        onClick={handleadd}>Add</button>

</>  )
}

export default Button