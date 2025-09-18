import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product-service';
import { Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrls:[ './products.css']
})
export class Products implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  editProduct(id: string) {
    this.router.navigate(['/update-product', id]);
  }
}
