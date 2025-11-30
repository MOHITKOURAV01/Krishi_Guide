/**
 * Government Schemes Service
 * Handles fetching government schemes data
 */

// Mock data for government schemes
const SCHEMES_DATA = [
    {
        id: 1,
        name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        description: 'Income support of ₹6,000 per year to all landholding farmer families.',
        benefits: [
            '₹6,000 per year in 3 equal installments',
            'Direct bank transfer',
            'Support for small and marginal farmers'
        ],
        link: 'https://pmkisan.gov.in/'
    },
    {
        id: 2,
        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage.',
        benefits: [
            'Lowest premium rates',
            'Full sum insured coverage',
            'Post-harvest loss coverage'
        ],
        link: 'https://pmfby.gov.in/'
    },
    {
        id: 3,
        name: 'Kisan Credit Card (KCC)',
        description: 'Provides adequate and timely credit support to farmers for their cultivation and other needs.',
        benefits: [
            'Credit for cultivation expenses',
            'Investment credit',
            'Consumption requirements'
        ],
        link: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1601614'
    },
    {
        id: 4,
        name: 'Soil Health Card Scheme',
        description: 'Assists farmers in judging soil health and its fertility status.',
        benefits: [
            'Soil testing and recommendations',
            'Nutrient management',
            'Improved productivity'
        ],
        link: 'https://soilhealth.dac.gov.in/'
    },
    {
        id: 5,
        name: 'National Agriculture Market (e-NAM)',
        description: 'Pan-India electronic trading portal which networks the existing APMC mandis.',
        benefits: [
            'Better price discovery',
            'Transparent auction process',
            'One nation one market'
        ],
        link: 'https://www.enam.gov.in/'
    }
];

export const getGovtSchemes = async () => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(SCHEMES_DATA);
        }, 800);
    });
};
