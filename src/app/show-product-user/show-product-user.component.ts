  import { Component, HostListener } from '@angular/core';
  import { Product } from 'src/app/ModelProduct/Product';
  import { ProductService } from '../ServiceProduct/product.service';
  import { AuthService } from '../services/auth.service';
  import { LikeProductService } from '../ServiceProduct/LikeProductService ';
  import { Router } from '@angular/router';
import { CartService } from '../ServiceProduct/CarteService';
import { MatDialog } from '@angular/material/dialog';
import { SideBarBackComponent } from '../back-office/side-bar-back/side-bar-back.component';
import { Commandeline } from '../ModelProduct/Commandeline';
import { SidebarComponent } from '../sidebar/sidebar.component';




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
    idUser: number = 1; 
    commandelines: Commandeline[] = [];
    nombreLikes: number = 0;
    showDetails: boolean = false;
    numberOfCommandelines: number = 0;
    cartId: number = 3;
    showSidebar: boolean = false;

    constructor(private productService: ProductService , private authService: AuthService ,private router: Router, private cartService: CartService ,private dialog: MatDialog ) { 
   
    }

    
    ngOnInit(): void {
      this.showProducts();
      this.listenForLikeUpdates();
      this.fetchNumberOfCommandelines();
      this.fetchCommandelinesInCart();
      
    }
    
    showProducts(): void {
  // Appel du service pour récupérer la liste des produits
  this.productService.showProducts()
  .subscribe( //écouter les résultats d'une opération asynchrone, comme une requête HTTP vers un serveur. 
    // Succès : les produits ont été récupérés avec succès 
    (products: any[]) => {
      // Filtrer les produits pour exclure ceux qui sont archivés
      this.listeProduits = products
        .filter(product => product.archivePr === false)
        // Mapper les propriétés des produits pour les adapter au format attendu dans le composant / permet de manipuler facilement les données 
        .map(product => ({
          idPr: product.idPr, 
          namePr: product.namePr,
          pricePr: product.pricePr,
          categoriePr: product.categoriePr,
          // Récupérer l'URL de l'image à partir du service ProductService
          picturePr: this.productService.getImageUrl(product.picturePr),
          descriptionPr: product.descriptionPr,
          statusPr: product.statusPr,
          archivePr: false,
          quantityPr: product.quantityPr,
          likeCount: product.likeCount ,
        }));
              
            console.log('Données récupérées du service:', this.listeProduits);
          },
          (error) => {
            console.error('Erreur lors de la récupération des produits :', error);
          }
        );
    }
    addLikeToProduct(productId: number): void {
      this.productService.addLike(productId).subscribe(
        (response: any) => {
          console.log('Like ajouté avec succès !');
          const product = this.listeProduits.find(prod => prod.idPr === productId);
          if (product) {
            product.likeCount+= 1;
          }
        },
        error => {
          console.error('Erreur lors de l\'ajout du like :', error);
          // Handle error here
        }
      );
    }

  


    listenForLikeUpdates(): void {
      const eventSource = new EventSource('/likes');

      eventSource.onmessage = (event) => {
        this.nombreLikes = parseInt(event.data);
      };

      eventSource.onerror = (error) => {
        console.error('Erreur SSE : ', error);
      };
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
                likeCount: product.likeCount || 0
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
    private imageBaseUrl = 'http://192.168.174.134/uploads/';
    getImageUrl(imagePath: string): string {
      return this.imageBaseUrl + imagePath;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    addProductToCart(productId: number): void {
      // Check if the elderlyId is defined
      if (this.idUser !== undefined) {
        // Call the addProductToOrder method from the productService
        this.productService.addProductToCart(productId, this.idUser).subscribe(
          () => {
            console.log('Product added to order successfully');
          },
          (error) => {
            console.error('Error adding product to order: ', error);
          }
        );
      } else {
        console.error('Elderly ID is undefined');
      }
    }
    navigateToCart() {
      this.router.navigate(['/cart']);
    }
    
    
    fetchCommandelinesInCart(): void {
      const cartId = 3; // Replace with the actual cart ID
      this.cartService.getAllCommandelinesInCart(cartId).subscribe(
        commandelines => {
          this.commandelines = commandelines;
        },
        error => {
          console.error('Error fetching command lines:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
    
    fetchNumberOfCommandelines(): void {
      this.cartService.getNumberOfCommandelinesInCart(this.cartId).subscribe(
        count => {
          this.numberOfCommandelines = count;
        },
        error => {
          console.error('Error fetching number of command lines:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
    
    openCartDialog() {
      const dialogRef = this.dialog.open(SidebarComponent, {
        width: '600px', // Set the width as needed
        data: this.cartService ? this.cartService.getCartItems() : [] // Pass cart items from service (if used)
      });
    }

    openSideBar(){
this.showSidebar=!this.showSidebar;
 console.log(this.commandelines);

      
    }
    toggleSidebar(): void {
      this.showSidebar = !this.showSidebar;
    }
    
    deleteProduct(productId: string) {
      // Implement the logic to delete the product from the shopping cart
      console.log('Deleting product with ID:', productId);
      // Example logic: Find the product index and remove it from the commandelines array
      const index = this.commandelines.findIndex(commandeline => commandeline.product.idPr.toString() === productId);
      if (index !== -1) {
        this.commandelines.splice(index, 1);
      }
    }
    
    
  }
    /*
    expandCard(product: Product): void {
      this.selectedProduct = product;
      this.isCardExpanded = false;
    }

    closeExpandedCard(): void {
    this.selectedProduct = null;
        this.isCardExpanded = true;
      
    }


    onDocumentClick(event: MouseEvent): void {
      const clickedElement = event.target as HTMLElement;
      const isExpandedCard = clickedElement.closest('.expanded-card');
      if (!isExpandedCard && this.isCardExpanded) {
        // Si l'élément cliqué n'est pas à l'intérieur de la carte agrandie et que la carte est agrandie
        // alors réduire la carte agrandie
        this.closeExpandedCard();
      }*/
    
    
    
  
