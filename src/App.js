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
  {
    name: "National Immigration Law Center",
    description: "Defends and advances the rights of low-income immigrants through litigation and policy.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://donate.nilc.org/page/88062/donate/1',
  },
  {
    name: "ILRC",
    description: "Provides legal training and \"Know Your Rights\" tools to protect immigrants from ICE.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://www.ilrc.org/donate',
  },
  {
    name: "United We Dream",
    description: "The largest immigrant youth-led network in the US fighting against deportations.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://unitedwedream.org/',
  },
  {
    name: "Detention Watch Network",
    description: "National coalition focused specifically on abolishing the immigration detention system.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://www.detentionwatchnetwork.org/',
  },
  {
    name: "Hispanic Federation",
    description: "Supports Latino communities through advocacy, disaster relief, and immigration services.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://hispanicfederation.org/',
  },
  {
    name: "Innovation Law Lab",
    description: "Uses technology and legal strategy to end the isolation of immigrants in detention.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://www.innovationlawlab.org/',
  },
  {
    name: "Black Alliance for Just Immigration",
    description: "Advocates for racial justice and migrant rights for Black immigrants and African-Americans.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'hhttps://baji.org/donate-here/',
  },
  {
    name: "Organized Communities Against Deportations (OCAD)",
    description: "Grassroots group in Chicago fighting to stop deportations and ICE harassment.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://www.organizedcommunities.org/donate',
  },
  {
    name: "Make the Road New York",
    description: "Builds the power of immigrant and working-class communities to achieve dignity and justice.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://donate.maketheroadny.org/give/344769/#!/donation/checkout',
  },
  {
    name: "Border Angels",
    description: "Humanitarian group providing water in the desert and legal aid for day laborers.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://www.borderangels.org/donate.html',
  },
  {
    name: "Young Center for Immigrant Children's Rights",
    description: "Protects the rights of immigrant children through the appointment of Child Advocates.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://www.theyoungcenter.org/donate/',
  },
  {
    name: "Northwest Immigrant Rights Project",
    description: "Promotes justice by defending and advancing the rights of immigrants through legal services.",
    tags: ['legal', 'immigration', 'advocacy', 'rights'],
    link: 'https://nwirp.org/donate/',
  },
  {
    name: "ANERA",
    description: "Provides humanitarian aid, education, and development for refugees in Palestine and Lebanon.",
    tags: ['humanitarian', 'education', 'refugees', 'palestine', 'lebanon'],
    link: 'https://support.anera.org/a/donate',
  },
  {
    name: "Middle East Children's Alliance",
    description: "Works for rights and provides aid to children in Palestine, Iraq, and Lebanon.",
    tags: ['humanitarian', 'education', 'refugees', 'palestine', 'lebanon', 'health'],
    link: 'https://secure.everyaction.com/F9CF_2soukmEKjtqUbtY4Q2',
  },
  {
    name: "Medical Aid for Palestinians (MAP)",
    description: "Delivers health services to Palestinians affected by conflict and displacement.",
    tags: ['humanitarian', 'health', 'palestine'],
    link: 'https://www.map.org.uk/how-to-help/donate/',
  },
  {
    name: "HEAL Palestine",
    description: "Provides healthcare, education, and leadership opportunities for Palestinian youth.",
    tags: ['humanitarian', 'education', 'health', 'palestine'],
    link: 'https://www.healpalestine.org/donate/',
  },
  {
    name: "HealthWell Foundation",
    description: "Financial safety net for Americans with chronic diseases who can't afford medicine.",
    tags: ['humanitarian', 'health'],
    link: 'https://www.healthwellfoundation.org/donors/individual-donors/',
  },
  {
    name: "Task Force for Global Health",
    description: "Eliminates diseases and builds health systems globally; nearly 100% efficient.",
    tags: ['humanitarian', 'health'],
    link: 'https://www.taskforce.org/donate/',
  },
  {
    name: "International Medical Corps",
    description: "First responder to crises, providing emergency medical services and training.",
    tags: ['crisis', 'medical', 'humanitarian', 'disaster'],
    link: 'https://intlmedcorps.donorsupport.co/page/mainpage&appeal=DPGENZZZZ',
  },
  {
    name: "Medical Teams International",
    description: "Provides medical and dental care for people affected by disaster, conflict, and poverty.",
    tags: ['medical', 'refugees', 'disaster', 'healthcare'],
    link: 'https://www.medicalteams.org/donation/donate-medical-supplies/',
  },
  {
    name: "Mercy Corps",
    description: "Global team of humanitarians working in over 40 countries to overcome crisis and poverty.",
    tags: ['humanitarian', 'crisis', 'development', 'global', 'poverty'],
    link: 'https://www.mercycorps.org/donate',
  },
  {
    name: "Alight",
    description: "Formerly ARC; provides healthcare and housing for refugees and displaced people.",
    tags: ['refugees', 'healthcare', 'shelter', 'humanitarian'],
    link: 'https://www.wearealight.org/who-we-are?gad_source=1&gad_campaignid=22897941030&gbraid=0AAAAABuOM-oDnQI0jP_NPMYi8SOz747ur&gclid=Cj0KCQiAnJHMBhDAARIsABr7b8459aC9_8qWCWbvCe-mNblCU48xJL7PnEcktXcsYaSg5d-l59PVYuwaAjCQEALw_wcB',
  },
  {
    name: "Relief International",
    description: "Provides health, water, and livelihoods to people in some of the world's most fragile settings.",
    tags: ['humanitarian', 'crisis', 'health', 'global', 'water'],
    link: 'https://www.ri.org/donate/',
  },
  {
    name: "Vitamin Angels",
    description: "Provides life-changing vitamins to mothers and children at risk of malnutrition.",
    tags: ['nutrition', 'maternal health', 'global', 'children'],
    link: 'https://vitaminangels.org/?atrkid=V3ADWA38F51BE_49982139023_kwd-359949130709__638224022612_g_c___&gad_source=1&gad_campaignid=1044632821&gbraid=0AAAAAD2Cg9poukGDWAKnXCuXM8WoRZ91S&gclid=Cj0KCQiAnJHMBhDAARIsABr7b84qgsZUrZ78iEPPfb5gOwRdDOx4l8kHNL0ye3mKcleBzno140Gv4K4aAllrEALw_wcB',
  },
  {
    name: "Operation Smile",
    description: "Provides free surgeries for children and young adults born with cleft lip and cleft palate.",
    tags: ['surgery', 'children', 'healthcare', 'medical'],
    link: 'https://operationsmile.donorsupport.co/page/FUNPFEBSREV?s_src=cpc&s_subsrc=google&utm_campaign=paid&utm_medium=cpc&utm_source=google&utm_term=smiles%20donation&gad_source=1&gad_campaignid=68605662&gbraid=0AAAAADuC8YoRMbtiFrvZXh5Ml8JHERj6N&gclid=Cj0KCQiAnJHMBhDAARIsABr7b872MOID6JRyFReKaXtAgjmiy7pp9z1gQFGBLGoEOkLa-PEeU6lKd3waAhucEALw_wcB',
  },
  {
    name: "Smile Train",
    description: "Sustainable model for cleft lip surgery through training local medical professionals.",
    tags: ['surgery', 'training', 'sustainable', 'medical', 'children'],
    link: 'https://support.smiletrain.org/page/givenow',
  },
  {
    name: "Fred Hollows Foundation",
    description: "Dedicated to ending avoidable blindness and improving Indigenous health.",
    tags: ['vision', 'indigenous rights', 'australia', 'healthcare'],
    link: 'https://www.hollows.org/donate',
  },
  {
    name: "Living Goods",
    description: "Supports networks of community health workers who go door-to-door to save lives.",
    tags: ['community health', 'africa', 'tech', 'healthcare'],
    link: 'https://livinggoods.org/donate/',
  },
  {
    name: "Evidence Action",
    description: "Scales evidence-based health interventions like deworming and safe water.",
    tags: ['data driven', 'water', 'global health', 'humanitarian'],
    link: 'https://www.evidenceaction.org/donate/',
  },
  {
    name: "Sankara Eye Foundation",
    description: "Works to eliminate curable blindness in India through free high-quality eye surgeries.",
    tags: ['india', 'vision', 'healthcare', 'medical'],
    link: 'https://give.giftofvision.org/campaign/757230/donate?c_src=sh5go&gad_source=1&gad_campaignid=20396524991&gbraid=0AAAAAo3shTTrzQzbG3VPkPqSAD7KIjygL&gclid=Cj0KCQiAnJHMBhDAARIsABr7b84y4akBNsrvwA2i62oe8bAONJOI1FeORrBz-8-ncQJETgoyth8IKMEaApWLEALw_wcB',
  },
  {
    name: "Good360",
    description: "Connects companies with excess goods to nonprofits; 100% efficient distribution.",
    tags: ['efficiency', 'logistics', 'us', 'humanitarian'],
    link: 'https://good360.org/donate',
  },
  {
    name: "Midwest Food Bank",
    description: "Massive US food relief organization with 100% fundraising efficiency.",
    tags: ['hunger', 'us', 'efficiency', 'food'],
    link: 'https://www.midwestfoodbank.org/donate/',
  },
  {
    name: "The Arc of the US",
    description: "Protects the civil rights of people with intellectual and developmental disabilities.",
    tags: ['disability', 'civil rights', 'advocacy', 'humanitarian'],
    link: 'https://thearc.org/get-involved/donate/',
  },
  {
    name: "Cancer Research Institute",
    description: "Devoted exclusively to advancing immunotherapy to treat and cure all cancers.",
    tags: ['cancer', 'research', 'immunology', 'medical'],
    link: 'https://www.cancerresearch.org/donate',
  },
  {
    name: "Michael J. Fox Foundation",
    description: "The world's largest nonprofit funder of Parkinson's disease research.",
    tags: ['parkinsons', 'research', 'neuro', 'medical'],
    link: 'https://www.michaeljfox.org/donate',
  },
  {
    name: "Planned Parenthood",
    description: "Provides reproductive healthcare, sex education, and advocacy in the US.",
    tags: ['health', 'reproductive rights', 'us', 'education'],
    link: 'https://www.plannedparenthood.org/get-involved/other-ways-give',
  },
  {
    name: "Equal Justice Initiative",
    description: "Founded by Bryan Stevenson; works to end mass incarceration and racial injustice.",
    tags: ['criminal justice', 'racial justice', 'us', 'legal'],
    link: 'https://support.eji.org/give/153413/#!/donation/checkout',
  },
  {
    name: "Innocence Project",
    description: "Exonerates the wrongly convicted through DNA testing and reforms the justice system.",
    tags: ['exoneration', 'justice', 'legal', 'criminal justice'],
    link: 'https://innocenceproject.org/donate/',
  },
  {
    name: "Southern Poverty Law Center",
    description: "Fights hate groups and seeks justice for the most vulnerable in the Deep South.",
    tags: ['anti-hate', 'civil rights', 'justice', 'advocacy'],
    link: 'https://donate.splcenter.org/page/14952/donate/1',
  },
  {
    name: "Center for Constitutional Rights",
    description: "Uses law as a tool for social change; defends civil rights and human rights.",
    tags: ['law', 'human rights', 'justice', 'advocacy'],
    link: 'https://ccrjustice.org/donate',
  },
  {
    name: "NAMI",
    description: "National Alliance on Mental Illness; provides advocacy, education, and support.",
    tags: ['mental health', 'support', 'us', 'education'],
    link: 'https://nami.org/Get-Involved/Donate/',
  },
  {
    name: "The Trevor Project",
    description: "Provides crisis intervention and suicide prevention services to LGBTQ+ youth.",
    tags: ['lgbtq', 'mental health', 'youth', 'crisis'],
    link: 'https://give.thetrevorproject.org/give/63307/#!/donation/checkout',
  },
  {
    name: "Covenant House",
    description: "Provides housing and supportive services to youth facing homelessness.",
    tags: ['homelessness', 'youth', 'us', 'shelter'],
    link: 'https://www.covenanthouse.org/donate',
  },
  {
    name: "Meals on Wheels America",
    description: "Addresses senior hunger and isolation through home-delivered meals and check-ins.",
    tags: ['senior care', 'hunger', 'us', 'food'],
    link: 'https://www.mealsonwheelsamerica.org/donate',
  },
  {
    name: "Habitat for Humanity",
    description: "Builds strength, stability, and self-reliance through affordable home ownership.",
    tags: ['housing', 'us', 'poverty', 'humanitarian'],
    link: 'https://www.habitat.org/donate',
  },
  {
    name: "City Harvest",
    description: "New York's first and largest food rescue organization.",
    tags: ['food rescue', 'nyc', 'hunger', 'food'],
    link: 'https://www.cityharvest.org/donate/',
  },
  {
    name: "National Law Center on Homelessness & Poverty",
    description: "Uses the power of law to end and prevent homelessness in the US.",
    tags: ['homelessness', 'legal aid', 'us', 'advocacy'],
    link: 'https://homelesslaw.org/donate/',
  },
  {
    name: "Human Rights Campaign",
    description: "The largest US civil rights organization working for LGBTQ+ equality.",
    tags: ['lgbtq', 'equality', 'civil rights', 'advocacy'],
    link: 'https://www.hrc.org/donate',
  },
  {
    name: "Center for Reproductive Rights",
    description: "Global legal organization dedicated to protecting reproductive freedom as a human right.",
    tags: ['reproductive health', 'legal', 'global', 'human rights'],
    link: 'https://reproductiverights.org/donate/',
  },
  {
    name: "Common Cause",
    description: "Nonpartisan organization working to hold power accountable and defend democracy.",
    tags: ['democracy', 'governance', 'us', 'advocacy'],
    link: 'https://www.commoncause.org/donate/',
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
