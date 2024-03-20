"use strict";
exports.__esModule = true;
exports.SnowflakePricingData = void 0;
var fs = require('fs');
var pricePerCredit = require('./ComputePricing.json');
var storage = require('./StoragePricing.json');
var differentCloudProvider = require('./DifferentCloudProvider.json');
var sameCloudProvider = require('./SameCloudProvider.json');
var providers = [
    {
        id: 'AWS',
        logo: 'public/Amazon_Web_Services_Logo.svg',
        name: 'Amazon Web Services',
        Regions: {}
    },
    {
        id: 'Azure',
        logo: 'public/Microsoft_Azure.svg',
        name: 'Microsoft Azure',
        Regions: {}
    },
    {
        id: 'GCP',
        logo: 'public/Google-cloud-platform.svg',
        name: 'Google Cloud Platform',
        Regions: {}
    },
];
//populate regions from storage
providers.forEach(function (provider) {
    storage
        .filter(function (arrayEle) { return arrayEle['Cloud Provider'] === provider.id; })
        .map(function (matchedObjs) { return matchedObjs['Region']; })
        .forEach(function (region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        provider.Regions[region] = {
            Storage: {
                'On Demand Price': ((_a = storage.find(function (arrayEle) {
                    return arrayEle['Cloud Provider'] == provider.id &&
                        arrayEle['Region'] == region;
                })) === null || _a === void 0 ? void 0 : _a['On Demand Storage Pricing (TB/mo)']) || 0,
                'Capacity Price': ((_b = storage.find(function (arrayEle) {
                    return arrayEle['Cloud Provider'] == provider.id &&
                        arrayEle['Region'] == region;
                })) === null || _b === void 0 ? void 0 : _b['Capacity Storage Pricing (TB/mo)']) || 0
            },
            Compute: {
                Standard: ((_c = pricePerCredit.find(function (arrayEle) {
                    return arrayEle['Cloud Provider'] == provider.id &&
                        arrayEle['Region'] == region;
                })) === null || _c === void 0 ? void 0 : _c['Standard']) || 0,
                Enterprise: ((_d = pricePerCredit.find(function (arrayEle) {
                    return arrayEle['Cloud Provider'] == provider.id &&
                        arrayEle['Region'] == region;
                })) === null || _d === void 0 ? void 0 : _d['Enterprise']) || 0,
                'Business Critical': ((_e = pricePerCredit.find(function (arrayEle) {
                    return arrayEle['Cloud Provider'] == provider.id &&
                        arrayEle['Region'] == region;
                })) === null || _e === void 0 ? void 0 : _e['Business Critical']) || 0,
                VPS: ((_f = pricePerCredit.find(function (arrayEle) {
                    return arrayEle['Cloud Provider'] == provider.id &&
                        arrayEle['Region'] == region;
                })) === null || _f === void 0 ? void 0 : _f['VPS']) || 0
            },
            Transfer: {
                'Same Cloud Provider': {
                    'Same Region': ((_g = sameCloudProvider.find(function (arrayEle) {
                        return arrayEle['Cloud Provider'] == provider.id &&
                            arrayEle['Data Transfer Source Region'] == region;
                    })) === null || _g === void 0 ? void 0 : _g['Same Region']) || 0,
                    'Different Region': {
                        'Same Continent': ((_h = sameCloudProvider.find(function (arrayEle) {
                            return arrayEle['Cloud Provider'] == provider.id &&
                                arrayEle['Data Transfer Source Region'] == region;
                        })) === null || _h === void 0 ? void 0 : _h['Same Continent']) || 0,
                        'Different Continent': ((_j = sameCloudProvider.find(function (arrayEle) {
                            return arrayEle['Cloud Provider'] == provider.id &&
                                arrayEle['Data Transfer Source Region'] == region;
                        })) === null || _j === void 0 ? void 0 : _j['Different Continent']) || 0,
                        Oceania: ((_k = sameCloudProvider.find(function (arrayEle) {
                            return arrayEle['Cloud Provider'] == provider.id &&
                                arrayEle['Data Transfer Source Region'] == region;
                        })) === null || _k === void 0 ? void 0 : _k['Oceania']) || 0
                    }
                },
                'Different Cloud Provider': {
                    'Same Region': ((_l = differentCloudProvider.find(function (arrayEle) {
                        return arrayEle['Cloud Provider'] == provider.id &&
                            arrayEle['Data Transfer Source Region'] == region;
                    })) === null || _l === void 0 ? void 0 : _l['Same Continent']) || 0,
                    'Different Region': {
                        'Same Continent': ((_m = differentCloudProvider.find(function (arrayEle) {
                            return arrayEle['Cloud Provider'] == provider.id &&
                                arrayEle['Data Transfer Source Region'] == region;
                        })) === null || _m === void 0 ? void 0 : _m['Same Continent']) || 0,
                        'Different Continent': ((_o = differentCloudProvider.find(function (arrayEle) {
                            return arrayEle['Cloud Provider'] == provider.id &&
                                arrayEle['Data Transfer Source Region'] == region;
                        })) === null || _o === void 0 ? void 0 : _o['Different Continent']) || 0,
                        Oceania: ((_p = differentCloudProvider.find(function (arrayEle) {
                            return arrayEle['Cloud Provider'] == provider.id &&
                                arrayEle['Data Transfer Source Region'] == region;
                        })) === null || _p === void 0 ? void 0 : _p['Oceania']) || 0
                    }
                }
            }
        };
    });
});
exports.SnowflakePricingData = {
    ServerlessFeatures: {
        'Clustered Tables': 2,
        'Materialized Views Maintenance': 10,
        'Materialized Views Maintenance Secondary Databases': 2,
        'Database Replication': 2,
        'Search Optimization Service': 10,
        'Search Optimization Service Secondary Databases': 2,
        'Serverless Tasks': 1.5
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
        '6XL': 512
    },
    Providers: providers
};
fs.writeFileSync('SnowflakePricingData.json', JSON.stringify(exports.SnowflakePricingData));
