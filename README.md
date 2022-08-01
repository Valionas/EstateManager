# EstateManager 

## Overall Description

The EstateManager system will be used to help various people, interested or directly working in the estate economy, with managing their estate sales and rents through a simple user interface. The project consists of several important parts: 

### Rents
  * A catalog type page which will hold all the records of the currently listed rentable estates
  * The listed items are divided in cards, which hold information about the name, location, monthly rent and some user control buttons, depending on the user relationship with the current item - whether if he is an owner or another person, the user will see a different set of buttons:
    * Owner of the rentable estate - the buttons will be oriented around the CRUD functionality of the entity, such as deleting or updating the currently focused rentable estate
    * Non-owner of the rentable estate - there will be 2 buttons - to request a rent and to leave a review. \
      If the user decides to become a renter for the current estate , he must send an request to the owner of the estate and wait for an approval. If the owner decides to approve the person, by viewing his motivational message, he will grant the person renter access \
      If the user decides to leave a review, he can choose the other button. After successfully filling the review modal information, which pops up after clicking, the user's review is listed below the rentable estate to help the others to have a better understanding of the current state of the rent 
 * There will be a button to create and list a rentable estate, which will be only visible to all authenticated users, while the anonymous ones will have access only to a read-only part of the page.

### Estates
 * Similar to the rents functionality, the estates part will be used to have CRUD operations for estates which will be used for sales.
 * The estates have specific information, different from the one in the rents, but they also share common things, such as name, location, owner and renter or buyer 
 * The ownership functionality is also included, but the estates do not have review functionality since it won't be of any need to the other users , unlike the rent scenario

### Rent Requests
 * This page will hold all the requests, received from the users to rentable estates, property of the currently authenticated user.
 * The current user will have to make the choice between the requests and approve one or none of the pending renters.
 * Upon approving a rent request, the current user will have a generated report , which will be part of the Reports page.

### Estate Sales
 * Similar to the rent requests page, the user will decide how to change the status of the estate for sale and will also have to include the buyer's information
 * After changing the status of the estate to sold, a report will be generated and send to the Reports Page

### Reports Page
 * The page is divided in two tables - one for the rents and one for the estate sales. Both tables share some common and some different columns, in which the current user will have the opportunity to check his sales and rents , in order to summarize the given information and decide how his business is holding.

## Architecture
 * The project is divided into 4 main folders - helpers, pages, services and store
  * helpers - mapper functions and menu items functions which are used to format and map data into a more useful way
  * pages - consists of sub-folders for every page of the project, including CRUD pages, Authentication pages and error page
  * services - the API call logic, which is called and triggered in the useEffects or event handlers around the project
  * store - the Redux store, which hold the reducer slices and the store file in which we combine all the reducers
