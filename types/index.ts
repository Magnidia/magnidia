export interface CreateEventRequest {
  userId: number;
  name: string; 
  date: Date;
  description: string;
  address: string; 
  cityState: string; 
  latitude: number; 
  longitude: number; 
}