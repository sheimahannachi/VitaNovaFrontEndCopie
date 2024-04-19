import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserBarcodeReader } from '@zxing/library';
import{ProductDetailsDialogComponent} from "./product-details-dialog/product-details-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
  private apiUrl = 'http://localhost:8081/RestController/lookup';



  private scanner: BrowserBarcodeReader;

  constructor(private http: HttpClient,private dialog: MatDialog) {
    this.scanner = new BrowserBarcodeReader();
  }

  scanBarcode(): Promise<string> {

    return this.scanner.decodeOnceFromVideoDevice(undefined, 'video').then(result => result.getText());
  }

  getProductDetailsFromScannedBarcode(): Promise<any> {
    return this.scanBarcode().then(barcode => {
      const url = `${this.apiUrl}?upc=${barcode}`;
      return this.http.get(url).toPromise().then(productDetails => {
        // Open the product details dialog and pass the fetched product details
        this.openProductDetailsPopup(productDetails);
        console.log(productDetails)
      });
    });
  }

  openProductDetailsPopup(productDetails: any): void {
    const product = productDetails.items[0]; // Assuming there is only one product in the response

    this.dialog.open(ProductDetailsDialogComponent, {
      width: '400px',
      data: product
    });
  }
}

