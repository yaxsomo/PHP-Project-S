// import { faker, Faker, RandomModule } from '@faker-js/faker';
const { faker } = require('@faker-js/faker');
let { Users, Product, Address, Cart, display, getRandomFloat, randomNumber, Command, CommandHistory, Payement, Photo, Rate, Invoice } = require('./Collection.js');
const generate = faker
const sqlite3 = require('sqlite3').verbose();

function getRandomDate() {
  // Create a date object for a random day in the past or future
  var randomDate = new Date(Math.random() * Date.now());

  // Extract the day, month, and year from the date object
  var day = String(randomDate.getDate()).padStart(2, "0"); // pad with leading zeroes if needed
  var month = String(randomDate.getMonth() + 1).padStart(2, "0"); // add 1 to get the correct month number
  var year = String(randomDate.getFullYear());
  var result = year + "-" + month + "-"+ day
  // Return the date in "DD-MM-YYYY" format
  return result;
}



function generatePassword() {
  // generate a random number between 8 and 25
  const length = Math.floor(Math.random() * (25 - 8 + 1)) + 8;

  // generate a password string with random characters
  let password = "";
  for (let i = 0; i < length; i++) {
    // generate a random character between "a" and "z"
    password += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  return password;
}



//Generating specific data for our tables
function generateUsers(sampleCount) {
  let usersArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleFirstName = generate.name.firstName()                               
        let sampleLastName = generate.name.lastName()                                     
        let sampleEmail = generate.internet.email()                                  
        let samplePhoneNumber = generate.phone.number('###-###-###')   
        let samplePassword = generatePassword()
        let sampleRole = 0;
        let sample = new Users(index,sampleFirstName,sampleLastName,sampleEmail,samplePhoneNumber,samplePassword,sampleRole)
        usersArray.push(sample)
    }
    return usersArray
}

function generateProducts(sampleCount) {
  let productsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {                           
        let sampletName = generate.commerce.product()                                     
        let samplePrice = generate.commerce.price()                                  
        let sampleQuantity = randomNumber(5,150)
        let sampleSupplier = '"' + generate.company.name() + " " + generate.company.companySuffix() + '"'
        let sampleCategory = generate.commerce.department()
        let sample = new Product(index,sampletName,samplePrice,sampleQuantity,sampleSupplier,sampleCategory)
        productsArray.push(sample)
    }
    return productsArray
}

function generateAddresses(sampleCount) {
  let addressesArray = new Array()
  continents = ['Europe', 'Asia', 'America','Africa','Oceania']
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)                               
        let sampleUserAddress = generate.address.streetAddress()                                    
        let sampleCity = generate.address.city()                                  
        let samplePostalCode = generate.address.zipCode()
        let sampleCountry = generate.address.country()
        let sampleContinent = continents[Math.floor(Math.random() * continents.length)];
        let sample = new Address(index,sampleUserId,sampleUserAddress,sampleCity,samplePostalCode,sampleCountry,sampleContinent)
        addressesArray.push(sample)
    }
    return addressesArray
}



function generateCarts(sampleCount) {
  let cartsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)                               
        let sampleTotalPrice = generate.commerce.price(min=40,max=150) 
        let sample = new Cart(index,sampleUserId,sampleTotalPrice)
        cartsArray.push(sample)
    }
    return cartsArray
}


function generateCommands(sampleCount) {
  let commandsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleProductId = randomNumber(min=1,max=1000)                               
        let samplePrice = generate.commerce.price(min=40,max=150) 
        let sampleQuantity = randomNumber(min=1,max=100)   
        let sampleTotal = parseInt(samplePrice) * sampleQuantity                              
        let sampleCartId = randomNumber(min=1,max=1000)                               
        let sample = new Command(index,sampleProductId,samplePrice,sampleQuantity,sampleTotal,sampleCartId)
        commandsArray.push(sample)
    }
    return commandsArray
}




function generateCommandsHistory(sampleCount) {
  let commandsHistoryArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleProductId = randomNumber(min=1,max=1000)                               
        let samplePrice = generate.commerce.price(min=40,max=150)
        let sampleQuantity = randomNumber(min=1,max=100)   
        let sampleTotal = parseInt(samplePrice) * sampleQuantity                                                          
        let sample = new CommandHistory(index,sampleProductId,samplePrice,sampleQuantity,sampleTotal)
        commandsHistoryArray.push(sample)
    }
    return commandsHistoryArray
}

