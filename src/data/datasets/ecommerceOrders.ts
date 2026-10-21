import { DatasetDefinition } from '../../types/lesson';

export const ecommerceOrdersDataset: DatasetDefinition = {
  id: 'ecommerce-orders',
  tableName: 'CustomerOrders',
  description: 'Online store customer orders across categories with discount rates and order values.',
  schemaDDL: `
    CREATE TABLE CustomerOrders (
      order_id INTEGER PRIMARY KEY,
      customer_tier TEXT NOT NULL,
      item_category TEXT NOT NULL,
      gross_amount REAL NOT NULL,
      discount_pct REAL NOT NULL,
      status TEXT NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO CustomerOrders (order_id, customer_tier, item_category, gross_amount, discount_pct, status) VALUES
      (201, 'Gold', 'Electronics', 450.00, 0.15, 'Delivered'),
      (202, 'Silver', 'Apparel', 120.00, 0.05, 'Delivered'),
      (203, 'Gold', 'Home', 280.00, 0.10, 'Processing'),
      (204, 'Bronze', 'Electronics', 60.00, 0.00, 'Delivered'),
      (205, 'Gold', 'Apparel', 310.00, 0.15, 'Delivered'),
      (206, 'Silver', 'Home', 190.00, 0.05, 'Delivered'),
      (207, 'Bronze', 'Books', 45.00, 0.00, 'Cancelled'),
      (208, 'Gold', 'Electronics', 820.00, 0.20, 'Delivered');
  `,
  sampleColumns: ['order_id', 'customer_tier', 'item_category', 'gross_amount', 'discount_pct', 'status'],
  sampleRows: [
    [201, 'Gold', 'Electronics', 450.00, 0.15, 'Delivered'],
    [202, 'Silver', 'Apparel', 120.00, 0.05, 'Delivered'],
    [203, 'Gold', 'Home', 280.00, 0.10, 'Processing'],
    [204, 'Bronze', 'Electronics', 60.00, 0.00, 'Delivered'],
    [205, 'Gold', 'Apparel', 310.00, 0.15, 'Delivered'],
    [206, 'Silver', 'Home', 190.00, 0.05, 'Delivered'],
    [207, 'Bronze', 'Books', 45.00, 0.00, 'Cancelled'],
    [208, 'Gold', 'Electronics', 820.00, 0.20, 'Delivered'],
  ],
};
