# APMaterialsLib

PROJECT OVERVIEW

This is the backend code for the Materials Library. This program serves the Abstract Picnic art community. It's purpose is to create a place for group members to swap leftover materials or borrow each other's tools. The app functions similar to Craigslist. Communications about materials are handled externally and it is the user's responsibility to delete a material if it has been claimed. 


{ "material_name": "clay", "material_description": "NM Sol", "material_unit": "20 pounds", "contact_method": "instagram: leila.alhemali"}


AUTH ROUTER

POST ../api/auth/register 

Registers a new user to the database. Use following payload: 
{
    "username" : "leila",
    "password" : "awfulPW",
    "email": "leila@ap.com",
    "name" : "leila",
    "pronouns" : "she/her"
}
**username must be unique. All other fields are not nullable. Successful request returns welcome message.

POST ../api/auth/login 

Log in with existing credentials. Use following payload:

{
    "username" : "leila",
    "password" : "awfulPW"
}

Username and password must already exist in the database. Create new user with the ../api/user/register route if necessary. Returns welcome message and token. 

GET ../api/auth/logout

Log out the currently logged in user. A user must be logged in with active token for this route to work.