function generatePayements(sampleCount) {
  let payementsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)                               
        let sampleCardNumber = generate.finance.creditCardNumber()
        let sampleIban = generate.finance.iban()
        let sample = new Payement(index,sampleUserId,sampleCardNumber,sampleIban)
        payementsArray.push(sample)
    }
    return payementsArray
}

function generatePhotos(sampleCount) {
let photosArray = new Array()
  for (let index = 1; index <= sampleCount; index++) {
      let sampleUserId = randomNumber(min=1,max=1000)                               
      let sampleProductId = randomNumber(min=1,max=1000)
      let samplePhotoBlob = "/server/pictures/" + generate.system.fileName('jpg')
      let sample = new Photo(index,sampleUserId,sampleProductId,samplePhotoBlob)
      photosArray.push(sample)
  }
  return photosArray
}

function generateRates(sampleCount) {
  let ratesArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleProductId = randomNumber(min=1,max=1000) 
        let sampleUserId = randomNumber(min=1,max=1000)                                                          
        let sampleRating = getRandomFloat(0.0, 5.0, 2)
        let sample = new Rate(index,sampleProductId,sampleUserId,sampleRating)
        ratesArray.push(sample)
    }
    return ratesArray
}
          
function generateInvoices(sampleCount) {
  let invoicesArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)
        let sampleInvoiceDate = getRandomDate()
        let samplePayementId = randomNumber(min=1,max=1000)                             
        let sampleTotal = generate.commerce.price(min=40,max=150)
        let sampleAddressId = randomNumber(min=1,max=1000)
        let sampleHistoryId = randomNumber(min=1,max=1000)
        let sample = new Invoice(index,sampleUserId,sampleInvoiceDate,samplePayementId,sampleTotal,sampleAddressId,sampleHistoryId)
        invoicesArray.push(sample)
    }
    return invoicesArray
}

function writeStr(str) {
  // Split the string into an array of lines
  let fileWriter = require('fs');
  const line = str + ('\n');
  const filename = './result.sql';

  fileWriter.appendFileSync(filename, line);
  // fileWriter.appendFile(filename, line + "\n", (err) => {
  //   if (err) {
  //     // Handle the error
  //     console.error(err);
  //   } else {
  //     // The string was successfully written to the file
  //   }
  // });
  // // Close the file writer to save the file
  // fileWriter.close();
}





