import { DatasetDefinition } from '../../types/lesson';

export const fleetVehiclesDataset: DatasetDefinition = {
  id: 'fleet-vehicles',
  tableName: 'FleetVehicles',
  description: 'Rental fleet vehicles with tank capacities, fuel efficiency, and rates for calculating expressions.',
  schemaDDL: `
    CREATE TABLE FleetVehicles (
      vehicle_id INTEGER PRIMARY KEY,
      model_name TEXT NOT NULL,
      vehicle_type TEXT NOT NULL,
      tank_gallons REAL NOT NULL,
      miles_per_gallon REAL NOT NULL,
      daily_rate_dollars REAL NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO FleetVehicles (vehicle_id, model_name, vehicle_type, tank_gallons, miles_per_gallon, daily_rate_dollars) VALUES
      (1, 'Volt Cruiser', 'Sedan', 12.5, 38.0, 55.00),
      (2, 'Apex Hauler', 'Truck', 24.0, 18.5, 95.00),
      (3, 'Cascade Hybrid', 'SUV', 14.0, 42.0, 75.00),
      (4, 'Summit 4x4', 'SUV', 19.5, 21.0, 85.00),
      (5, 'Metro Spark', 'Compact', 9.5, 45.0, 42.00),
      (6, 'Atlas Cargo', 'Van', 26.0, 16.0, 110.00);
  `,
  sampleColumns: ['vehicle_id', 'model_name', 'vehicle_type', 'tank_gallons', 'miles_per_gallon', 'daily_rate_dollars'],
  sampleRows: [
    [1, 'Volt Cruiser', 'Sedan', 12.5, 38.0, 55.00],
    [2, 'Apex Hauler', 'Truck', 24.0, 18.5, 95.00],
    [3, 'Cascade Hybrid', 'SUV', 14.0, 42.0, 75.00],
    [4, 'Summit 4x4', 'SUV', 19.5, 21.0, 85.00],
    [5, 'Metro Spark', 'Compact', 9.5, 45.0, 42.00],
    [6, 'Atlas Cargo', 'Van', 26.0, 16.0, 110.00],
  ],
};
