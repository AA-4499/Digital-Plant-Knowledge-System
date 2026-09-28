import { PlantSpecies, Observation, SpeciesFilterParams, ObservationStatus } from '../types';
import { INITIAL_SPECIES, INITIAL_OBSERVATIONS, DEMO_IOT_NODES } from './mockData';
import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Normalizes PostgreSQL snake_case rows from Supabase into TypeScript camelCase PlantSpecies objects
 */
export function mapDbRowToSpecies(row: any): PlantSpecies {
  if (!row) return row;
  return {
    id: String(row.id || ''),
    scientificName: row.scientificName || row.scientific_name || 'Unknown Species',
    commonName: row.commonName || row.common_name || '',
    family: row.family || 'Plantae',
    genus: row.genus || '',
    species: row.species || '',
    author: row.author || '',
    localNames: Array.isArray(row.localNames) 
      ? row.localNames 
      : (Array.isArray(row.local_names) ? row.local_names : []),
    conservationStatus: row.conservationStatus || row.conservation_status || 'Least Concern',
    iucnCode: row.iucnCode || row.iucn_code || 'LC',
    sarawakProtectionStatus: row.sarawakProtectionStatus || row.sarawak_protection_status || 'Protected',
    growthHabit: row.growthHabit || row.growth_habit || 'Canopy Tree',
    heightRange: row.heightRange || row.height_range || '',
    habitat: row.habitat || '',
    niahZone: row.niahZone || row.niah_zone || 'Niah National Park',
    coordinatesRough: row.coordinatesRough || row.coordinates_rough || { lat: 3.82, lng: 113.78, bufferKm: 4.0 },
    coordinatesExact: row.coordinatesExact || row.coordinates_exact || { lat: 3.82, lng: 113.78, accuracyMeters: 5.0 },
    description: row.description || '',
    morphology: row.morphology || { leaves: '', bark: '', flowers: '', fruit: '' },
    ecologicalSignificance: row.ecologicalSignificance || row.ecological_significance || '',
    threats: Array.isArray(row.threats) ? row.threats : [],
    photos: Array.isArray(row.photos) && row.photos.length > 0 ? row.photos : [{
      url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80',
      caption: row.common_name || row.commonName || 'Plant specimen',
      credit: 'Sarawak Forestry Corporation',
      isPrimary: true
    }],
    qrUuid: row.qrUuid || row.qr_uuid || `sfc-niah-${row.id || 'qr'}`,
    createdAt: row.createdAt || row.created_at || new Date().toISOString(),
    updatedAt: row.updatedAt || row.updated_at || new Date().toISOString(),
  };
}

export function mapDbRowToObservation(row: any): Observation {
  if (!row) return row;
  return {
    id: String(row.id || ''),
    speciesId: row.speciesId || row.species_id,
    suggestedScientificName: row.suggestedScientificName || row.suggested_scientific_name || 'Unidentified Specimen',
    suggestedFamily: row.suggestedFamily || row.suggested_family || 'Plantae',
    botanistName: row.botanistName || row.botanist_name || 'Field Botanist',
    botanistId: row.botanistId || row.botanist_id || 'botanist-001',
    status: row.status || 'pending',
    submittedAt: row.submittedAt || row.submitted_at || new Date().toISOString(),
    photoUrl: row.photoUrl || row.photo_url || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    notes: row.notes || '',
    gpsLocation: row.gpsLocation || row.gps_location || { lat: 3.82, lng: 113.78, accuracyMeters: 5.0 },
    reviewNotes: row.reviewNotes || row.review_notes,
    reviewedBy: row.reviewedBy || row.reviewed_by,
    reviewedAt: row.reviewedAt || row.reviewed_at,
  };
}

// In-memory state for development / prototype persistence
let speciesDatabase: PlantSpecies[] = [...INITIAL_SPECIES];
let observationDatabase: Observation[] = [...INITIAL_OBSERVATIONS];