function insertDataToDB(nbRows){


    for (let j = 0; j < 10; j++) {
      
   


    for (let i = 0; i < nbRows; i++) {

      generatedUsers = generateUsers(1)
      generatedProducts = generateProducts(1)
      generatedAddresses = generateAddresses(1)
      generatedCarts = generateCarts(1)
      generatedCommands = generateCommands(1)
      generatedCommandsHistory = generateCommandsHistory(1)
      generatedPayements = generatePayements(1)
      generatedPhotos = generatePhotos(1)
      generatedRatings = generateRates(1)
      generatedInvoices = generateInvoices(1)
  
      tables = [
        `INSERT INTO User VALUES (` + [0,'"' + generatedUsers[0].firstName + '"','"' + generatedUsers[0].lastName + '"','"' + generatedUsers[0].email + '"','"' + generatedUsers[0].phone + '"','"' + generatedUsers[0].password + '"', generatedUsers[0].role].join(",")+ `)` + ";",
        `INSERT INTO Product VALUES (` + [0,'"' + generatedProducts[0].name + '"', generatedProducts[0].price, generatedProducts[0].quantity,generatedProducts[0].suppliers,'"' + generatedProducts[0].category + '"'].join(",")+ `)` + ";",
        `INSERT INTO Address VALUES (` + [0, generatedAddresses[0].userId ,'"' + generatedAddresses[0].userAddress + '"', '"' + generatedAddresses[0].city + '"','"' +  generatedAddresses[0].postalCode + '"' ,'"' + generatedAddresses[0].country + '"', '"' + generatedAddresses[0].continent + '"'].join(",")+ `)` + ";",
        `INSERT INTO Cart VALUES (` + [0, generatedCarts[0].userId ,generatedCarts[0].totalPrice].join(",")+ `)` + ";",
        `INSERT INTO Command VALUES (` + [0, generatedCommands[0].productId, generatedCommands[0].price , generatedCommands[0].quantity, generatedCommands[0].total, generatedCommands[0].commandCartId].join(",")+ `)` + ";",
        `INSERT INTO CommandHistory VALUES (` + [0, generatedCommandsHistory[0].productId, generatedCommandsHistory[0].price,generatedCommandsHistory[0].quantity, generatedCommandsHistory[0].total].join(",")+ `)` + ";",
        `INSERT INTO Payement VALUES (` + [0, generatedPayements[0].userId,'"' + generatedPayements[0].cardNumber + '"','"' + generatedPayements[0].iban + '"'].join(",")+ `)` + ";",
        `INSERT INTO Photo VALUES (` + [0, generatedPhotos[0].userId, generatedPhotos[0].productId,'"' + generatedPhotos[0].photoBlob + '"'].join(",")+ `)` + ";",
        `INSERT INTO Rate VALUES (` + [0,generatedRatings[0].productId, generatedRatings[0].userId,generatedRatings[0].rating].join(",")+ `)` + ";",
        `INSERT INTO Invoice VALUES (` + [0,generatedInvoices[0].invoiceUserId,'"' + generatedInvoices[0].invoiceDate + '"',generatedInvoices[0].invoicePayementId,'"' + generatedInvoices[0].total+ '"', generatedInvoices[0].addressId, generatedInvoices[0].historyId].join(",")+ `)` + ";"
      ]
    // INSERT INTO Address VALUES (1000,59,'0625 Aliya Crossing','Belleville','67052','Portugal','Europe');
    
      writeStr(tables[j])






    // writeStr(`INSERT INTO User VALUES (` + [0,'"' + generatedUsers[0].firstName + '"','"' + generatedUsers[0].lastName + '"','"' + generatedUsers[0].email + '"','"' + generatedUsers[0].phone + '"'].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Product VALUES (` + [0,'"' + generatedProducts[0].name + '"', generatedProducts[0].price, generatedProducts[0].quantity,generatedProducts[0].suppliers,'"' + generatedProducts[0].category + '"'].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Address VALUES (` + [0, generatedAddresses[0].userId ,'"' + generatedAddresses[0].userAddress + '"', '"' + generatedAddresses[0].city + '"','"' +  generatedAddresses[0].postalCode + '"' ,'"' + generatedAddresses[0].country + '"', '"' + generatedAddresses[0].continent + '"'].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Cart VALUES (` + [0, generatedCarts[0].userId ,'"' + generatedCarts[0].totalPrice + '"'].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Command VALUES (` + [0, generatedCommands[0].productId,'"' + generatedCommands[0].price + '"', generatedCommands[0].quantity,'"' + generatedCommands[0].total+ '"', generatedCommands[0].commandCartId].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO CommandHistory VALUES (` + [0, generatedCommandsHistory[0].productId,'"' +  generatedCommandsHistory[0].price+ '"',generatedCommandsHistory[0].quantity,'"' +  generatedCommandsHistory[0].total+ '"'].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Payement VALUES (` + [0, generatedPayements[0].userId,'"' + generatedPayements[0].cardNumber + '"','"' + generatedPayements[0].iban + '"'].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Photo VALUES (` + [0, generatedPhotos[0].userId, generatedPhotos[0].productId,'"' + generatedPhotos[0].photoBlob + '"'].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Rate VALUES (` + [0,generatedRatings[0].productId, generatedRatings[0].userId,generatedRatings[0].rating].join(",")+ `)` + ";");

    // writeStr(`INSERT INTO Invoice VALUES (` + [0,generatedInvoices[0].invoiceUserId,'"' + generatedInvoices[0].invoiceDate + '"',generatedInvoices[0].invoicePayementId,'"' + generatedInvoices[0].total+ '"', generatedInvoices[0].addressId, generatedInvoices[0].historyId].join(",")+ `)` + ";");
} //END FOR  

console.log(`Tables updated!`);

}   
}




insertDataToDB(1000)


// console.log(Date.now() + Math.random())


// function randomDate(start, end, startHour, endHour) {
//   var date = new Date(+start + Math.random() * (end - start));
//   var hour = startHour + Math.random() * (endHour - startHour) | 0;
//   date.setHours(hour);
//   return date;
// }

// display(randomDate('2014-01-01','2020-01-01'))