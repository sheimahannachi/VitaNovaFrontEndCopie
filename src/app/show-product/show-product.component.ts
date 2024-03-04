import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  listeProduits: Product[] = [];
  searchTerm: string = ''; // Attribut pour stocker le terme de recherche
  searchResults: Product[] = [];
 

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
              picturePr: this.productService.getImageUrl(product.picturePr),
              archivePr: false,
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
              archivePr: false,
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
  
  
  archiverProduct(productId: number): void {
    axios.put(`http://localhost:8082/Product/${productId}`)
      .then(response => {
        console.log('Produit archivé avec succès :', response.data);
        this.showProducts();
      })
      .catch(error => {
        console.error('Erreur lors de l\'archivage du produit :', error);
      });
  }

 
  
}