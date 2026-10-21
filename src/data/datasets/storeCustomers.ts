import { DatasetDefinition } from '../../types/lesson';

export const storeCustomersDataset: DatasetDefinition = {
  id: 'store-customers-data',
  tableName: 'OnlineCustomers',
  description: 'Online and retail branch customer datasets for set theory operations.',
  schemaDDL: `
    CREATE TABLE OnlineCustomers (
      customer_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      city TEXT NOT NULL
    );

    CREATE TABLE RetailCustomers (
      customer_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      city TEXT NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO OnlineCustomers (customer_id, name, email, city) VALUES
      (1, 'Aria Stark', 'aria@winter.org', 'Seattle'),
      (2, 'Jon Snow', 'jon@wall.net', 'Denver'),
      (3, 'Samwell Tarly', 'sam@citadel.edu', 'Boston'),
      (4, 'Brienne Tarth', 'brienne@sapphire.com', 'Chicago'),
      (5, 'Tyrion Lannister', 'tyrion@casterly.com', 'New York');

    INSERT INTO RetailCustomers (customer_id, name, email, city) VALUES
      (101, 'Jon Snow', 'jon@wall.net', 'Denver'),
      (102, 'Sansa Stark', 'sansa@winter.org', 'Seattle'),
      (103, 'Brienne Tarth', 'brienne@sapphire.com', 'Chicago'),
      (104, 'Jaime Lannister', 'jaime@kings.org', 'Atlanta'),
      (105, 'Arya Underhill', 'arya@bravos.org', 'Austin');
  `,
  sampleColumns: ['customer_id', 'name', 'email', 'city'],
  sampleRows: [
    [1, 'Aria Stark', 'aria@winter.org', 'Seattle'],
    [2, 'Jon Snow', 'jon@wall.net', 'Denver'],
    [3, 'Samwell Tarly', 'sam@citadel.edu', 'Boston'],
    [4, 'Brienne Tarth', 'brienne@sapphire.com', 'Chicago'],
    [5, 'Tyrion Lannister', 'tyrion@casterly.com', 'New York'],
  ],
};
