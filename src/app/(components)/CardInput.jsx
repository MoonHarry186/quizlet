import React from 'react'

const CardInput = ({ index, handleChange, handleUploadImage }) => {
  return (
      <div className="card">
        <label htmlFor={`term-${index}`}>Term</label>
        <input
          type="text"
          name={`term-${index}`}
          placeholder="Enter Term"
          onChange={handleChange("term")}
        />
        <label htmlFor={`type-${index}`}>Type</label>
        <input
          type="text"
          name={`type-${index}`}
          placeholder="Enter Type"
          onChange={handleChange("type")}
        />
        <label htmlFor={`definition-${index}`}>Def</label>
        <input
          type="text"
          name={`definition-${index}`}
          placeholder="Enter Definition"
          onChange={handleChange("definition")}
        />
         <label htmlFor={`example-${index}`}>Ex</label>
        <input
          type="text"
          name={`example-${index}`}
          placeholder="Enter example"
          onChange={handleChange("example")}
        />
        <label htmlFor={`image-${index}`}>Image</label>
        <input
          type="file" // Assuming image is a URL or base64 string; adjust if necessary
          name={`image-${index}`}
          placeholder="Enter Image URL"
          onChange={(e) => handleUploadImage(e)}
        />
      </div>
  )
}

export default CardInput
