import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/ModelProduct/Product';
import { ProductService } from '../ServiceProduct/product.service';

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
  priceErrorMessage: string | null = null;
  quantityErrorMessage: string | null = null;

  @ViewChild('productForm') productForm!: NgForm;

  constructor(private productService: ProductService, private router: Router) {}

  addProduct(): void {
    // Vérifier si le prix et la quantité sont null ou non valides
    if (this.productForm.invalid) {
      // Afficher un message d'erreur
      console.log("Le formulaire n'est pas valide.");
      return; // Arrêter l'exécution de la méthode
    }

    // Vérifier si le prix est supérieur à zéro
    if (this.product.pricePr <= 0) {
      // Afficher un message d'erreur
      this.priceErrorMessage = "The price must be greater than zero.";
      return; // Arrêter l'exécution de la méthode
    } else {
      this.priceErrorMessage = null; // Effacer le message d'erreur
    }

    // Vérifier si la quantité est supérieure à zéro
    if (this.product.quantityPr <= 0) {
      // Afficher un message d'erreur
      this.quantityErrorMessage = "The quantity must be greater than zero.";
      return; // Arrêter l'exécution de la méthode
    } else {
      this.quantityErrorMessage = null; // Effacer le message d'erreur
    }

    // Le reste du code pour ajouter le produit reste inchangé
    const formData = new FormData();
    formData.append('namePr', this.product.namePr);
    formData.append('categoriePr', this.product.categoriePr);
    formData.append('pricePr', this.product.pricePr.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Ajouter les champs facultatifs s'ils existent
    if (this.product.descriptionPr) {
      formData.append('descriptionPr', this.product.descriptionPr);
    }
    formData.append('quantityPr', this.product.quantityPr.toString());

    if (this.product.statusPr) {
      formData.append('statusPr', this.product.statusPr);
    }

    // Appel du service pour ajouter le produit
    this.productService.addProduct(formData)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/showProduct']);
        },
        error => {
          console.error(error);
        }
      );
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
