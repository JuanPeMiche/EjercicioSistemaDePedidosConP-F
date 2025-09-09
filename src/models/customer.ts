export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface Customer{
    id: string;
    name: string;
    email: string;
    membership: 'bronze' | 'silver' | 'gold' | 'platinum';
    address: Address;
    isActive: boolean;
}