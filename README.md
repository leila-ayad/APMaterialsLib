# APMaterialsLib

PROJECT OVERVIEW

This is the backend code for the Materials Library. This program serves the Abstract Picnic art community. It's purpose is to create a place for group members to swap leftover materials or borrow each other's tools. The app functions similar to Craigslist. Communications about materials are handled externally and it is the user's responsibility to delete a material if it has been claimed. 


{ "material_name": "clay", "material_description": "NM Sol", "material_unit": "20 pounds", "contact_method": "instagram : leila.alhemali"}


AUTH ROUTER

POST ../api/auth/register 

Registers a new user to the database. Use following payload: 

**username must be unique. All other fields are not nullable. Successful request returns welcome message.

Use following payload:

{
    "username" : "leila",
    "password" : "awfulPW",
    "email" : "leila@fakeemail.com",
    "name" : "leila",
    "pronouns" : "she/her"
}


POST ../api/auth/login 

Log in with existing credentials. Use following payload:

{
    "username" : "leila",
    "password" : "awfulPW"
}

 {
    "username" : "brandon",
    "password" : "worsePW"

 }  

Username and password must already exist in the database. Create new user with the ../api/user/register route if necessary. Returns welcome message and token. 

GET ../api/auth/logout

Log out the currently logged in user. A user must be logged in with active token for this route to work.

MATERIALS ROUTER

GET ../api/materials/

Retrieves all of the existing materials in the database. 

GET ../api/materials/{:id}

Retrieves the material based on "material_id". Returns the requested material.

GET ../api/materials/{:id}/your-materials

Retrieves the materials that belong to a specific logged-in member. The :id in the URL refers to the member_id.


POST ../api/materials/

Adds a new materials to the database. This is a restricted route. User must be logged in with valid token. Returns the newly created material.

Use the following payload:

{ "material_name": "yarn", "material_description": "wooly sheepy", "material_unit": "20 yards", "contact_method": "instagram : 9314142321"}

PUT ../api/materials/:id

Updates the material by the material id. Only need to include the field which will be updated.

DELETE ../api/materials/:id

Deleted the material based on the material id. Can not be reversed. 



Notes

--including images with express/knex
https://www.youtube.com/watch?v=SAUvlkTDMM4


