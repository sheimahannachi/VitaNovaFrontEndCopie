import { Component, HostListener } from '@angular/core';
import { Product } from 'src/app/ModelProduct/Product';
import { ProductService } from '../ServiceProduct/product.service';


@Component({
  selector: 'app-show-product-user',
  templateUrl: './show-product-user.component.html',
  styleUrls: ['./show-product-user.component.css']
})
export class ShowProductUserComponent {

  listeProduits: Product[] = [];
  searchTerm: string = '';
  isCardExpanded: boolean = false; // Variable pour suivre l'état d'agrandissement de la carte
  selectedProduct: Product | null = null;
  showCommentField: boolean = false;
  commentaire: string = '';

  

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.showProducts();
  }
  showProducts(): void {
    this.productService.showProducts()
      .subscribe(
        (products: any[]) => {
          this.listeProduits = products
            .filter(product => product.archivePr === false)
            .map(product => ({
              idPr: product.idPr, 
              namePr: product.namePr,
              pricePr: product.pricePr,
              categoriePr: product.categoriePr,
              picturePr: "http://localhost:80/aziz/" + product.picturePr,
              descriptionPr: product.descriptionPr,
              statusPr: product.statusPr,
              archivePr: false,
              quantityPr: product.quantityPr,
            }));
          console.log('Données récupérées du service:', this.listeProduits);
        },
        (error) => {
          console.error('Erreur lors de la récupération des produits :', error);
        }
      );
  }
  searchProducts(): void {
    if (this.searchTerm.trim() !== '') {
      this.productService.searchProductsByName(this.searchTerm).subscribe(
        (products: any[]) => {
          this.listeProduits = products
            .filter(product => product.archivePr === false)
            .map(product => ({
              idPr: product.idPr, 
              namePr: product.namePr,
              pricePr: product.pricePr,
              categoriePr: product.categoriePr,
              picturePr: this.productService.getImageUrl(product.picturePr),
              descriptionPr: product.descriptionPr,
              statusPr: product.statusPr,
              archivePr: false,
              quantityPr: product.quantityPr,
            }));
          console.log('Résultats de la recherche :', this.listeProduits);
        },
        (error) => {
          console.error('Erreur lors de la recherche de produits :', error);
        }
      );
    } else {
      // Si le terme de recherche est vide, afficher tous les produits
      this.showProducts();
    }
  }
  expandCard(product: Product): void {
    this.selectedProduct = product;
    this.isCardExpanded = false;
  }

  closeExpandedCard(): void {
   this.selectedProduct = null;
      this.isCardExpanded = true;
      this.commentaire = ''; // Réinitialiser le champ de commentaire lorsque la carte est réduite
  }


  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const isExpandedCard = clickedElement.closest('.expanded-card');
    if (!isExpandedCard && this.isCardExpanded) {
      // Si l'élément cliqué n'est pas à l'intérieur de la carte agrandie et que la carte est agrandie
      // alors réduire la carte agrandie
      this.closeExpandedCard();
    }
  }
  
  
 
}