(function(){
  'use strict';

var app = angular.module('ShoppingListCheckOff',[])
app.controller('AddItemToBuyController',AddItemToBuyController);
app.controller('ToBuyController',ToBuyController);
app.controller('AlreadyBoughtController',AlreadyBoughtController);
app.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

AddItemToBuyController.$inject=['ShoppingListCheckOffService'];
function AddItemToBuyController(ShoppingListCheckOffService){
  var addItem = this;

  ShoppingListCheckOffService.addItemToBuy('Cookies',10);
  ShoppingListCheckOffService.addItemToBuy('Sugary Drinks',2);
  ShoppingListCheckOffService.addItemToBuy('choclate',20);
  ShoppingListCheckOffService.addItemToBuy('Pepto Bismol',10);
  ShoppingListCheckOffService.addItemToBuy('Chips',8);
  ShoppingListCheckOffService.addItemToBuy('Ice cream',3);
  ShoppingListCheckOffService.addItemToBuy('Tomatoes',5);
  ShoppingListCheckOffService.addItemToBuy('Corn',1);
  ShoppingListCheckOffService.addItemToBuy('Apple',6);
  ShoppingListCheckOffService.addItemToBuy('Bananas',6);
  ShoppingListCheckOffService.addItemToBuy('Bread',6);
  ShoppingListCheckOffService.addItemToBuy('Milk',1);
  ShoppingListCheckOffService.addItemToBuy('Eggs',7);
  ShoppingListCheckOffService.addItemToBuy('Mustard',4);

  addItem.addItemToBuy=function(){
    ShoppingListCheckOffService.addItemToBuy(addItem.itemName, addItem.itemQuantity);

  };

  addItem.validateItemNameField = function(){
    if((addItem.itemName === undefined) || (addItem.itemName ==="") ){
      addItem.itemNameClass="has-error";
    }else{
      addItem.itemNameClass="has-success";
    }
  };

  addItem.validateItemQuantityField = function(){
    if((addItem.itemQuantity === undefined) || (addItem.itemQuantity ==="") ){
      addItem.itemQtyClass="has-error";
    }else{
      addItem.itemQtyClass="has-success";
    }
  };

};

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  toBuy.addItemFromToBuyToBought=function(index){
    ShoppingListCheckOffService.addItemFromToBuyToBought(index);
  };

 toBuy.addAllItemFromToBuyToBought=function(){
   ShoppingListCheckOffService.addAllItemFromToBuyToBought();
 };
};
AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.getToBoughtItems();

  alreadyBought.removeItemFromBought=function(index){
    ShoppingListCheckOffService.removeItemFromBought(index);
  };
  alreadyBought.removeAllItemFromBought=function(){
    ShoppingListCheckOffService.removeAllItemFromBought();
  };
};

function ShoppingListCheckOffService(){
  var service = this;

  var toBuy=[];
  var bought=[];

  service.getToBuyItems=function(){
    return toBuy;
  };
  service.getToBoughtItems=function(){
      return bought;
  };
  service.addItemToBuy=function(item, quantity){
    toBuy.push({
      name : item,
      quantity : quantity
    });
  };
  service.addItemFromToBuyToBought=function($index){
    var item = toBuy[$index];
    bought.push(item);
    toBuy.splice($index,1);
  };

  service.removeItemFromBought=function($index){
    var item = bought[$index];
    toBuy.push(item);
    bought.splice($index,1);
  };
 service.addAllItemFromToBuyToBought=function(){

   service.appendOrCopyArrayToArray(toBuy, bought);
   toBuy.splice(0,toBuy.length);
 };

 service.removeAllItemFromBought = function(){
   service.appendOrCopyArrayToArray(bought, toBuy);
   bought.splice(0,bought.length);
 };

service.appendOrCopyArrayToArray = function (fromArr, toArr){
  if(toArr.length === 0){
       angular.copy(fromArr, toArr);
  }else{
    angular.forEach(fromArr, function(item) {
        toArr.push(item);
      });
  }
};

};

})();
