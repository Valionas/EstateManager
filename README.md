#EstateManager 
## Overall Description

The EstateManager system will be used to help various people, interested or directly working in the estate economy, with managing their estate sales and rents through a simple user interface. The project consists of several important parts: 
* Rents
  * A catalog type page which will hold all the records of the currently listed rentable estates
  * The listed items are divided in cards, which hold information about the name, location, monthly rent and some user control buttons, depending on the user relationship with the current item - whether if he is an owner or another person, the user will see a different set of buttons:
    * Owner of the rentable estate - the buttons will be oriented around the CRUD functionality of the entity, such as deleting or updating the currently focused rentable estate
    * Non-owner of the rentable estate - there will be 2 buttons - to request a rent and to leave a review. 
      *If the user decides to become a renter for the current estate , he must send an request to the owner of the estate and wait for an approval. If the owner decides to approve the person, by viewing his motivational message, he will grant the person renter access 
      *If the user decides to leave a review, he can choose the other button. After successfully filling the review modal information, which pops up after clicking, the user's review is listed below the rentable estate to help the others to have a better understanding of the current state of the rent 
