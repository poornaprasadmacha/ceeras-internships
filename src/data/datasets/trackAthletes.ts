import { DatasetDefinition } from '../../types/lesson';

export const trackAthletesDataset: DatasetDefinition = {
  id: 'track-athletes-data',
  tableName: 'TrackAthletes',
  description: 'Athletic competition timings across event divisions for window ranking operations.',
  schemaDDL: `
    CREATE TABLE TrackAthletes (
      athlete_id INTEGER PRIMARY KEY,
      athlete_name TEXT NOT NULL,
      event_category TEXT NOT NULL,
      finish_time REAL NOT NULL,
      country_code TEXT NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO TrackAthletes (athlete_id, athlete_name, event_category, finish_time, country_code) VALUES
      (1, 'Noah Lyles', '100m Sprint', 9.83, 'USA'),
      (2, 'Kishane Thompson', '100m Sprint', 9.85, 'JAM'),
      (3, 'Fred Kerley', '100m Sprint', 9.88, 'USA'),
      (4, 'Akani Simbine', '100m Sprint', 9.90, 'RSA'),
      (5, 'Cole Hocker', '1500m Run', 211.2, 'USA'),
      (6, 'Josh Kerr', '1500m Run', 211.4, 'GBR'),
      (7, 'Yared Nuguse', '1500m Run', 211.8, 'USA'),
      (8, 'Jakob Ingebrigtsen', '1500m Run', 212.1, 'NOR');
  `,
  sampleColumns: ['athlete_id', 'athlete_name', 'event_category', 'finish_time', 'country_code'],
  sampleRows: [
    [1, 'Noah Lyles', '100m Sprint', 9.83, 'USA'],
    [2, 'Kishane Thompson', '100m Sprint', 9.85, 'JAM'],
    [3, 'Fred Kerley', '100m Sprint', 9.88, 'USA'],
    [4, 'Akani Simbine', '100m Sprint', 9.9, 'RSA'],
    [5, 'Cole Hocker', '1500m Run', 211.2, 'USA'],
    [6, 'Josh Kerr', '1500m Run', 211.4, 'GBR'],
    [7, 'Yared Nuguse', '1500m Run', 211.8, 'USA'],
    [8, 'Jakob Ingebrigtsen', '1500m Run', 212.1, 'NOR'],
  ],
};
