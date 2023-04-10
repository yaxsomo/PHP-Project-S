//Classes for all tables


class Users{
	constructor(userId,firstName,lastName,email,phone,password,role){
    	this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
    }
}


class Product{
	constructor(productId,name,price,quantity,suppliers,category){
    	this.productId = productId;
        this.name = name;
        this.price = price
        this.quantity = quantity;
        this.suppliers = suppliers;
        this.category = category;
    }
}


class Address{
	constructor(addressId, userId,userAddress,city,postalCode,country, continent){
    	this.addressId = addressId;
        this.userId = userId;
        this.userAddress = userAddress;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.continent = continent;
    }
}



class Cart{
	constructor(cartId,userId,totalPrice){
        this.cartId = cartId;
        this.userId = userId;
        this.totalPrice = totalPrice;
    }
}

class Command{
	constructor(commandId,productId,price,quantity,total,commandCartId){
        this.commandId = commandId;
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.total = total;
        this.commandCartId = commandCartId;
    }
}

class CommandHistory{
	constructor(historyId,productId,price,quantity,total){
        this.historyId = historyId;
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.total = total;
    }
}

class Payement{
	constructor(payementId,userId,cardNumber,iban){
        this.payementId = payementId;
        this.userId = userId;
        this.cardNumber = cardNumber;
        this.iban = iban;
    }
}

class Photo{
	constructor(phototId,userId,productId,photoBlob){
        this.phototId = phototId;
        this.userId = userId;
        this.productId = productId;
        this.photoBlob = photoBlob;
    }
}

class Rate{
	constructor(rateId,productId,userId,rating){
        this.rateId = rateId;
        this.productId = productId;
        this.userId = userId;
        this.rating = rating;
    }
}

class Invoice{
	constructor(invoiceId,invoiceUserId,invoiceDate,invoicePayementId, total, addressId,historyId){
        this.invoiceId = invoiceId;
        this.invoiceUserId = invoiceUserId;
        this.invoiceDate = invoiceDate;
        this.invoicePayementId = invoicePayementId;
        this.total = total;
        this.addressId = addressId;
        this.historyId = historyId;
    }
}

//METHODS

function display(element) {
    console.log(element)
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


module.exports = {Users,Product,Address,Cart,Command,CommandHistory,Payement,Photo,Rate,Invoice,display, getRandomFloat, randomNumber}