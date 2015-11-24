## linked_data_proj
Linked data and Semantic web project 2015

by Kieran Redington

These Databases will display the year and information from a population database and crime database.
The user may add information to each of these and delete from each of this.
This Api will be useful for users who wish to search for crime rates in relation to population 
levels. 

**Datasets**: 
I am using two datasets from the CSO Statbank. The first datset records the
crime, year and number of offences in that year. The other dataset is the results 
of all the nation wide census from 1841 till 2011. For our needs we will use the 
information between 2004 and 2011. The census dataset will also differentiate by sex.


To test the api run it in node.js and enter the following url:

localhost/crimeOffences (displays entire crime databases)
localhost/populationYear/get/1881  (gets information from 1881 population)
localhost/populationTot/delete/2000 (This method is not working)
localhost//criminal/add/2011/attack on security personal/1000 (This method is not working correctly)

**Sources**

https://github.com/Ranagan/linked-data-project
https://github.com/ianmcloughlin/diamond-api
https://github.com/EoghanMoylan/Linked-Data

