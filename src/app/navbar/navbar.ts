import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;
declare const Swal: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit {
  cart_list: {
    img: string;
    name: string;
    qty: number;
    price: number;
    total?: number;
  }[] = [];

  ngOnInit() {
    this.loadCart();

    
    window.addEventListener('cartUpdated', () => this.loadCart());
  }

  loadCart() {
    this.cart_list = JSON.parse(localStorage.getItem('cart_list') ?? '[]');
  }

  openCartModal() {
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
  }

  increaseQty(index: number) {
    this.cart_list[index].qty++;
    this.updateCart();
  }

  decreaseQty(index: number) {
    if (this.cart_list[index].qty > 1) {
      this.cart_list[index].qty--;
    }
    this.updateCart();
  }

  removeItem(index: number) {
    this.cart_list.splice(index, 1);
    this.updateCart();
  }

  getGrandTotalUSD(): number {
    return this.cart_list.reduce((sum, item) => sum + item.qty * item.price, 0);
  }

  getGrandTotalKHR(): number {
    const rate = 4100;
    return this.getGrandTotalUSD() * rate;
  }

  updateCart() {
    localStorage.setItem('cart_list', JSON.stringify(this.cart_list));
    window.dispatchEvent(new Event('cartUpdated'));
  }

  checkout() {
    const modalEl = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();

    Swal.fire({
      title: 'Order confirmed!',
      text: 'Your cart has been checked out.',
      icon: 'success',
      confirmButtonText: 'Great!',
      backdrop: true,
      allowOutsideClick: false,
    });

    this.cart_list = [];
    this.updateCart();
  }
}
