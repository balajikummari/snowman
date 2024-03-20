import {
  BaseConfig,
  explodedJsonCompute,
  explodedJsonStorage,
  explodedJsonTransfer,
} from './Models'

const fs = require('fs')
const pricePerCredit: explodedJsonCompute[] = require('./ComputePricing.json')
const storage: explodedJsonStorage[] = require('./StoragePricing.json')
const differentCloudProvider: explodedJsonTransfer[] = require('./DifferentCloudProvider.json')
const sameCloudProvider: explodedJsonTransfer[] = require('./SameCloudProvider.json')

const providers: BaseConfig['Providers'] = [
  {
    id: 'AWS',
    logo: 'public/Amazon_Web_Services_Logo.svg',
    name: 'Amazon Web Services',
    Regions: {},
  },
  {
    id: 'Azure',
    logo: 'public/Microsoft_Azure.svg',
    name: 'Microsoft Azure',
    Regions: {},
  },
  {
    id: 'GCP',
    logo: 'public/Google-cloud-platform.svg',
    name: 'Google Cloud Platform',
    Regions: {},
  },
]
//populate regions from storage
providers.forEach((provider) => {
  storage
    .filter((arrayEle) => arrayEle['Cloud Provider'] === provider.id)
    .map((matchedObjs) => matchedObjs['Region'])
    .forEach((region) => {
      provider.Regions[region] = {
        Storage: {
          'On Demand Price':
            storage.find(
              (arrayEle) =>
                arrayEle['Cloud Provider'] == provider.id &&
                arrayEle['Region'] == region
            )?.['On Demand Storage Pricing (TB/mo)'] || 0,
          'Capacity Price':
            storage.find(
              (arrayEle) =>
                arrayEle['Cloud Provider'] == provider.id &&
                arrayEle['Region'] == region
            )?.['Capacity Storage Pricing (TB/mo)'] || 0,
        },
        Compute: {
          Standard:
            pricePerCredit.find(
              (arrayEle) =>
                arrayEle['Cloud Provider'] == provider.id &&
                arrayEle['Region'] == region
            )?.['Standard'] || 0,
          Enterprise:
            pricePerCredit.find(
              (arrayEle) =>
                arrayEle['Cloud Provider'] == provider.id &&
                arrayEle['Region'] == region
            )?.['Enterprise'] || 0,
          'Business Critical':
            pricePerCredit.find(
              (arrayEle) =>
                arrayEle['Cloud Provider'] == provider.id &&
                arrayEle['Region'] == region
            )?.['Business Critical'] || 0,
          VPS:
            pricePerCredit.find(
              (arrayEle) =>
                arrayEle['Cloud Provider'] == provider.id &&
                arrayEle['Region'] == region
            )?.['VPS'] || 0,
        },
        Transfer: {
          'Same Cloud Provider': {
            'Same Region':
              sameCloudProvider.find(
                (arrayEle) =>
                  arrayEle['Cloud Provider'] == provider.id &&
                  arrayEle['Data Transfer Source Region'] == region
              )?.['Same Region'] || 0,
            'Different Region': {
              'Same Continent':
                sameCloudProvider.find(
                  (arrayEle) =>
                    arrayEle['Cloud Provider'] == provider.id &&
                    arrayEle['Data Transfer Source Region'] == region
                )?.['Same Continent'] || 0,
              'Different Continent':
                sameCloudProvider.find(
                  (arrayEle) =>
                    arrayEle['Cloud Provider'] == provider.id &&
                    arrayEle['Data Transfer Source Region'] == region
                )?.['Different Continent'] || 0,
              Oceania:
                sameCloudProvider.find(
                  (arrayEle) =>
                    arrayEle['Cloud Provider'] == provider.id &&
                    arrayEle['Data Transfer Source Region'] == region
                )?.['Oceania'] || 0,
            },
          },
          'Different Cloud Provider': {
            'Same Region':
              differentCloudProvider.find(
                (arrayEle) =>
                  arrayEle['Cloud Provider'] == provider.id &&
                  arrayEle['Data Transfer Source Region'] == region
              )?.['Same Continent'] || 0,
            'Different Region': {
              'Same Continent':
                differentCloudProvider.find(
                  (arrayEle) =>
                    arrayEle['Cloud Provider'] == provider.id &&
                    arrayEle['Data Transfer Source Region'] == region
                )?.['Same Continent'] || 0,
              'Different Continent':
                differentCloudProvider.find(
                  (arrayEle) =>
                    arrayEle['Cloud Provider'] == provider.id &&
                    arrayEle['Data Transfer Source Region'] == region
                )?.['Different Continent'] || 0,
              Oceania:
                differentCloudProvider.find(
                  (arrayEle) =>
                    arrayEle['Cloud Provider'] == provider.id &&
                    arrayEle['Data Transfer Source Region'] == region
                )?.['Oceania'] || 0,
            },
          },
        },
      }
    })
})

export const SnowflakePricingData: BaseConfig = {
  ServerlessFeatures: {
    'Clustered Tables': 2,
    'Materialized Views Maintenance': 10,
    'Materialized Views Maintenance Secondary Databases': 2,
    'Database Replication': 2,
    'Search Optimization Service': 10,
    'Search Optimization Service Secondary Databases': 2,
    'Serverless Tasks': 1.5,
  },
  ComputeSizes: {
    XS: 1,
    S: 2,
    M: 4,
    L: 8,
    XL: 16,
    '2XL': 32,
    '3XL': 64,
    '4XL': 128,
    '5XL': 256,
    '6XL': 512,
  },
  Providers: providers,
}

fs.writeFileSync(
  'SnowflakePricingData.json',
  JSON.stringify(SnowflakePricingData)
)
