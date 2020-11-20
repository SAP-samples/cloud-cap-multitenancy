namespace my.bookshop;
using { User, Country, managed } from '@sap/cds/common';

entity Books {
  key ID : Integer;
  title  : localized String;
  author : Association to Authors;
  stock  : Integer;
}

entity Authors {
  key ID : Integer;
  name   : String;
  books  : Association to many Books on books.author = $self;
}

entity Orders : managed {
  key ID    : UUID;
  book      : Association to Books;
  country   : Country;
  sold_on   : Date;
  quantity  : Integer;
  Price_USD : Double;
  state     : Association to States;
}

@cds.persistence.exists
entity Currencies {
  key code : String(3);
  name     : String(128);
  UperUSD  : Double;
  USDperU  : Double;
}

@cds.persistence.exists
entity States {
  key code : String(2);
  abbrev   : String(6);
  name     : String(24);
}

// entity OrdersWithState as projection on Orders {
//   Orders.ID as ID, 
//   Orders.book.title as Title, 
//   Orders.quantity as Quantity, 
//   Orders.sold_on as Sold_On,
//   Orders.Price_USD as Price_USD,
//   Orders.state.name as State
// } 

@cds.persistence.exists
entity Orders_View {
  key ID     : Integer;
  title      : String(5000);
  quantity   : Integer;
  sold_on    : Date;
  state_code : String(2);
  price_USD  : Double;
  total_USD  : Double;
  total_EUR  : Double;
  total_VES  : Double;
  total_GLD  : Double;
}

// entity OrdersInGLD     as
//   select from Orders_View
//   join States
//     on Orders_View.state_code = States.code
//   {
//     Orders_View.ID        as ID,
//     Orders_View.title     as Title,
//     Orders_View.quantity  as Quantity,
//     Orders_View.sold_on   as Sold_On,
//     Orders_View.total_GLD as Price_GLD,
//     States.name           as State
//   }
//   order by
//     Orders_View.sold_on asc;

entity config {
  key name : String(12);
  value    : String(24);
}