export const plantApiService = {
  /**
   * Retrieves list of plant species with optional fuzzy search and faceted filters
   */
  async getSpeciesList(filters?: SpeciesFilterParams): Promise<PlantSpecies[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('species').select('*');
        if (filters?.query) {
          query = query.or(`scientific_name.ilike.%${filters.query}%,common_name.ilike.%${filters.query}%,family.ilike.%${filters.query}%`);
        }
        if (filters?.family && filters.family !== 'all') {
          query = query.eq('family', filters.family);
        }
        if (filters?.status && filters.status !== 'all') {
          query = query.eq('conservation_status', filters.status);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map(mapDbRowToSpecies);
        }
      } catch (err) {
        console.warn('Supabase query failed, falling back to local dataset:', err);
      }
    }

    // Default mock data handling
    return new Promise((resolve) => {
      let results = [...speciesDatabase];

      if (filters?.query) {
        const q = filters.query.toLowerCase().trim();
        results = results.filter(
          (s) =>
            s.scientificName.toLowerCase().includes(q) ||
            s.commonName.toLowerCase().includes(q) ||
            s.family.toLowerCase().includes(q) ||
            (s.localNames && s.localNames.some((n) => n.toLowerCase().includes(q)))
        );
      }

      if (filters?.family && filters.family !== 'all') {
        results = results.filter((s) => s.family.toLowerCase() === filters.family?.toLowerCase());
      }

      if (filters?.status && filters.status !== 'all') {
        results = results.filter((s) => s.conservationStatus === filters.status);
      }

      if (filters?.growthHabit && filters.growthHabit !== 'all') {
        results = results.filter((s) => s.growthHabit === filters.growthHabit);
      }

      resolve(results.map(mapDbRowToSpecies));
    });
  },

  /**
   * Retrieves a single species by ID or QR UUID
   */
  async getSpeciesById(idOrUuid: string): Promise<PlantSpecies | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('species')
          .select('*')
          .or(`id.eq.${idOrUuid},qr_uuid.eq.${idOrUuid}`)
          .single();
        if (!error && data) {
          return mapDbRowToSpecies(data);
        }
      } catch (err) {
        console.warn('Supabase getSpeciesById failed, using local dataset:', err);
      }
    }

    return new Promise((resolve) => {
      const match = speciesDatabase.find(
        (s) => s.id === idOrUuid || s.qrUuid === idOrUuid
      );
      resolve(match ? mapDbRowToSpecies(match) : null);
    });
  },

  /**
   * Adds a new plant species to the database (Administrative CRUD)
   */
  async createSpecies(data: Omit<PlantSpecies, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlantSpecies> {
    const newRecord: PlantSpecies = {
      ...data,
      id: data.scientificName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const dbRow = {
          id: newRecord.id,
          scientific_name: newRecord.scientificName,
          common_name: newRecord.commonName,
          family: newRecord.family,
          genus: newRecord.genus,
          species: newRecord.species,
          author: newRecord.author,
          local_names: newRecord.localNames,
          conservation_status: newRecord.conservationStatus,
          iucn_code: newRecord.iucnCode,
          sarawak_protection_status: newRecord.sarawakProtectionStatus,
          growth_habit: newRecord.growthHabit,
          height_range: newRecord.heightRange,
          habitat: newRecord.habitat,
          niah_zone: newRecord.niahZone,
          coordinates_rough: newRecord.coordinatesRough,
          coordinates_exact: newRecord.coordinatesExact,
          description: newRecord.description,
          morphology: newRecord.morphology,
          ecological_significance: newRecord.ecologicalSignificance,
          threats: newRecord.threats,
          photos: newRecord.photos,
          qr_uuid: newRecord.qrUuid,
        };
        const { data: inserted, error } = await supabase
          .from('species')
          .insert([dbRow])
          .select()
          .single();
        if (!error && inserted) {
          return mapDbRowToSpecies(inserted);
        }
      } catch (err) {
        console.warn('Supabase createSpecies failed, using local storage:', err);
      }
    }

    speciesDatabase.unshift(newRecord);
    return newRecord;
  },

  /**
   * Updates an existing plant species record (Administrative CRUD)
   */
  async updateSpecies(id: string, updates: Partial<PlantSpecies>): Promise<PlantSpecies | null> {
    const index = speciesDatabase.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const updated = {
      ...speciesDatabase[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    speciesDatabase[index] = updated;

    if (isSupabaseConfigured && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.scientificName) dbUpdates.scientific_name = updates.scientificName;
        if (updates.commonName) dbUpdates.common_name = updates.commonName;
        if (updates.family) dbUpdates.family = updates.family;
        if (updates.conservationStatus) dbUpdates.conservation_status = updates.conservationStatus;
        if (updates.photos) dbUpdates.photos = updates.photos;

        await supabase.from('species').update(dbUpdates).eq('id', id);
      } catch (err) {
        console.warn('Supabase updateSpecies failed:', err);
      }
    }

    return updated;
  },

  /**
   * Deletes a plant species record (Administrative CRUD)
   */
  async deleteSpecies(id: string): Promise<boolean> {
    const initialLen = speciesDatabase.length;
    speciesDatabase = speciesDatabase.filter((s) => s.id !== id);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('species').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteSpecies failed:', err);
      }
    }

    return speciesDatabase.length < initialLen;
  },

  /**
   * Retrieves pending or reviewed observations synced from mobile field app
   */
  async getObservations(status?: ObservationStatus): Promise<Observation[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('observations').select('*').order('submitted_at', { ascending: false });
        if (status) {
          query = query.eq('status', status);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map(mapDbRowToObservation);
        }
      } catch (err) {
        console.warn('Supabase getObservations failed:', err);
      }
    }

    return new Promise((resolve) => {
      let list = [...observationDatabase];
      if (status) {
        list = list.filter((obs) => obs.status === status);
      }
      resolve(list.map(mapDbRowToObservation));
    });
  },

  /**
   * Updates observation status (Approve, Reject, Request Edit)
   */
  async updateObservationStatus(
    id: string, 
    status: ObservationStatus, 
    reviewNotes?: string, 
    reviewer?: string
  ): Promise<Observation | null> {
    const index = observationDatabase.findIndex((obs) => obs.id === id);
    if (index === -1) return null;

    const updated: Observation = {
      ...observationDatabase[index],
      status,
      reviewNotes: reviewNotes || observationDatabase[index].reviewNotes,
      reviewedBy: reviewer || 'Officer Angel David',
      reviewedAt: new Date().toISOString(),
    };

    observationDatabase[index] = updated;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('observations').update({
          status,
          review_notes: updated.reviewNotes,
          reviewed_by: updated.reviewedBy,
          reviewed_at: updated.reviewedAt,
        }).eq('id', id);
      } catch (err) {
        console.warn('Supabase updateObservationStatus failed:', err);
      }
    }

    return updated;
  },

  /**
   * Retrieves aggregate KPI metrics for Conservation Officer dashboard
   */
  async getDashboardMetrics() {
    const totalSpecies = speciesDatabase.length;
    const endangeredCount = speciesDatabase.filter(
      (s) => s.conservationStatus === 'Critically Endangered' || s.conservationStatus === 'Endangered'
    ).length;
    const pendingObservations = observationDatabase.filter((obs) => obs.status === 'pending').length;
    const activeSensors = DEMO_IOT_NODES.filter((n) => n.status !== 'offline').length;

    return {
      totalSpecies,
      endangeredCount,
      pendingObservations,
      activeSensors,
    };
  }
};
