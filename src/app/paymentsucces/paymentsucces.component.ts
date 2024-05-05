import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from '../ServiceProduct/product.service';
import { AuthService } from '../Service/auth.service';
import { UserModule } from '../Models/user.module';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-paymentsucces',
  templateUrl: './paymentsucces.component.html',
  styleUrls: ['./paymentsucces.component.css']
})
export class PaymentsuccesComponent implements OnInit {
  idUser: number ; 
  user : UserModule;
  email = sessionStorage.getItem('email');
  constructor(private http: HttpClient ,private productService: ProductService,  private authService: AuthService){}

  sendmail( ){
     let Subject="paymentsucces";
     let  Object="aaaaa";
     this.http.post(`http://localhost:8081/sendmail/${this.email}/${Subject}/${Object}`,null ).subscribe(r=>{
      console.log(r);
     })
  }
  ngOnInit(): void {
    this.authService.getUserInfoFromToken().subscribe(
      (response: UserModule) => {
      this.user = response;
      this.idUser=this.user.idUser;
    
   // this.sendmail();
  }
);
  }

 
  downloadInvoicePdf() {


    this.productService.getInvoiceDetails(this.idUser).subscribe(
      (data: any) => {
        // Générer le PDF avec les données récupérées
        this.generatePdf(data);
      },
      error => {
        console.error(error);
        // Gérer les erreurs
      }
    );
  }

  generatePdf(invoiceData: any) {
    const doc = new jsPDF();
    const startX = 10;
    let startY = 50;
  
    // Ajouter un fond gris
    doc.setFillColor(240, 240, 240); // Couleur gris clair
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // Rectangle rempli
  
    // Ajouter le titre
    doc.setFontSize(24);
    doc.setTextColor("#88B04B"); // Couleur verte
    doc.text('Vitanova', 105, 15, null, null);
  
    // Ajouter la date
    doc.setFontSize(12);
    doc.setTextColor("#404F5E"); // Couleur gris foncé
    doc.text(`Date: ${invoiceData.date}`, startX, startY);
  
    // Ajouter l'en-tête du tableau
    startY += 20;
    doc.setFontSize(14);
    doc.setTextColor("#000000"); // Couleur noire
    doc.setFont("helvetica", "bold"); // Police en gras
    doc.text('Product', startX, startY);
    doc.text('Price ($)', startX + 60, startY);
    doc.text('Quantity', startX + 110, startY);
    doc.text('Total ($)', startX + 160, startY);
  
    // Ajouter les lignes du tableau
    startY += 10;
    invoiceData.products.forEach((product: any) => {
      doc.setFontSize(12);
      doc.setTextColor("#404F5E"); // Couleur gris foncé
      doc.setFont("helvetica", "normal"); // Police normale
  
      doc.text(product.name, startX, startY);
      doc.text(`${product.price}`, startX + 60, startY);
      doc.text(`${product.quantity}`, startX + 110, startY);
      doc.text(`${product.price * product.quantity}`, startX + 160, startY);
  
      startY += 10;
    });
  
    // Ajouter le prix total
    doc.setFontSize(14);
    doc.setTextColor("#000000"); // Couleur noire
    doc.setFont("helvetica", "bold"); // Police en gras
    doc.text(`Total Price: ${invoiceData.totalPrice}$`, startX, startY + 10);
  
    // Sauvegarder le PDF
    doc.save('invoice.pdf');
  }
  
  
  

}
