import { DatasetDefinition } from '../../types/lesson';

export const libraryBooksDataset: DatasetDefinition = {
  id: 'library_books',
  tableName: 'LibraryBooks',
  description: 'A curated university library collection of science, nature, and fiction literature.',
  schemaDDL: `
    CREATE TABLE LibraryBooks (
      book_id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      published_year INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO LibraryBooks (book_id, title, category, published_year) VALUES
      (101, 'The Silent Orbit', 'Science', 2020),
      (102, 'Gardens of Tomorrow', 'Nature', 2022),
      (103, 'The Copper Lighthouse', 'Fiction', 2019),
      (104, 'Patterns of Discovery', 'Science', 2023),
      (105, 'Rivers and Roots', 'Nature', 2021);
  `,
  sampleColumns: ['book_id', 'title', 'category', 'published_year'],
  sampleRows: [
    [101, 'The Silent Orbit', 'Science', 2020],
    [102, 'Gardens of Tomorrow', 'Nature', 2022],
    [103, 'The Copper Lighthouse', 'Fiction', 2019],
    [104, 'Patterns of Discovery', 'Science', 2023],
    [105, 'Rivers and Roots', 'Nature', 2021],
  ],
};
