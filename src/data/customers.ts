import { Customer } from '../models/customer';

export const customers: Customer[] = [
  {
    id: 'c1',
    name: 'Juan Perez',
    email: 'juan.perez@email.com',
    membership: 'gold',
    address: {
      street: 'Calle Falsa 123',
      city: 'Buenos Aires',
      state: 'BA',
      zipCode: '1000'
    },
    isActive: true
  },
  {
    id: 'c2',
    name: 'Ana Gomez',
    email: 'ana.gomez@email.com',
    membership: 'silver',
    address: {
      street: 'Av. Siempre Viva 742',
      city: 'Córdoba',
      state: 'CB',
      zipCode: '5000'
    },
    isActive: false
  },
  {
    id: 'c3',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    membership: 'bronze',
    address: {
      street: 'San Martín 456',
      city: 'Rosario',
      state: 'SF',
      zipCode: '2000'
    },
    isActive: true
  }
];
