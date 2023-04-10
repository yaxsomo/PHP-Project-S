CREATE TABLE User ( 
	UserId               INTEGER NOT NULL AUTO_INCREMENT,
	FirstName            VARCHAR(100) NOT NULL,
	LastName             VARCHAR(100) NOT NULL,
	Email                VARCHAR(50) NOT NULL,
	Phone                VARCHAR(25) NOT NULL,
	Pwd                  VARCHAR(25) NOT NULL,
	Role                 INTEGER NOT NULL    ,
	PRIMARY KEY (UserId)
 );

CREATE TABLE Address ( 
	AddressId            INTEGER NOT NULL AUTO_INCREMENT,
	UserId               INTEGER NOT NULL    ,
	UserAddress          VARCHAR(60) NOT NULL    ,
	City                 VARCHAR(30) NOT NULL    ,
	PostalCode           VARCHAR(10) NOT NULL    ,
	Country              CHAR(100) NOT NULL    ,
	Continent            CHAR(20) NOT NULL    ,
	PRIMARY KEY (AddressId),
	CONSTRAINT fk_userAddress FOREIGN KEY (UserId)  
  	REFERENCES User(UserId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE  
 );

CREATE TABLE Product ( 
	ProductId            INTEGER NOT NULL AUTO_INCREMENT,
	Name                 VARCHAR(100) NOT NULL    ,
	Price                FLOAT(10,2) NOT NULL    ,
	Quantity             INTEGER NOT NULL    ,
	Suppliers            VARCHAR(100) NOT NULL    ,
	Category             VARCHAR(30) NOT NULL    ,
	PRIMARY KEY (ProductId)
 );

CREATE TABLE Cart ( 
	CartId               INTEGER NOT NULL AUTO_INCREMENT,
	UserId               INTEGER NOT NULL    ,
	TotalPrice           FLOAT(10,2)     ,
	PRIMARY KEY (CartId),
	CONSTRAINT fk_userCart FOREIGN KEY (UserId)  
  	REFERENCES User(UserId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE    
 );

CREATE TABLE Command ( 
	CommandId            INTEGER NOT NULL AUTO_INCREMENT,
	ProductId            INTEGER     ,
	Price                FLOAT(10,2) NOT NULL    ,
	Quantity             INTEGER NOT NULL    ,
	Total                FLOAT(10,2) NOT NULL    ,
	CartId               INTEGER NOT NULL    ,
	PRIMARY KEY (CommandId),
	CONSTRAINT fk_productCommand FOREIGN KEY (ProductId)  
  	REFERENCES Product(ProductId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE ,
	CONSTRAINT fk_cartCommand FOREIGN KEY (CartId)  
  	REFERENCES Cart(CartId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE  
 );

CREATE TABLE CommandHistory ( 
	HistoryId            INTEGER NOT NULL AUTO_INCREMENT,
	ProductId            INTEGER     ,
	Price                FLOAT(10,2)     ,
	Quantity             INTEGER     ,
	Total                FLOAT(10,2)     ,
	PRIMARY KEY (HistoryId),
	CONSTRAINT fk_productCommandHistory FOREIGN KEY (ProductId)  
  	REFERENCES Product(ProductId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE 
 );

CREATE TABLE Payement ( 
	PayementId           INTEGER NOT NULL AUTO_INCREMENT,
	UserId               INTEGER NOT NULL    ,
	CardNumber           VARCHAR(30)     ,
	IBAN                 VARCHAR(34)     ,
	PRIMARY KEY (PayementId),
	CONSTRAINT fk_userPayement FOREIGN KEY (UserId)  
  	REFERENCES User(UserId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE 
 );

CREATE TABLE Photo ( 
	PhotoId              INTEGER NOT NULL AUTO_INCREMENT,
	UserId               INTEGER     ,
	ProductId            INTEGER     ,
	PhotoBlob            VARCHAR(100) NOT NULL    ,
	PRIMARY KEY (PhotoId),
	CONSTRAINT fk_productPhoto FOREIGN KEY (ProductId)  
  	REFERENCES Product(ProductId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE ,
	CONSTRAINT fk_userPhoto FOREIGN KEY (UserId)  
  	REFERENCES User(UserId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE     
 );

CREATE TABLE Rate ( 
	RateId               INTEGER NOT NULL AUTO_INCREMENT,
	ProductId            INTEGER NOT NULL    ,
	UserId               INTEGER NOT NULL    ,
	Rating               FLOAT(2,1)     ,
	PRIMARY KEY (RateId),
	CONSTRAINT fk_productRate FOREIGN KEY (ProductId)  
  	REFERENCES Product(ProductId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE ,
	CONSTRAINT fk_userRate FOREIGN KEY (UserId)  
  	REFERENCES User(UserId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE   
 );

CREATE TABLE Invoice ( 
	InvoiceId            INTEGER NOT NULL AUTO_INCREMENT,
	UserId               INTEGER NOT NULL    ,
	InvoiceDate          DATE NOT NULL    ,
	PayementId           INTEGER NOT NULL    ,
	Total                INTEGER NOT NULL    ,
	AddressId            INTEGER NOT NULL    ,
	HistoryId            INTEGER NOT NULL    ,
	PRIMARY KEY (InvoiceId),
	CONSTRAINT fk_userInvoice FOREIGN KEY (UserId)  
  	REFERENCES User(UserId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE ,
	CONSTRAINT fk_addressInvoice FOREIGN KEY (AddressId)  
  	REFERENCES Address(AddressId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE ,
	CONSTRAINT fk_commandHistoryInvoice FOREIGN KEY (HistoryId)  
  	REFERENCES CommandHistory(HistoryId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE ,
	CONSTRAINT fk_payementInvoice FOREIGN KEY (PayementId)  
  	REFERENCES Payement(PayementId)  
  	ON DELETE CASCADE  
  	ON UPDATE CASCADE
 );