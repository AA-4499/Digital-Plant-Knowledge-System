import { PlantSpecies, Observation, User, IoTSensorNode } from '../types';

export const INITIAL_SPECIES: PlantSpecies[] = [
  {
    id: 'shorea-albida',
    scientificName: 'Shorea albida',
    commonName: 'Alan Bunga',
    family: 'Dipterocarpaceae',
    genus: 'Shorea',
    species: 'albida',
    author: 'Symington',
    localNames: ['Alan', 'Alan bunga', 'Meranti bunga'],
    conservationStatus: 'Endangered',
    iucnCode: 'EN',
    sarawakProtectionStatus: 'Protected',
    growthHabit: 'Emergent Tree',
    heightRange: '45m - 60m',
    habitat: 'Peat swamp forest, limestone fringe transition',
    niahZone: 'Niah River Floodplain & Peat Margin',
    coordinatesRough: {
      lat: 3.815,
      lng: 113.782,
      bufferKm: 4.5,
    },
    coordinatesExact: {
      lat: 3.81492,
      lng: 113.78214,
      accuracyMeters: 4.2,
    },
    description: 'Shorea albida is an iconic emergent tree of Borneo, capable of forming pure canopy stands. It is known for its greyish-white foliage appearance when viewed from above during crown flushes.',
    morphology: {
      leaves: 'Oblong-elliptic, 7-15 cm long, coriaceous, glaucous underside giving a pale appearance.',
      bark: 'Deeply fissured, dark greyish-brown to blackish with light resin exudates.',
      flowers: 'Small cream-colored petals arranged in panicles, blooming irregularly during mast flowering events.',
      fruit: 'Prominent 3-winged calyx nut, wind-dispersed across the forest canopy.'
    },
    ecologicalSignificance: 'Dominant canopy component regulating the microclimate of peat and alluvial buffer zones surrounding Niah National Park.',
    threats: ['Historical selective logging', 'Habitat fragmentation', 'Mast flowering irregularity'],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Canopy view of mature Shorea stand in tropical rainforest',
        credit: 'Sarawak Forestry Herbarium Archive',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Trunk buttress and forest understory',
        credit: 'SFC Field Observation Team',
        isPrimary: false,
      }
    ],
    qrUuid: 'sfc-niah-001-shoralb',
    createdAt: '2026-03-12T08:30:00Z',
    updatedAt: '2026-09-20T14:15:00Z',
  },
  {
    id: 'nepenthes-bicalcarata',
    scientificName: 'Nepenthes bicalcarata',
    commonName: 'Fanged Pitcher Plant',
    family: 'Nepenthaceae',
    genus: 'Nepenthes',
    species: 'bicalcarata',
    author: 'Hook.f.',
    localNames: ['Periuk Kera Bergigi', 'Pioh Entuyut'],
    conservationStatus: 'Vulnerable',
    iucnCode: 'VU',
    sarawakProtectionStatus: 'Totally Protected',
    growthHabit: 'Carnivorous Plant',
    heightRange: 'Climber up to 20m into canopy',
    habitat: 'Peat swamp forest, moist limestone base gullies',
    niahZone: 'Kuala Gading River Trail & West Flank',
    coordinatesRough: {
      lat: 3.821,
      lng: 113.771,
      bufferKm: 3.8,
    },
    coordinatesExact: {
      lat: 3.82081,
      lng: 113.77093,
      accuracyMeters: 3.1,
    },
    description: 'Renowned for the two sharp, curved thorns or "fangs" projecting downwards from beneath the pitcher lid, this species has an obligate mutualistic relationship with the ant Camponotus schmitzi.',
    morphology: {
      leaves: 'Large, strap-shaped, up to 60 cm long, terminating in a thick tendril that inflates into the pitcher.',
      bark: 'Cylindrical climbing stem, reddish to yellowish-green, becoming woody with age.',
      flowers: 'Dioecious; racemose inflorescence bearing small, brownish-yellow flowers with pungent nectar scent.',
      fruit: 'Capsule bearing numerous filiform seeds.'
    },
    ecologicalSignificance: 'Specialized carnivory model that traps insects while housing symbiotic ants which clean the peristome and protect the plant from weevil herbivores.',
    threats: ['Illegal plant poaching', 'Hydrological disruption to peat swamps'],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1596489381734-75c1a7d6e4a2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lower pitcher with prominent paired peristome fangs',
        credit: 'Botanical Survey Expedition Niah 2026',
        isPrimary: true,
      }
    ],
    qrUuid: 'sfc-niah-002-nepbical',
    createdAt: '2026-04-05T10:00:00Z',
    updatedAt: '2026-09-22T09:40:00Z',
  },
  {
    id: 'rafflesia-pricei',
    scientificName: 'Rafflesia pricei',
    commonName: 'Price\'s Rafflesia',
    family: 'Rafflesiaceae',
    genus: 'Rafflesia',
    species: 'pricei',
    author: 'Meijer',
    localNames: ['Bunga Pakma', 'Yak-yak'],
    conservationStatus: 'Endangered',
    iucnCode: 'EN',
    sarawakProtectionStatus: 'Totally Protected',
    growthHabit: 'Herb',
    heightRange: 'Flower diameter 25cm - 35cm',
    habitat: 'Primary mixed dipterocarp and limestone hill forest floor',
    niahZone: 'Sub-Zone C (Subis Hill Slopes)',
    coordinatesRough: {
      lat: 3.808,
      lng: 113.795,
      bufferKm: 5.0,
    },
    coordinatesExact: {
      lat: 3.80789,
      lng: 113.79482,
      accuracyMeters: 5.8,
    },
    description: 'An obligate parasitic plant lacking leaves, stems, or roots. It survives entirely within the vine Tetrastigma, emerging only to produce large, fleshy, foul-scented flowers pollinated by carrion flies.',
    morphology: {
      leaves: 'None (endophytic micro-filaments inside host tissue).',
      bark: 'None.',
      flowers: 'Five reddish-brown perigone lobes densely covered with white warts; central diaphragm aperture 8-12 cm wide.',
      fruit: 'Fleshy berry-like structure containing thousands of microscopic seeds.'
    },
    ecologicalSignificance: 'Flagship species for Borneo conservation with profound ecotourism significance and extreme biological specialization.',
    threats: ['Trampling along unauthorized trails', 'Host vine disturbance', 'Short flowering window (4-6 days)'],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fresh blooming Rafflesia flower on the forest floor',
        credit: 'Sarawak Forestry Corporation Niah Unit',
        isPrimary: true,
      }
    ],
    qrUuid: 'sfc-niah-003-rafprice',
    createdAt: '2026-05-18T11:20:00Z',
    updatedAt: '2026-09-25T16:00:00Z',
  },
  {
    id: 'eusideroxylon-zwageri',
    scientificName: 'Eusideroxylon zwageri',
    commonName: 'Borneo Ironwood / Belian',
    family: 'Lauraceae',
    genus: 'Eusideroxylon',
    species: 'zwageri',
    author: 'Teijsm. & Binn.',
    localNames: ['Belian', 'Tebelian', 'Kayu Besi'],
    conservationStatus: 'Vulnerable',
    iucnCode: 'VU',
    sarawakProtectionStatus: 'Protected',
    growthHabit: 'Canopy Tree',
    heightRange: '30m - 50m',
    habitat: 'Alluvial riverbanks and gentle limestone foothills',
    niahZone: 'Sungai Niah Riparian Corridor',
    coordinatesRough: {
      lat: 3.832,
      lng: 113.765,
      bufferKm: 3.0,
    },
    coordinatesExact: {
      lat: 3.83191,
      lng: 113.76523,
      accuracyMeters: 2.8,
    },
    description: 'Renowned as one of the heaviest and most durable hardwoods in the world. Belian trees are extremely slow-growing and can live for well over 1,000 years. Felling or export without a state permit is prohibited.',
    morphology: {
      leaves: 'Alternate, simple, coriaceous, dark shiny green above, 15-30 cm long.',
      bark: 'Rough, reddish to dark brown, shedding in small thin longitudinal flakes.',
      flowers: 'Small yellowish-green bisexual flowers in axillary panicles.',
      fruit: 'Very large, single-seeded drupe, 8-15 cm long, dispersed by water and porcupines.'
    },
    ecologicalSignificance: 'Deep rooting systems protect riverbank integrity against monsoonal erosion along the Niah River basin.',
    threats: ['Extreme slow regeneration rate', 'Past over-exploitation for structural timber'],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Towering Belian tree along the river terrace',
        credit: 'SFC Plant Ecology Division',
        isPrimary: true,
      }
    ],
    qrUuid: 'sfc-niah-004-eusiwzw',
    createdAt: '2026-06-02T09:00:00Z',
    updatedAt: '2026-09-18T13:40:00Z',
  },
  {
    id: 'begonia-niahensis',
    scientificName: 'Begonia niahensis',
    commonName: 'Niah Cave Begonia',
    family: 'Begoniaceae',
    genus: 'Begonia',
    species: 'niahensis',
    author: 'Kiew',
    localNames: ['Begonia Gua Niah', 'Asam Batu'],
    conservationStatus: 'Critically Endangered',
    iucnCode: 'CR',
    sarawakProtectionStatus: 'Totally Protected',
    growthHabit: 'Herb',
    heightRange: '15cm - 30cm',
    habitat: 'Shaded, vertical damp limestone cliffs near cave mouths',
    niahZone: 'Great Cave & Painted Cave Perimeter',
    coordinatesRough: {
      lat: 3.818,
      lng: 113.788,
      bufferKm: 2.5,
    },
    coordinatesExact: {
      lat: 3.81845,
      lng: 113.78832,
      accuracyMeters: 6.5,
    },
    description: 'A micro-endemic species discovered exclusively on the damp limestone karst cliff faces surrounding Niah’s Great Cave complex. Highly adapted to low-light conditions and calcareous soils.',
    morphology: {
      leaves: 'Asymmetric cordate leaves with iridescent silvery-green markings and wine-red undersides.',
      bark: 'Succulent rhizomatous stem clinging to rock fissures.',
      flowers: 'Delicate pinkish-white blossoms held on slender erect peduncles.',
      fruit: 'Three-winged capsule adapted to splash-cup seed dispersal by cave ceiling drips.'
    },
    ecologicalSignificance: 'Specialized calciphile bio-indicator sensitive to tourist microclimate changes within cave entrance corridors.',
    threats: ['Micro-endemic range restriction', 'Desiccation from altered cave airflow', 'Guano dust deposition'],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Foliage of Begonia clinging to moist limestone karst',
        credit: 'Swinburne Sarawak Biodiversity Group',
        isPrimary: true,
      }
    ],
    qrUuid: 'sfc-niah-005-begniah',
    createdAt: '2026-06-20T14:10:00Z',
    updatedAt: '2026-09-24T11:05:00Z',
  },
  {
    id: 'paphiopedilum-stonei',
    scientificName: 'Paphiopedilum stonei',
    commonName: 'Stone\'s Slipper Orchid',
    family: 'Orchidaceae',
    genus: 'Paphiopedilum',
    species: 'stonei',
    author: '(Hook.f.) Stein',
    localNames: ['Anggerik Kasut Niah', 'Bunga Kasut'],
    conservationStatus: 'Endangered',
    iucnCode: 'EN',
    sarawakProtectionStatus: 'Totally Protected',
    growthHabit: 'Epiphyte',
    heightRange: 'Leaves 30cm - 45cm, scape up to 60cm',
    habitat: 'Mossy crevices on steep limestone pinnacles (altitude 100m-500m)',
    niahZone: 'Gunung Subis Limestone Pinnacles',
    coordinatesRough: {
      lat: 3.826,
      lng: 113.791,
      bufferKm: 3.5,
    },
    coordinatesExact: {
      lat: 3.82572,
      lng: 113.79144,
      accuracyMeters: 7.2,
    },
    description: 'One of the most regal slipper orchids of Southeast Asia, producing spikes of 2 to 4 dramatic flowers with long, twisting, ribbon-like petals hanging downwards up to 15 cm.',
    morphology: {
      leaves: 'Distichous, strap-like, leathery, clear emerald green, up to 45 cm long.',
      bark: 'Epiphytic / lithophytic base adhering firmly with thick velamen-covered roots.',
      flowers: 'Dorsal sepal white with purple striping; lateral petals yellow-green twisting into dark purple ribbons; pouch reddish-pink.',
      fruit: 'Cylindrical ribbed capsule dispersing windblown dust-seeds.'
    },
    ecologicalSignificance: 'Pollinated exclusively by hoverflies and represents the pinnacle of Sarawak’s fragile cliff-top orchid diversity.',
    threats: ['High commercial horticultural poaching demand', 'Wildfire during prolonged dry spells'],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Multi-floral spike of Paphiopedilum in full bloom',
        credit: 'Sarawak Forestry Orchid Specialist Unit',
        isPrimary: true,
      }
    ],
    qrUuid: 'sfc-niah-006-paphston',
    createdAt: '2026-07-08T07:45:00Z',
    updatedAt: '2026-09-26T17:30:00Z',
  }
];

