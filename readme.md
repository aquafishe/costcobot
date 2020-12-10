#Costco Stock Bot
* **Requirements**: NodeJS, Chrome browser
* **Description**: This program will check the Costco website if a product is in stock. When the product is found in stock the program will automatically open a new Chrome browser to the product link.
***

###Setup
Update **config.json** with your own options:
```sh
{
    "costco_url": "costco_product_url", //enter costco url to your product
    "minutes_til_log": 30,  //minutes til console will log program status
    "sec_til_refresh": 5    //seconds of delay til url is refreshed
}
``` 

Free to use!