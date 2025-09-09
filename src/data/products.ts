export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const products: Product[] = [
  { id: 'p1', name: 'Notebook', category: 'electronics', price: 1200, stock: 10 },
  { id: 'p2', name: 'Mouse', category: 'electronics', price: 25, stock: 100 },
  { id: 'p3', name: 'Silla', category: 'furniture', price: 150, stock: 5 },
  { id: 'p4', name: 'Libro', category: 'books', price: 20, stock: 50 }
];