export const INITIAL_OBSERVATIONS: Observation[] = [
  {
    id: 'obs-2026-001',
    speciesId: 'nepenthes-bicalcarata',
    suggestedScientificName: 'Nepenthes bicalcarata',
    suggestedFamily: 'Nepenthaceae',
    botanistName: 'Frederick Sii',
    botanistId: 'botanist-001',
    status: 'pending',
    submittedAt: '2026-09-27T10:14:00Z',
    photoUrl: 'https://images.unsplash.com/photo-1596489381734-75c1a7d6e4a2?auto=format&fit=crop&w=800&q=80',
    notes: 'Observed healthy cluster of lower pitchers on climbing vine along Sungai Niah loop trail. Ants active on peristome.',
    gpsLocation: {
      lat: 3.82083,
      lng: 113.77095,
      accuracyMeters: 3.2,
    }
  },
  {
    id: 'obs-2026-002',
    speciesId: 'begonia-niahensis',
    suggestedScientificName: 'Begonia niahensis',
    suggestedFamily: 'Begoniaceae',
    botanistName: 'Andy Chu',
    botanistId: 'botanist-002',
    status: 'pending',
    submittedAt: '2026-09-28T09:30:00Z',
    photoUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    notes: 'Single fertile specimen found on wet limestone gully 50m north of Great Cave boardwalk. Flower buds present.',
    gpsLocation: {
      lat: 3.81848,
      lng: 113.78835,
      accuracyMeters: 5.1,
    }
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-officer-01',
    email: 'officer@sfc.gov.my',
    name: 'Angel David (Conservation Officer)',
    role: 'conservation_officer',
    agency: 'Sarawak Forestry Corporation',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-botanist-01',
    email: 'botanist@sfc.gov.my',
    name: 'Frederick Sii (Field Botanist)',
    role: 'botanist',
    agency: 'Sarawak Forestry Corporation',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-admin-01',
    email: 'admin@sfc.gov.my',
    name: 'Dr. Sue Han Lee (Lead Administrator)',
    role: 'admin',
    agency: 'Swinburne Sarawak / SFC',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

export const DEMO_IOT_NODES: IoTSensorNode[] = [
  {
    nodeId: 'ESP32-NODE-01',
    name: 'Limestone Pinnacle Sentinel Alpha',
    zone: 'Subis Limestone Ridge',
    status: 'online',
    batteryPercent: 88,
    lastHeartbeat: 'Just now',
    temperatureC: 27.4,
    humidityPercent: 82,
    soilMoisturePercent: 68,
    pirMovementDetected: false,
    tiltAlert: false,
  },
  {
    nodeId: 'ESP32-NODE-02',
    name: 'Great Cave Perimeter Sensor Beta',
    zone: 'Great Cave Mouth West',
    status: 'warning',
    batteryPercent: 42,
    lastHeartbeat: '2 mins ago',
    temperatureC: 29.8,
    humidityPercent: 91,
    soilMoisturePercent: 84,
    pirMovementDetected: false,
    tiltAlert: false,
    threatDetails: 'Elevated ambient temperature & battery degradation warning'
  },
  {
    nodeId: 'ESP32-NODE-03',
    name: 'Belian Sanctuary Watcher Gamma',
    zone: 'Sungai Niah Trail 4',
    status: 'threat_triggered',
    batteryPercent: 95,
    lastHeartbeat: '15 secs ago',
    temperatureC: 26.8,
    humidityPercent: 86,
    soilMoisturePercent: 72,
    pirMovementDetected: true,
    tiltAlert: true,
    threatDetails: 'PIR motion & physical tilt vibration detected in protected flora zone'
  }
];
