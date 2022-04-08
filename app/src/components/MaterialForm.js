import React from 'react'

export default function MaterialForm (props) {


    return (
        <div>
           <h1> Create Material </h1>
           <p> This is where you create a material to be added to the library! Fill out the form and press submit. 
               Other members of Abstract Picnic will contact you to claim it. Please enter a contact method you check frequently
           </p>
           <form>
               <label>
                   Material Name
                   <input
                   type="text"
                   name="materialName"
                   />
               </label>
               <label>
                   Material Description
                   <input
                   type="text"
                   name="description"
                   />
               </label>
               <label>
                   Unit
                   <input
                   type="text"
                   name="Unit"
                   />
               </label>
               <label>
                   Contact Information
                   <input
                   type="text"
                   name="Contact Information"
                   />
               </label>
               <input id="submit" type="submit"/>
           </form>
        </div>
    )
}