import { DatasetDefinition } from '../../types/lesson';

export const dailyRevenueDataset: DatasetDefinition = {
  id: 'daily-revenue-data',
  tableName: 'DailyRevenue',
  description: 'Chronological sales log across store branches for running total and moving window calculations.',
  schemaDDL: `
    CREATE TABLE DailyRevenue (
      id INTEGER PRIMARY KEY,
      branch TEXT NOT NULL,
      sale_date TEXT NOT NULL,
      revenue INTEGER NOT NULL,
      orders_count INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO DailyRevenue (id, branch, sale_date, revenue, orders_count) VALUES
      (1, 'Downtown', '2024-03-01', 1200, 45),
      (2, 'Downtown', '2024-03-02', 1450, 52),
      (3, 'Downtown', '2024-03-03', 1100, 39),
      (4, 'Downtown', '2024-03-04', 1800, 64),
      (5, 'Uptown', '2024-03-01', 950, 31),
      (6, 'Uptown', '2024-03-02', 1050, 36),
      (7, 'Uptown', '2024-03-03', 890, 28),
      (8, 'Uptown', '2024-03-04', 1300, 48);
  `,
  sampleColumns: ['id', 'branch', 'sale_date', 'revenue', 'orders_count'],
  sampleRows: [
    [1, 'Downtown', '2024-03-01', 1200, 45],
    [2, 'Downtown', '2024-03-02', 1450, 52],
    [3, 'Downtown', '2024-03-03', 1100, 39],
    [4, 'Downtown', '2024-03-04', 1800, 64],
    [5, 'Uptown', '2024-03-01', 950, 31],
    [6, 'Uptown', '2024-03-02', 1050, 36],
    [7, 'Uptown', '2024-03-03', 890, 28],
    [8, 'Uptown', '2024-03-04', 1300, 48],
  ],
};
