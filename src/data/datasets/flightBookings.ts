import { DatasetDefinition } from '../../types/lesson';

export const flightBookingsDataset: DatasetDefinition = {
  id: 'flight-bookings-data',
  tableName: 'FlightBookings',
  description: 'Commercial airline booking records with seat classes and fare tiers.',
  schemaDDL: `
    CREATE TABLE FlightBookings (
      id INTEGER PRIMARY KEY,
      flight_number TEXT NOT NULL,
      passenger_name TEXT NOT NULL,
      seat_class TEXT NOT NULL,
      ticket_price REAL NOT NULL,
      status TEXT NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO FlightBookings (id, flight_number, passenger_name, seat_class, ticket_price, status) VALUES
      (1, 'AA-102', 'Elena Rostova', 'Economy', 220.00, 'Confirmed'),
      (2, 'AA-102', 'Marcus Vance', 'Business', 850.00, 'Confirmed'),
      (3, 'BA-404', 'Amira Khan', 'First', 1450.00, 'Confirmed'),
      (4, 'BA-404', 'Kenji Sato', 'Economy', 195.00, 'Cancelled'),
      (5, 'DL-880', 'Chloe Dupont', 'Business', 920.00, 'Confirmed'),
      (6, 'DL-880', 'Lucas Silva', 'Economy', 280.00, 'Pending'),
      (7, 'LH-310', 'Sophie Martin', 'First', 1600.00, 'Confirmed'),
      (8, 'LH-310', 'David Miller', 'Economy', 310.00, 'Confirmed');
  `,
  sampleColumns: ['id', 'flight_number', 'passenger_name', 'seat_class', 'ticket_price', 'status'],
  sampleRows: [
    [1, 'AA-102', 'Elena Rostova', 'Economy', 220.0, 'Confirmed'],
    [2, 'AA-102', 'Marcus Vance', 'Business', 850.0, 'Confirmed'],
    [3, 'BA-404', 'Amira Khan', 'First', 1450.0, 'Confirmed'],
    [4, 'BA-404', 'Kenji Sato', 'Economy', 195.0, 'Cancelled'],
    [5, 'DL-880', 'Chloe Dupont', 'Business', 920.0, 'Confirmed'],
    [6, 'DL-880', 'Lucas Silva', 'Economy', 280.0, 'Pending'],
    [7, 'LH-310', 'Sophie Martin', 'First', 1600.0, 'Confirmed'],
    [8, 'LH-310', 'David Miller', 'Economy', 310.0, 'Confirmed'],
  ],
};
