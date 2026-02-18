import { Property, Broker, Client, Job } from "./types";

export const MOCK_BROKERS: Broker[] = [
  {
    id: "b1",
    name: "John Smith",
    email: "john.smith@test.com",
    phone: "+961 03 555 010",
    avatar: "https://i.pravatar.cc/150?u=john",
    activeProperties: 4,
    status: "Active",
  },
  {
    id: "b2",
    name: "Jane Doe",
    email: "jane.doe@test.com",
    phone: "+961 70 555 011",
    avatar: "https://i.pravatar.cc/150?u=jane",
    activeProperties: 2,
    status: "Active",
  },
  {
    id: "b3",
    name: "Robert Brown",
    email: "robert.b@test.com",
    phone: "+961 71 555 012",
    avatar: "https://i.pravatar.cc/150?u=robert",
    activeProperties: 0,
    status: "Inactive",
  },
  {
    id: "b4",
    name: "Emily Davis",
    email: "emily.d@test.com",
    phone: "+961 76 555 013",
    avatar: "https://i.pravatar.cc/150?u=emily",
    activeProperties: 8,
    status: "Active",
  },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Luxury Beirut Waterfront Penthouse",
    price: 2450000,
    location: "Zaitunay Bay, Beirut",
    coords: [33.9016, 35.4947],
    type: "Residential",
    status: "Available",
    beds: 4,
    baths: 5,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    assignedBrokerId: "b1",
  },
  {
    id: "p2",
    title: "Modern Jounieh Bay View Loft",
    price: 420000,
    location: "Sarba, Jounieh",
    coords: [33.9786, 35.6231],
    type: "Residential",
    status: "Available",
    beds: 2,
    baths: 2,
    sqft: 1600,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    assignedBrokerId: "b1",
  },
  {
    id: "p3",
    title: "Historic Byblos Old Souk Commercial",
    price: 890000,
    location: "Old Souk, Byblos",
    coords: [34.1224, 35.6482],
    type: "Commercial",
    status: "Pending",
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    assignedBrokerId: "b2",
  },
  {
    id: "p4",
    title: "Ashrafieh Heritage Mansion",
    price: 1800000,
    location: "Sursock, Ashrafieh",
    coords: [33.8932, 35.5178],
    type: "Residential",
    status: "Available",
    beds: 5,
    baths: 4,
    sqft: 5200,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800",
  },
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Alice Johnson",
    email: "alice.johnson@gmail.com",
    type: "Buyer",
    assignedBrokerId: "b1", // Assigned to John Smith
    lastInteraction: "2026-02-10",
  },
  {
    id: "c2",
    name: "Mark Williams",
    email: "mark.w@outlook.com",
    type: "Seller",
    assignedBrokerId: "b2", // Assigned to Jane Doe
    lastInteraction: "2026-02-12",
  },
  {
    id: "c3",
    name: "Sarah Davis",
    email: "sarah.d@live.com",
    type: "Tenant",
    assignedBrokerId: null, // Unassigned example
    lastInteraction: "2026-02-15",
  },
  {
    id: "c4",
    name: "James Wilson",
    email: "j.wilson@yahoo.com",
    type: "Buyer",
    assignedBrokerId: "b1",
    lastInteraction: "2026-02-18",
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    title: "Showing - Waterfront Penthouse",
    propertyId: "p1",
    date: "2024-06-01 11:00",
    type: "Showing",
    status: "Upcoming",
  },
  {
    id: "j2",
    title: "Byblos Property Appraisal",
    propertyId: "p3",
    date: "2024-06-03 15:30",
    type: "Inspection",
    status: "Upcoming",
  },
];
