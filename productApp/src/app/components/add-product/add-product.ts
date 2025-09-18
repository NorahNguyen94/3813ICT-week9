import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product-service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})

export class AddProduct {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    units: 0
  };

  constructor( private productService: ProductService, private router: Router ) { }

  submit() {
    this.productService.addProduct(this.product).subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => alert(err.error?.error || 'Failed to add product')
    });
  }
}