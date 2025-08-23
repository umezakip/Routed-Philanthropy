import React, { useState, useEffect } from 'react';
import './index.css';
import { Search, Moon, Sun, HeartHandshake, Syringe, Leaf, PawPrint, GraduationCap } from 'lucide-react';
import LightLogo from './blue logo full.svg';
import DarkLogo from './white logo full.svg';

// A mapping of tags to specific icons for dynamic rendering
const tagIconMap = {
  'humanitarian': <HeartHandshake size={24} />,
  'medical': <Syringe size={24} />,
  'environment': <Leaf size={24} />,
  'wildlife': <PawPrint size={24} />,
  'animals': <PawPrint size={24} />,
  'education': <GraduationCap size={24} />,
};

// Data for the organizations, with more semantically descriptive tags
const organizations = [
  {
    name: "St. Jude Children's Research Hospital",
    description: 'The mission of St. Jude Children’s Research Hospital is to advance cures, and means of prevention, for pediatric catastrophic diseases through research and treatment.',
    tags: ['medical', 'treatment', 'pediatric', 'hospital', 'children', 'cancer', 'research'],
    link: 'https://www.stjude.org/',
  },
  {
    name: "Palestine Children's Relief Fund (PCRF)",
    description: "The Palestine Children's Relief Fund is the primary humanitarian organization in Palestine, delivering crucial medical relief and humanitarian aid to those affected by conflicts.",
    tags: ['humanitarian', 'children', 'medical', 'aid', 'palestine'],
    link: 'https://www.pcrf.net/',
  },
  {
    name: 'Best Friends Animal Society',
    description: "Best Friends Animal Society is a leading national animal welfare organization dedicated to ending the killing of dogs and cats in America's shelters.",
    tags: ['animals', 'shelter', 'adoption', 'no-kill', 'pets'],
    link: 'https://bestfriends.org/',
  },
  {
    name: 'The Global Fund for Children',
    description: 'A non-profit dedicated to supporting grassroots organizations that work with vulnerable children and youth worldwide.',
    tags: ['humanitarian', 'youth', 'global', 'poverty'],
    link: 'https://globalfundforchildren.org/',
  },
  {
    name: 'Doctors Without Borders',
    description: 'Providing medical aid to people in nearly 70 countries, often in conflict zones, areas of endemic disease, or following natural disasters.',
    tags: ['medical', 'health', 'disaster relief', 'global'],
    link: 'https://www.doctorswithoutborders.org/',
  },
  {
    name: 'National Immigrant Justice Center (NIJC)',
    description: 'The National Immigrant Justice Center (NIJC) defends the rights of immigrants, refugees, and asylum seekers.',
    tags: ['humanitarian', 'human rights', 'asylum', 'advocacy', 'immigration', 'refugees', 'immigrant', 'legal aid'],
    link: 'https://immigrantjustice.org/',
  },
  {
    name: 'Fundación Paraguaya',
    description: 'A social enterprise that develops and implements practical and sustainable solutions to poverty and unemployment in Paraguay and around the world.',
    tags: ['humanitarian', 'development', 'education', 'poverty', 'paraguay', 'south america'],
    link: 'https://www.fundacionparaguaya.org.py/',
  },
  {
    name: "Cure Alzheimer's Fund",
    description: "Cure Alzheimer's Fund is a non-profit organization dedicated to funding the most promising research to prevent, slow and reverse Alzheimer's disease.",
    tags: ['medical', 'research', 'prevention', 'dementia', 'alzheimer'],
    link: 'https://www.curealz.org/',
  },
  {
    name: 'National Pediatric Cancer Foundation',
    description: 'The National Pediatric Cancer Foundation is dedicated to funding research to eliminate childhood cancer.',
    tags: ['medical', 'pediatric', 'treatment', 'cancer', 'research'],
    link: 'https://nationalpcf.org/',
  },
  {
    name: 'Autistic Self Advocacy Network (ASAN)',
    description: 'The Autistic Self Advocacy Network is a nonprofit organization run by and for individuals with autism.',
    tags: ['medical', 'rights', 'advocacy', 'neurodiversity', 'autism'],
    link: 'https://autisticadvocacy.org/',
  },
  {
    name: 'GiveDirectly',
    description: "GiveDirectly is a nonprofit that lets donors like you send money directly to the world's poorest households.",
    tags: ['humanitarian', 'poverty', 'give', 'african charity'],
    link: 'https://www.givedirectly.org/',
  },
  {
    name: 'Organization for Autism Research (OAR)',
    description: "OAR's mission is to use research to address the daily concerns of self-advocates, parents, autism professionals, and caregivers.",
    tags: ['medical', 'education', 'resources', 'autism', 'research'],
    link: 'https://researchautism.org/',
  },
  {
    name: 'Direct Relief',
    description: 'Direct Relief is a humanitarian aid organization, active in all 50 states and more than 80 countries, with a mission to improve the health and lives of people affected by poverty or emergencies.',
    tags: ['humanitarian', 'health', 'poverty', 'aid', 'disaster'],
    link: 'https://www.directrelief.org/',
  },
  {
    name: 'UNICEF USA',
    description: "UNICEF works in over 190 countries and territories to save children’s lives, to defend their rights, and to help them fulfil their potential.",
    tags: ['humanitarian', 'children', 'education', 'protection', 'health'],
    link: 'https://www.unicefusa.org/',
  },
  {
    name: "The World Food Programme (WFP)",
    description: "The World Food Programme is the world’s largest humanitarian organization, saving lives in emergencies and using food assistance to build a pathway to peace, stability and prosperity for people recovering from conflict, disasters and the impact of climate change.",
    tags: ['humanitarian', 'food', 'aid', 'hunger'],
    link: 'https://www.wfp.org/',
  },
  {
    name: 'Morris Animal Foundation',
    description: 'Bridging science and resources to advance the health of animals.',
    tags: ['animals', 'research', 'veterinary', 'health', 'science'],
    link: 'https://www.morrisanimalfoundation.org/',
  },
  {
    name: 'Oceana',
    description: 'The largest international advocacy organization focused solely on ocean conservation. Oceana seeks to make our oceans more biodiverse and abundant.',
    tags: ['environment', 'oceans', 'conservation', 'marine life'],
    link: 'https://oceana.org/',
  },
  {
    name: 'CARE',
    description: 'CARE works around the globe to save lives, defeat poverty and achieve social justice.',
    tags: ['humanitarian', 'poverty', 'care', 'global'],
    link: 'https://www.care.org/',
  },
  {
    name: 'Children International',
    description: 'We give children in poverty the tools they need to create brighter futures for themselves and their communities.',
    tags: ['humanitarian', 'south america', 'poverty', 'children'],
    link: 'https://www.children.org/',
  },
  {
    name: 'National Wildlife Federation',
    description: 'Uniting all Americans to ensure wildlife thrive in a rapidly changing world. Protecting endangered species and habitats.',
    tags: ['wildlife', 'environment', 'animals', 'conservation'],
    link: 'https://www.nwf.org/',
  },
  {
    name: "Alzheimer's Foundation of America (AFA)",
    description: "The Alzheimer’s Foundation of America provides support, services and education to individuals, families and caregivers affected by Alzheimer’s disease and related dementias nationwide.",
    tags: ['medical', 'support', 'caregivers', 'education', 'alzheimer'],
    link: 'https://alzfdn.org/',
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode and save preference to local storage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  // Check for saved dark mode preference on initial render
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
  }, []);

  // Filter organizations based on the search term
  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Section */}
      <header className={`w-full shadow-sm p-4 border-b transition-colors duration-500 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Use the isDarkMode state to choose which logo to display */}
            <img
              src={isDarkMode ? DarkLogo : LightLogo}
              alt="Routed Philanthropy Full Logo"
              className="h-12 w-auto"
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-500" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
            Find Your Cause
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            A centralized hub for verified organizations. Find a cause, make a difference.
          </p>
        </div>

        {/* Search Bar Section */}
        <div className={`relative rounded-full shadow-lg border w-full max-w-2xl mx-auto mb-12 transition-colors duration-500 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <input
            type="text"
            placeholder="Search for a cause (e.g., 'wildlife', 'education', 'disaster relief')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-4 pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-500 ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Organization Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((org, index) => {
              // Get the icon based on the first tag of the organization
              const icon = tagIconMap[org.tags[0]] || <HeartHandshake size={24} />;
              return (
                <div key={index} className={`rounded-xl shadow-md p-6 border transition transform hover:scale-105 duration-200 ease-in-out ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-blue-600 dark:text-blue-400">{icon}</span>
                    <h2 className="text-xl font-bold">{org.name}</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{org.description}</p>
                  <a
                    href={org.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <HeartHandshake size={20} className="mr-2" />
                    Visit Website
                  </a>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No organizations found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
