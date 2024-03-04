import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = new Product();
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
 
  @ViewChild('productForm') productForm!: NgForm;
  constructor(private productService: ProductService, private router: Router) {}

 addProduct(): void {
  if (this.productForm.valid) { // Vérifie si le formulaire est valide
    const formData = new FormData();
    formData.append('NamePr', this.product.namePr);
    formData.append('categoriePr', this.product.categoriePr);
    formData.append('PricePr', this.product.pricePr.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.addProduct(formData)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/showProduct']);

         
        },
        error => {
          console.error(error);
        }
      );
  } else {
    console.error('Le formulaire n\'est pas valide.'); // Affiche une erreur si le formulaire n'est pas valide
  }
}


onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    // Lecture du contenu de l'image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result; // L'image est maintenant disponible sous forme d'URL base64
    };
    reader.readAsDataURL(file);
  }
}

  
}

 
  


