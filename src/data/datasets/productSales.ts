import { DatasetDefinition } from '../../types/lesson';

export const productSalesDataset: DatasetDefinition = {
  id: 'product-sales',
  tableName: 'ProductSales',
  description: 'Retail hardware and electronics sales transactions for calculating aggregate metrics.',
  schemaDDL: `
    CREATE TABLE ProductSales (
      order_id INTEGER PRIMARY KEY,
      product_name TEXT NOT NULL,
      category TEXT NOT NULL,
      unit_price REAL NOT NULL,
      units_sold INTEGER NOT NULL,
      region TEXT NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO ProductSales (order_id, product_name, category, unit_price, units_sold, region) VALUES
      (501, 'Mechanical Keyboard', 'Peripherals', 89.99, 14, 'North America'),
      (502, '4K Ultra Monitor', 'Displays', 349.50, 6, 'Europe'),
      (503, 'Wireless Ergonomic Mouse', 'Peripherals', 49.99, 25, 'North America'),
      (504, 'Noise Cancelling Headset', 'Audio', 179.00, 11, 'Asia'),
      (505, 'USB-C Docking Station', 'Peripherals', 119.99, 18, 'Europe'),
      (506, 'Curved Gaming Monitor', 'Displays', 429.00, 4, 'North America'),
      (507, 'Studio Microphone', 'Audio', 129.50, 9, 'Europe'),
      (508, 'Webcam 1080p Pro', 'Peripherals', 69.99, 30, 'Asia');
  `,
  sampleColumns: ['order_id', 'product_name', 'category', 'unit_price', 'units_sold', 'region'],
  sampleRows: [
    [501, 'Mechanical Keyboard', 'Peripherals', 89.99, 14, 'North America'],
    [502, '4K Ultra Monitor', 'Displays', 349.50, 6, 'Europe'],
    [503, 'Wireless Ergonomic Mouse', 'Peripherals', 49.99, 25, 'North America'],
    [504, 'Noise Cancelling Headset', 'Audio', 179.00, 11, 'Asia'],
    [505, 'USB-C Docking Station', 'Peripherals', 119.99, 18, 'Europe'],
    [506, 'Curved Gaming Monitor', 'Displays', 429.00, 4, 'North America'],
    [507, 'Studio Microphone', 'Audio', 129.50, 9, 'Europe'],
    [508, 'Webcam 1080p Pro', 'Peripherals', 69.99, 30, 'Asia'],
  ],
};
