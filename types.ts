
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  coords: [number, number];
  type: 'Residential' | 'Commercial' | 'Industrial';
  status: 'Available' | 'Sold' | 'Pending';
  beds?: number;
  baths?: number;
  sqft: number;
  image: string;
  assignedBrokerId?: string;
}

export interface Broker {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  activeProperties: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  type: 'Buyer' | 'Seller' | 'Tenant';
  assignedBrokerId?: string;
  lastInteraction: string;
}

export interface Job {
  id: string;
  title: string;
  propertyId: string;
  date: string;
  type: 'Showing' | 'Inspection' | 'Closing' | 'Maintenance';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}
