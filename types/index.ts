export interface CreateEventRequest {
  userId: String;
  name: string;
  date: Date;
  description: string;
  address: string;
  cityState: string;
  latitude: number;
  longitude: number;
}
