import { LessonDefinition, DatasetDefinition } from '../../types/lesson';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';
import { lesson6 } from './lesson6';
import { lesson7 } from './lesson7';
import { lesson8 } from './lesson8';
import { lesson9 } from './lesson9';
import { lesson10 } from './lesson10';
import { lesson11 } from './lesson11';
import { lesson12 } from './lesson12';
import { lesson13 } from './lesson13';
import { lesson14 } from './lesson14';
import { lesson15 } from './lesson15';
import { lesson16 } from './lesson16';
import { lesson17 } from './lesson17';
import { lesson18 } from './lesson18';
import { lesson19 } from './lesson19';
import { lesson20 } from './lesson20';
import { lesson21 } from './lesson21';
import { lesson22 } from './lesson22';
import { lesson23 } from './lesson23';
import { lesson24 } from './lesson24';

import { libraryBooksDataset } from '../datasets/libraryBooks';
import { courseCatalogDataset } from '../datasets/courseCatalog';
import { patientsDataset } from '../datasets/patients';
import { worldCitiesDataset } from '../datasets/worldCities';
import { studentEnrollmentsDataset } from '../datasets/studentEnrollments';
import { employeeDepartmentsDataset } from '../datasets/employeeDepartments';
import { customerFeedbackDataset } from '../datasets/customerFeedback';
import { fleetVehiclesDataset } from '../datasets/fleetVehicles';
import { productSalesDataset } from '../datasets/productSales';
import { universityStaffDataset } from '../datasets/universityStaff';
import { ecommerceOrdersDataset } from '../datasets/ecommerceOrders';
import { gymMembersDataset } from '../datasets/gymMembers';
import { inventoryStockDataset } from '../datasets/inventoryStock';
import { auditLogsDataset } from '../datasets/auditLogs';
import { cleanDatabaseDataset } from '../datasets/cleanDatabase';
import { campusFacilitiesDataset } from '../datasets/campusFacilities';
import { flightBookingsDataset } from '../datasets/flightBookings';
import { techSalariesDataset } from '../datasets/techSalaries';
import { storeCustomersDataset } from '../datasets/storeCustomers';
import { softwareProjectsDataset } from '../datasets/softwareProjects';
import { trackAthletesDataset } from '../datasets/trackAthletes';
import { dailyRevenueDataset } from '../datasets/dailyRevenue';
import { medicalClinicsDataset } from '../datasets/medicalClinics';
import { appUserLogsDataset } from '../datasets/appUserLogs';

export const LESSON_MANIFEST: LessonDefinition[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
  lesson24,
];

export const ALL_DATASETS: DatasetDefinition[] = [
  libraryBooksDataset,
  courseCatalogDataset,
  patientsDataset,
  worldCitiesDataset,
  studentEnrollmentsDataset,
  employeeDepartmentsDataset,
  customerFeedbackDataset,
  fleetVehiclesDataset,
  productSalesDataset,
  universityStaffDataset,
  ecommerceOrdersDataset,
  gymMembersDataset,
  inventoryStockDataset,
  auditLogsDataset,
  cleanDatabaseDataset,
  campusFacilitiesDataset,
  flightBookingsDataset,
  techSalariesDataset,
  storeCustomersDataset,
  softwareProjectsDataset,
  trackAthletesDataset,
  dailyRevenueDataset,
  medicalClinicsDataset,
  appUserLogsDataset,
];

export function getLessonById(id: string): LessonDefinition | undefined {
  return LESSON_MANIFEST.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): LessonDefinition | undefined {
  return LESSON_MANIFEST.find((lesson) => lesson.slug === slug);
}

export function getLessonByIndex(index: number): LessonDefinition | undefined {
  return LESSON_MANIFEST[index];
}

export function getNextLesson(currentId: string): LessonDefinition | null {
  const currentIndex = LESSON_MANIFEST.findIndex((l) => l.id === currentId);
  if (currentIndex >= 0 && currentIndex < LESSON_MANIFEST.length - 1) {
    return LESSON_MANIFEST[currentIndex + 1];
  }
  return null;
}

export function getPrevLesson(currentId: string): LessonDefinition | null {
  const currentIndex = LESSON_MANIFEST.findIndex((l) => l.id === currentId);
  if (currentIndex > 0) {
    return LESSON_MANIFEST[currentIndex - 1];
  }
  return null;
}
