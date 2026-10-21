import { DatasetDefinition } from '../../types/lesson';

export const medicalClinicsDataset: DatasetDefinition = {
  id: 'medical-clinics-data',
  tableName: 'DoctorRoster',
  description: 'Physician credentials and appointment schedules for virtual view abstractions.',
  schemaDDL: `
    CREATE TABLE DoctorRoster (
      doctor_id INTEGER PRIMARY KEY,
      doctor_name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      hospital_branch TEXT NOT NULL,
      consultation_fee INTEGER NOT NULL,
      is_accepting_patients INTEGER NOT NULL
    );
  `,
  seedDML: `
    INSERT INTO DoctorRoster (doctor_id, doctor_name, specialty, hospital_branch, consultation_fee, is_accepting_patients) VALUES
      (1, 'Dr. Aris Thorne', 'Cardiology', 'Metro Central', 250, 1),
      (2, 'Dr. Sarah Lin', 'Pediatrics', 'Westside Health', 180, 1),
      (3, 'Dr. David Kim', 'Neurology', 'Metro Central', 320, 0),
      (4, 'Dr. Maya Patel', 'Dermatology', 'North Pavilion', 210, 1),
      (5, 'Dr. James Rodriguez', 'Cardiology', 'Westside Health', 260, 0),
      (6, 'Dr. Lisa Chen', 'Pediatrics', 'Metro Central', 190, 1);
  `,
  sampleColumns: ['doctor_id', 'doctor_name', 'specialty', 'hospital_branch', 'consultation_fee', 'is_accepting_patients'],
  sampleRows: [
    [1, 'Dr. Aris Thorne', 'Cardiology', 'Metro Central', 250, 1],
    [2, 'Dr. Sarah Lin', 'Pediatrics', 'Westside Health', 180, 1],
    [3, 'Dr. David Kim', 'Neurology', 'Metro Central', 320, 0],
    [4, 'Dr. Maya Patel', 'Dermatology', 'North Pavilion', 210, 1],
    [5, 'Dr. James Rodriguez', 'Cardiology', 'Westside Health', 260, 0],
    [6, 'Dr. Lisa Chen', 'Pediatrics', 'Metro Central', 190, 1],
  ],
};
