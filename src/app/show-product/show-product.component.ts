import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from 'src/app/ModelProduct/Product';
import { ProductService } from '../ServiceProduct/product.service';
import axios from 'axios';


@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  listeProduits: Product[] = [];
  searchTerm: string = ''; // Attribut pour stocker le terme de recherche
  searchResults: Product[] = [];
  filteredProducts: Product[] = [];
  categoryFilter: string = '';
  priceFilter: number | null = null;
  statusFilter: string = '';
 

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.categoryFilter = 'ALL'; // Initialiser la catégorie par défaut à "ALL"
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
              picturePr: this.productService.getImageUrl(product.picturePr),
              descriptionPr: product.descriptionPr,
              statusPr: product.statusPr,
              archivePr: false,
              quantityPr: product.quantityPr,
            }));
          console.log('Data retrieved from the service:', this.listeProduits);
        },
        (error) => {
          console.error('Error retrieving products:', error);
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
          this.showProducts();
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
  
  
  archiverProduct(productId: number): void {
    axios.put(`http://localhost:8082/Product/${productId}`)
      .then(response => {
        console.log('Produit archivé avec succès :', response.data);
         this.filterProducts(); 
      })
      .catch(error => {
        console.error('Erreur lors de l\'archivage du produit :', error);
      });
  }

// Méthode pour filtrer les produits en fonction des filtres de catégorie et de prix
filterProducts(): void {
  // Récupérer tous les produits depuis le service
  this.productService.showProducts().subscribe(
    (produits: Product[]) => {
      // Filtrer les produits pour ne garder que ceux qui ne sont pas archivés
      this.filteredProducts = produits.filter(product => product.archivePr === false);
      
      // Filtrer ensuite selon le prix et la catégorie si les filtres sont définis
      if (this.categoryFilter === 'ALL') {
        // Afficher tous les produits sans filtre de catégorie
        if (this.priceFilter !== null) {
          // Si un filtre de prix est défini, appliquer le filtre
          this.filteredProducts = this.filteredProducts.filter(product => {
            // Vérifier que product.pricePr et this.priceFilter ne sont pas null avant de comparer
            return product.pricePr !== null && product.pricePr <= this.priceFilter!;
          });
        }
      } else {
        // Filtrer par catégorie spécifiée
        if (this.priceFilter !== null || this.categoryFilter !== '') {
          // Appliquer les filtres de prix et de catégorie
          this.filteredProducts = this.filteredProducts.filter(product => {
            // Vérifier si le produit passe le filtre de prix
            let passPriceFilter = this.priceFilter === null || (product.pricePr !== null && product.pricePr <= this.priceFilter!);
            // Vérifier si le produit passe le filtre de catégorie
            let passCategoryFilter = this.categoryFilter === '' || product.categoriePr === this.categoryFilter;
            // Retourner vrai si le produit passe les deux filtres, faux sinon
            return passPriceFilter && passCategoryFilter;
          });
        }
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  );
}

// Méthode appelée lorsqu'une catégorie est sélectionnée
onCategoryChange(event: any): void {
  // Mettre à jour la valeur du filtre de catégorie
  this.categoryFilter = event.target.value;
  // Appeler la méthode de filtrage pour mettre à jour la liste des produits filtrés
  this.filterProducts();
}

// Méthode appelée lorsqu'un prix est sélectionné
onPriceChange(event: any): void {
  // Convertir la valeur du prix en nombre
  this.priceFilter = event.target.value !== '' ? parseFloat(event.target.value) : null;
  // Appeler la méthode de filtrage pour mettre à jour la liste des produits filtrés
  this.filterProducts();
}

 
}