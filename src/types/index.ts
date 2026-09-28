/* ==========================================================================
   Domain Types — Digital Plant Knowledge System (Niah NP)
   ========================================================================== */

export type ConservationStatus = 
  | 'Critically Endangered'
  | 'Endangered'
  | 'Vulnerable'
  | 'Near Threatened'
  | 'Least Concern';

export type IUCNCode = 'CR' | 'EN' | 'VU' | 'NT' | 'LC';

export type ProtectionStatus = 
  | 'Totally Protected'
  | 'Protected'
  | 'Unrestricted';

export type GrowthHabit = 
  | 'Emergent Tree'
  | 'Canopy Tree'
  | 'Understory Tree'
  | 'Epiphyte'
  | 'Carnivorous Plant'
  | 'Herb'
  | 'Climber / Liana'
  | 'Shrub';

export interface PlantPhoto {
  url: string;
  caption: string;
  credit: string;
  isPrimary: boolean;
}

export interface PlantSpecies {
  id: string;
  scientificName: string;
  commonName: string;
  family: string;
  genus: string;
  species: string;
  author: string;
  localNames: string[];
  conservationStatus: ConservationStatus;
  iucnCode: IUCNCode;
  sarawakProtectionStatus: ProtectionStatus;
  growthHabit: GrowthHabit;
  heightRange: string;
  habitat: string;
  niahZone: string;
  coordinatesRough: {
    lat: number;
    lng: number;
    bufferKm: number;
  };
  coordinatesExact: {
    lat: number;
    lng: number;
    accuracyMeters: number;
  };
  description: string;
  morphology: {
    leaves: string;
    bark: string;
    flowers: string;
    fruit: string;
  };
  ecologicalSignificance: string;
  threats: string[];
  photos: PlantPhoto[];
  qrUuid: string;
  createdAt: string;
  updatedAt: string;
}

export type ObservationStatus = 'pending' | 'approved' | 'rejected';

export interface Observation {
  id: string;
  speciesId?: string;
  suggestedScientificName: string;
  suggestedFamily: string;
  botanistName: string;
  botanistId: string;
  status: ObservationStatus;
  submittedAt: string;
  photoUrl: string;
  notes: string;
  gpsLocation: {
    lat: number;
    lng: number;
    accuracyMeters: number;
  };
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export type UserRole = 'visitor' | 'botanist' | 'conservation_officer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  agency: string;
  avatarUrl?: string;
}

export interface IoTSensorNode {
  nodeId: string;
  name: string;
  zone: string;
  status: 'online' | 'warning' | 'threat_triggered' | 'offline';
  batteryPercent: number;
  lastHeartbeat: string;
  temperatureC: number;
  humidityPercent: number;
  soilMoisturePercent: number;
  pirMovementDetected: boolean;
  tiltAlert: boolean;
  threatDetails?: string;
}

export interface SpeciesFilterParams {
  query?: string;
  family?: string;
  status?: ConservationStatus | 'all';
  habitat?: string;
  growthHabit?: string;
}
