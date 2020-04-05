import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  public allProducts: any;
  public count = 0;
  public productAddedTocart = [];
  public totalCost = 0;
  public totalQuantity = 0;

  ngOnInit() {
    localStorage.removeItem('product');
    const self = this;
    fetch('src/app/my-cart/product.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        self.appendData(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  appendData(data) {
    this.allProducts = data;
    console.log(this.allProducts)
  }

  addCart(product) {
    this.productAddedTocart = JSON.parse(localStorage.getItem('product'));
    if (this.productAddedTocart == null) {
      this.productAddedTocart = [];
      product.count++;
      this.productAddedTocart.push(product);
      localStorage.setItem('product', JSON.stringify(this.productAddedTocart));

    }
    else {
      let tempProduct = this.productAddedTocart.find(p => p.id == product.id);
      if (tempProduct == null) {
        product.count++;
        this.productAddedTocart.push(product);
        console.log(this.productAddedTocart, '+++++++++++')
        localStorage.setItem('product', JSON.stringify(this.productAddedTocart));
      }
      else {
        this.productAddedTocart = JSON.parse(localStorage.getItem('product'));
        product.count++;
        this.productAddedTocart.find(p => p.id == product.id).count + 1;
        console.log(this.productAddedTocart.find(p => p.id == product.id).count++);
        localStorage.setItem("product", JSON.stringify(this.productAddedTocart));
      }
    }
    this.calculateTotalCost(this.productAddedTocart);
  }

  onAddQuantity(product) {
    this.productAddedTocart = JSON.parse(localStorage.getItem('product'));
    const index = this.productAddedTocart.indexOf(p => p.id == product.id) + 1;
    console.log(index);
    this.productAddedTocart[index].count++;
    localStorage.setItem("product", JSON.stringify(this.productAddedTocart));

  }
  onRemoveQuantity(product) {
    this.productAddedTocart = JSON.parse(localStorage.getItem('product' || ''));
    if (this.productAddedTocart.length > 0) {
      const found = this.productAddedTocart.find(p => p.id == product.id).count;
      if (found === 0) {
        console.log('zero');
      }
      if (found === 1) {
        product.count--;
        var delArray = this.productAddedTocart.filter(p => p.id != product.id);
        console.log(delArray);
        this.productAddedTocart = delArray;
        localStorage.setItem("product", JSON.stringify(this.productAddedTocart));
      }
      if (found > 1) {
        product.count--;
        this.productAddedTocart.find(p => p.id == product.id).count--;
        localStorage.setItem("product", JSON.stringify(this.productAddedTocart));
      }
      this.calculateTotalCost(this.productAddedTocart);
    }
  }

  calculateTotalCost(allItems) {
    let total = 0;
    let totalQuantity = 0;
    for (let i in allItems) {
      total = total + (allItems[i].count * allItems[i].discount_mrp);
      totalQuantity = totalQuantity + allItems[i].count;
    }
    this.totalCost = total;
    this.totalQuantity = totalQuantity;
    console.log(this.totalCost, totalQuantity);

  }

  openModal() {
    let dialogRef = this.dialog.open(CheckoutComponent, {
      height: '200px',
      width: '50%',
      data: { totalCost: this.totalCost, totalQuantity: this.totalQuantity }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      localStorage.removeItem('product');
      this.productAddedTocart = [];
      this.allProducts.forEach(element => {
        element.count = 0;
      });
      this.totalCost = 0;
      this.totalQuantity = 0;
    });

  }
}

