export enum ServiceCategory {
  LAUNDRY = 'Laundry',
  SALON = 'Salon & Beauty',
  FOOD = 'Food & Tiffin',
  PHARMACY = 'Pharmacy',
  GROCERY = 'Grocery',
  REPAIR = 'Repair Services',
  PRINTING = 'Printing & Stationery',
  CLEANING = 'Cleaning',
}

export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export type PageView =
  | 'home'
  | 'explore'
  | 'details'
  | 'booking'
  | 'confirmation'
  | 'bookings'
  | 'profile';

export interface ServiceOffering {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export interface Review {
  id: string;
  studentName: string;
  hostel: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  image: string;
  location: string;
  landmark: string;
  distanceMeters: number;
  walkMinutes: number;
  startingPrice: number;
  priceUnit: string;
  rating: number;
  reviewCount: number;
  estimatedTime: string;
  availabilityHours: string;
  availableNow: boolean;
  doorstepService: boolean;
  contactPhone: string;
  popular: boolean;
  recommended: boolean;
  studentPerk: string;
  offerings: ServiceOffering[];
  reviews: Review[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  offeringName: string;
  date: string;
  time: string;
  studentName: string;
  phone: string;
  hostelLocation: string;
  instructions: string;
  estimatedPrice: number;
  status: BookingStatus;
  createdAt: string;
  reviewed?: boolean;
}

export interface StudentProfile {
  name: string;
  program: string;
  phone: string;
  hostelLocation: string;
}

export interface SupportTicket {
  id: string;
  topic: string;
  message: string;
  createdAt: string;
}
