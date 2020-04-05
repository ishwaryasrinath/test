import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public quantity : any;
  public cost: any;
  public isData : boolean;
  constructor(public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data.totalQuantity>0){
      this.isData = true;
    this.quantity = this.data.totalQuantity;
    this.cost = this.data.totalCost;
    console.log(this.cost);
    }
  else
  this.isData = false;
    
  }

  removeAlert() {
    this.dialogRef.close();
  }

}
