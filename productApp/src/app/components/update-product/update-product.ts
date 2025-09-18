import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct implements OnInit {
  productForm: FormGroup;
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      units: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.productService.getProducts().subscribe(products => {
      const product = products.find((p: { _id: string; }) => p._id === this.productId);
      if (product) this.productForm.patchValue(product);
    });
  }

  submit() {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value)
        .subscribe(() => this.router.navigate(['/products']));
    }
  }
}