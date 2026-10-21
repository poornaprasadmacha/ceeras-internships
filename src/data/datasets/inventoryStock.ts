import { DatasetDefinition } from '../../types/lesson';

export const inventoryStockDataset: DatasetDefinition = {
  id: 'inventory-stock',
  tableName: 'WarehouseStock',
  description: 'Logistics center inventory levels and unit prices for practicing UPDATE statements.',
  schemaDDL: `
    CREATE TABLE WarehouseStock (
      item_id INTEGER PRIMARY KEY,
      item_name TEXT NOT NULL,
      aisle_zone TEXT NOT NULL,
      stock_qty INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO WarehouseStock (item_id, item_name, aisle_zone, stock_qty, price) VALUES
      (10, 'Wireless Barcode Scanner', 'Zone-A', 45, 120.00),
      (20, 'Thermal Label Printer', 'Zone-B', 18, 240.00),
      (30, 'Industrial Packing Tape', 'Zone-A', 150, 4.50),
      (40, 'Digital Shipping Scale', 'Zone-C', 12, 85.00),
      (50, 'Heavy Duty Bubble Wrap', 'Zone-A', 80, 22.00);
  `,
  sampleColumns: ['item_id', 'item_name', 'aisle_zone', 'stock_qty', 'price'],
  sampleRows: [
    [10, 'Wireless Barcode Scanner', 'Zone-A', 45, 120.00],
    [20, 'Thermal Label Printer', 'Zone-B', 18, 240.00],
    [30, 'Industrial Packing Tape', 'Zone-A', 150, 4.50],
    [40, 'Digital Shipping Scale', 'Zone-C', 12, 85.00],
    [50, 'Heavy Duty Bubble Wrap', 'Zone-A', 80, 22.00],
  ],
};
