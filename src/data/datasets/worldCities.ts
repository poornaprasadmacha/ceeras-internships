import { DatasetDefinition } from '../../types/lesson';

export const worldCitiesDataset: DatasetDefinition = {
  id: 'world-cities',
  tableName: 'WorldCities',
  description: 'Major global metropolitan cities, continental locations, population metrics, and founding dates.',
  schemaDDL: `
    CREATE TABLE WorldCities (
      id INTEGER PRIMARY KEY,
      city_name TEXT NOT NULL,
      country TEXT NOT NULL,
      continent TEXT NOT NULL,
      population_millions REAL NOT NULL,
      founded_year INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO WorldCities (id, city_name, country, continent, population_millions, founded_year) VALUES
      (1, 'Tokyo', 'Japan', 'Asia', 37.4, 1603),
      (2, 'Delhi', 'India', 'Asia', 32.9, 1052),
      (3, 'Shanghai', 'China', 'Asia', 29.2, 1291),
      (4, 'Sao Paulo', 'Brazil', 'South America', 22.6, 1554),
      (5, 'Mexico City', 'Mexico', 'North America', 22.3, 1325),
      (6, 'Cairo', 'Egypt', 'Africa', 22.2, 969),
      (7, 'Osaka', 'Japan', 'Asia', 19.0, 1583),
      (8, 'New York', 'United States', 'North America', 18.9, 1624),
      (9, 'Buenos Aires', 'Argentina', 'South America', 15.5, 1536),
      (10, 'Istanbul', 'Turkey', 'Europe', 15.6, 660);
  `,
  sampleColumns: ['id', 'city_name', 'country', 'continent', 'population_millions', 'founded_year'],
  sampleRows: [
    [1, 'Tokyo', 'Japan', 'Asia', 37.4, 1603],
    [2, 'Delhi', 'India', 'Asia', 32.9, 1052],
    [3, 'Shanghai', 'China', 'Asia', 29.2, 1291],
    [4, 'Sao Paulo', 'Brazil', 'South America', 22.6, 1554],
    [5, 'Mexico City', 'Mexico', 'North America', 22.3, 1325],
    [6, 'Cairo', 'Egypt', 'Africa', 22.2, 969],
    [7, 'Osaka', 'Japan', 'Asia', 19.0, 1583],
    [8, 'New York', 'United States', 'North America', 18.9, 1624],
    [9, 'Buenos Aires', 'Argentina', 'South America', 15.5, 1536],
    [10, 'Istanbul', 'Turkey', 'Europe', 15.6, 660],
  ],
};
