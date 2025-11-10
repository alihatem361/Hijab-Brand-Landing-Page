// Cart Management System
// Handles all cart operations using localStorage

class CartManager {
  constructor() {
    this.cart = this.loadCart();
  }

  // Load cart from localStorage
  loadCart() {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCartCount();
  }

  // Add item to cart
  addItem(product) {
    const existingItem = this.cart.find(
      (item) =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size
    );

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.cart.push({
        id: product.id || Date.now(),
        title: product.title,
        price: product.price,
        image: product.image,
        color: product.color,
        size: product.size,
        quantity: product.quantity,
      });
    }

    this.saveCart();
    return true;
  }

  // Remove item from cart
  removeItem(index) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  // Update item quantity
  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeItem(index);
    } else {
      this.cart[index].quantity = quantity;
      this.saveCart();
    }
  }

  // Get cart items
  getItems() {
    return this.cart;
  }

  // Get total items count
  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Get total price
  getTotalPrice() {
    return this.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // Update cart count badges in header
  updateCartCount() {
    const count = this.getTotalItems();
    const badges = document.querySelectorAll(".cart-count");
    badges.forEach((badge) => {
      badge.textContent = count;
    });
  }
}

// Create global cart instance
const cartManager = new CartManager();

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  cartManager.updateCartCount();
});
