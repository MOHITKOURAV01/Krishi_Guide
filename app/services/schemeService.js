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
            'Lowest premium rates (1.5% - 5%)',
            'Full sum insured coverage',
            'Cover for post-harvest losses'
        ],
        link: 'https://pmfby.gov.in/'
    },
    {
        id: 3,
        name: 'PM-KUSUM Scheme',
        description: 'Solar power scheme to ensure energy security for farmers.',
        benefits: [
            'Subsidy on solar pumps (up to 60%)',
            'Income from selling surplus power',
            'Solarization of grid-connected pumps'
        ],
        link: 'https://pmkusum.mnre.gov.in/'
    },
    {
        id: 4,
        name: 'Kisan Credit Card (KCC)',
        description: 'Provides adequate and timely credit support to farmers for their cultivation and other needs.',
        benefits: [
            'Credit for cultivation expenses',
            'Interest subvention of 2% p.a.',
            'Collateral-free loan up to ₹1.60 Lakh'
        ],
        link: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1601614'
    },
    {
        id: 5,
        name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
        description: 'Promotes organic farming through cluster approach.',
        benefits: [
            '₹50,000 per hectare for 3 years',
            'Support for organic inputs',
            'Assistance for packaging and marketing'
        ],
        link: 'https://dms.jaivikkheti.in/'
    },
    {
        id: 6,
        name: 'Agriculture Infrastructure Fund (AIF)',
        description: 'Financing facility for investment in projects for post-harvest management infrastructure.',
        benefits: [
            'Interest subvention of 3% p.a.',
            'Credit guarantee coverage',
            'Loans up to ₹2 Crore'
        ],
        link: 'https://agriinfra.dac.gov.in/'
    },
    {
        id: 7,
        name: 'Namo Drone Didi',
        description: 'Empowering women Self Help Groups (SHGs) with drones for agricultural services.',
        benefits: [
            '80% subsidy on drones (up to ₹8 Lakhs)',
            'Rental income for SHGs',
            'Modernization of agriculture'
        ],
        link: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2002022'
    },
    {
        id: 8,
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
        id: 9,
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
