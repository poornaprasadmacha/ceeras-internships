import { DatasetDefinition } from '../../types/lesson';

export const patientsDataset: DatasetDefinition = {
  id: 'hospital-patients',
  tableName: 'HospitalPatients',
  description: 'Admitted hospital patient records, diagnostic conditions, and assigned clinical departments.',
  schemaDDL: `
    CREATE TABLE HospitalPatients (
      id INTEGER PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      medical_condition TEXT NOT NULL,
      department TEXT NOT NULL,
      admission_year INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO HospitalPatients (id, first_name, last_name, medical_condition, department, admission_year) VALUES
      (101, 'Elena', 'Vance', 'Acute Bronchitis', 'Pulmonology', 2024),
      (102, 'Marcus', 'Chen', 'Type 2 Diabetes', 'Endocrinology', 2023),
      (103, 'Sarah', 'Jenkins', 'Asthma Flare', 'Pulmonology', 2024),
      (104, 'David', 'O''Connor', 'Hypertension Stage 2', 'Cardiology', 2023),
      (105, 'Amira', 'Kassir', 'Arrhythmia', 'Cardiology', 2024),
      (106, 'Lucas', 'Silva', 'Coronary Artery Disease', 'Cardiology', 2022),
      (107, 'Maya', 'Patel', 'Migraine with Aura', 'Neurology', 2024),
      (108, 'Jordan', 'Taylor', 'Hypothyroidism', 'Endocrinology', 2023);
  `,
  sampleColumns: ['id', 'first_name', 'last_name', 'medical_condition', 'department', 'admission_year'],
  sampleRows: [
    [101, 'Elena', 'Vance', 'Acute Bronchitis', 'Pulmonology', 2024],
    [102, 'Marcus', 'Chen', 'Type 2 Diabetes', 'Endocrinology', 2023],
    [103, 'Sarah', 'Jenkins', 'Asthma Flare', 'Pulmonology', 2024],
    [104, 'David', "O'Connor", 'Hypertension Stage 2', 'Cardiology', 2023],
    [105, 'Amira', 'Kassir', 'Arrhythmia', 'Cardiology', 2024],
    [106, 'Lucas', 'Silva', 'Coronary Artery Disease', 'Cardiology', 2022],
    [107, 'Maya', 'Patel', 'Migraine with Aura', 'Neurology', 2024],
    [108, 'Jordan', 'Taylor', 'Hypothyroidism', 'Endocrinology', 2023],
  ],
};
