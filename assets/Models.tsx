/*
-----------------
Example Structure
-----------------
{
  ServerlessFeatures: {
    'Clustered Tables': 2,
    'Materialized Views Maintenance': 10,
    'Materialized Views Maintenance Secondary Databases': 2,
    'Database Replication': 2,
    'Search Optimization Service': 10,
    'Search Optimization Service Secondary Databases': 2,
    'Serverless Tasks': 1.5,
  }
  ComputeSizes: { 'XS': 1, 'S': 2, 'M': 4, 'L': 8, 'XL': 16, '2XL': 32, '3XL': 64, '4XL': 128, '5XL': 256 , '6XL': 512 },
  Providers:[
    { 
      id: 'AWS',
      logo: 'public/Amazon_Web_Services_Logo.svg',
      name: 'Amazon Web Services',
      Regions:
      [
        {
        'US East (N. Virginia)': {
            'Storage': {
                'On Demand Price': '0.00',
                'Capacity Price': '0.00',
            },
            'Compute': {
                "Standard": "2.00",
                "Premier": "2.25",
                "Premier+1": "2.50",
                "Premier+2": "2.75",
                "Enterprise": "3.00",
                "Enterprise + Private Link": "3.30",
                "Business Critical": "4.00",
                "VPS": "6.00"
            },
            'Transfer': {
                'Same Cloud Provider': {
                    'Same Region': '0.00',
                    'Different Region': {
                        'Same Continent': '0.00',
                        'Different Continent': '0.00'}    
                },
                'Different Cloud Provider': {
                    'Same Region': '0.00',
                    'Different Region': {
                        'Same Continent': '0.00',
                        'Different Continent': '0.00'
                        'Oceania': '0.00'
                    }
                } ,
            }
        }
      ]
    },
  ]
}
*/
export interface ServerlessFeatures {
  'Clustered Tables': number
  'Materialized Views Maintenance': number
  'Materialized Views Maintenance Secondary Databases': number
  'Database Replication': number
  'Search Optimization Service': number
  'Search Optimization Service Secondary Databases': number
  'Serverless Tasks': number
}

export interface ComputeSizes {
  XS: number
  S: number
  M: number
  L: number
  XL: number
  '2XL': number
  '3XL': number
  '4XL': number
  '5XL': number
  '6XL': number
}

export interface Providers {
  id: string
  logo: string
  name: string
  Regions: {
    [key: string]: {
      Storage: {
        'On Demand Price': number
        'Capacity Price': number
      }
      Compute: {
        Standard: number
        Enterprise: number
        'Business Critical': number
        VPS: number
      }
      Transfer: {
        'Same Cloud Provider': {
          'Same Region': number
          'Different Region': {
            'Same Continent': number
            'Different Continent': number
            Oceania: number
          }
        }
        'Different Cloud Provider': {
          'Same Region': number
          'Different Region': {
            'Same Continent': number
            'Different Continent': number
            Oceania: number
          }
        }
      }
    }
  }
}

export interface BaseConfig {
  ServerlessFeatures: ServerlessFeatures
  ComputeSizes: ComputeSizes
  Providers: Providers[]
}

export interface explodedJsonStorage {
  'Cloud Provider': string
  Region: string
  'On Demand Storage Pricing (TB/mo)': number
  'Capacity Storage Pricing (TB/mo)': number
}
export interface explodedJsonCompute {
  'Cloud Provider': string
  Region: string
  Standard: number
  Premier: number
  'Premier+1': number
  'Premier+2': number
  Enterprise: number
  'Enterprise + Private Link': number
  'Business Critical': number
  VPS: number
}
export interface explodedJsonTransfer {
  'Cloud Provider': string
  'Data Transfer Source Region': string
  Combine: string
  'Same Region'?: number
  'Same Continent': number
  'Different Continent': number
  Oceania: number
}
