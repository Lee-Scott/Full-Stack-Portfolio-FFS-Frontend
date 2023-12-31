import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  cartItems: CartItem[] = [];

  // totalPrice: Subject<number> = new ReplaySubject<number>(); // if you wanted all the total updates to be replayed to a class instantiated later 

  // BehaviorSubject just gives the last value not a stream of all the totals
  // 0 is initial value 
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);



  constructor() {}

  ngOnInit() {}

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      // same as a for loops but lambda
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );

      // check if we found it
      alreadyExistsInCart = existingCartItem !== undefined;
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem!.quantity++; // ! asserts that existingCartItem is not undefined
    } else {
      // add item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  decrementQuantity(theCartItem: CartItem) {
   theCartItem.quantity--;

   if(theCartItem.quantity === 0){
    this.remove(theCartItem);
   }
   else {
    this.computeCartTotals();
   }

  }
  remove(theCartItem: CartItem) {
   // get index of item in the array
   const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

   // if found (!= -1), remove the item from the array at the given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotal=${subTotalPrice}`
      );
    }
    console.log(
      `totalPriceValue: ${totalPriceValue.toFixed(
        2
      )}, totalQuantityValue: ${totalQuantityValue}`
    );
    console.log('-------------');
  }
}
