import { PlantSpecies, Observation, SpeciesFilterParams, ObservationStatus } from '../types';
import { INITIAL_SPECIES, INITIAL_OBSERVATIONS, DEMO_IOT_NODES } from './mockData';
import { supabase, isSupabaseConfigured } from './supabase';

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
          return data as unknown as PlantSpecies[];
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
            s.localNames.some((n) => n.toLowerCase().includes(q))
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

      resolve(results);
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
          return data as unknown as PlantSpecies;
        }
      } catch (err) {
        console.warn('Supabase getSpeciesById failed, using local dataset:', err);
      }
    }

    return new Promise((resolve) => {
      const match = speciesDatabase.find(
        (s) => s.id === idOrUuid || s.qrUuid === idOrUuid
      );
      resolve(match ? { ...match } : null);
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
        const { data: inserted, error } = await supabase
          .from('species')
          .insert([newRecord])
          .select()
          .single();
        if (!error && inserted) {
          return inserted as unknown as PlantSpecies;
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
        await supabase.from('species').update(updates).eq('id', id);
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
    return new Promise((resolve) => {
      let list = [...observationDatabase];
      if (status) {
        list = list.filter((obs) => obs.status === status);
      }
      resolve(list);
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
