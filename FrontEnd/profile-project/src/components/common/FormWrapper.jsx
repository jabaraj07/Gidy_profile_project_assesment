import React from 'react'

const FormWrapper = ({title,onSubmit,children,description}) => {
  return (
    <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </div>
  )
}

export default FormWrapper