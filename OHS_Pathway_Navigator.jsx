import React, { useState, useMemo } from 'react';
import { ChevronDown, CheckCircle, AlertTriangle, Briefcase, Zap, Star } from 'lucide-react';

// --- CONFIG ---
const ACTSAFE_COURSE_BASE_URL = 'https://actsafe.ca/courses-workshops/';
// UPDATED: Now points to the general contact page as requested
const ACTSAFE_CONSULTATION_URL = 'https://actsafe.ca/contact-us/';

// --- MOCK DATA (Updated based on Actsafe Union Requirements) ---
const INDUSTRIES = [
  { id: 'mp', name: 'Motion Picture', icon: Briefcase },
  { id: 'pa', name: 'Performing Arts', icon: Star },
  { id: 'le', name: 'Live Events', icon: Zap },
];

const TRAINING_DATA = {
  // Motion Picture (MP) roles rely on MPSA, WHMIS, and MPIO as mandatory foundations.
  'mp': {
    'Production Assistant / Entry-Level Crew': [
      { id: 1, name: 'Motion Picture Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 18, name: 'Motion Picture Industry Orientation (MPIO) & Exam', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-industry-orientation-and-exam/` },
      { id: 4, name: 'Occupational First Aid - Basic', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}occupational-first-aid-basic/` },
    ],
    'Grip / Camera / Lighting Technician (Technical)': [
      { id: 1, name: 'Motion Picture Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 19, name: 'Fall Protection Training', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}fall-protection/` },
      { id: 3, name: 'Aerial & Scissor Lift Training', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}aerial-and-scissor-lift/` },
    ],
    'Head of Department / Supervisor': [
      { id: 1, name: 'Motion Picture Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 20, name: 'Motion Picture Safety for Supervisors', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-safety-for-supervisors/` },
      { id: 21, name: 'Joint Health & Safety Committee Fundamentals', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}joint-health-safety-committee-fundamentals/` },
    ],
    // --- NEW ADDITIONS FOR MOTION PICTURE ---
    'Set Decorator / Props Department': [
      { id: 1, name: 'Motion Picture Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 28, name: 'Fire Safety and Emergency Procedures', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}fire-safety-and-emergency-procedures/` },
      { id: 31, name: 'Manual Material Handling', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}manual-material-handling/` },
    ],
    'Office / Production Staff': [
      { id: 1, name: 'Motion Picture Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-safety-awareness/` },
      { id: 29, name: 'Workplace Bullying & Harassment', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-bullying-harassment/` },
      { id: 30, name: 'Ergonomics for Office & Set', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}ergonomics-for-office-and-set/` },
    ],
    'Other (Request OHS Advice)': [
      { id: 1, name: 'Motion Picture Safety Awareness (Foundation)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}motion-picture-safety-awareness/` },
      { id: 16, name: 'Request OHS Consultation for Specialized Role', type: 'Recommended', link: ACTSAFE_CONSULTATION_URL },
    ],
  },
  
  // Performing Arts (PA) roles rely on PASA and WHMIS as foundations.
  'pa': {
    'Stage Manager / Venue Crew': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 4, name: 'Occupational First Aid - Basic', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}occupational-first-aid-basic/` },
      { id: 23, name: 'Rigging Safety Fundamentals', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}rigging-safety-fundamentals/` },
    ],
    'Theatre Carpenter / Set Construction': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 19, name: 'Fall Protection Training', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}fall-protection/` },
      { id: 26, name: 'Power Tool Safety (Workshop)', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}power-tool-safety-workshop/` },
    ],
    'Arts & Venue Supervisor': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 24, name: 'Performing Arts Safety for Supervisors', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-for-supervisors/` },
      { id: 21, name: 'Joint Health & Safety Committee Fundamentals', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}joint-health-safety-committee-fundamentals/` },
    ],
    // --- NEW ADDITIONS FOR PERFORMING ARTS ---
    'Costume / Wardrobe Technician': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 28, name: 'Fire Safety and Emergency Procedures', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}fire-safety-and-emergency-procedures/` },
    ],
    'Administration / Marketing Staff': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 29, name: 'Workplace Bullying & Harassment', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-bullying-harassment/` },
      { id: 30, name: 'Ergonomics for Office & Set', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}ergonomics-for-office-and-set/` },
    ],
    'Other (Request OHS Advice)': [
      { id: 22, name: 'Performing Arts Safety Awareness (Foundation)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 16, name: 'Request OHS Consultation for Specialized Role', type: 'Recommended', link: ACTSAFE_CONSULTATION_URL },
    ],
  },
  
  // Live Events (LE) shares foundations with Performing Arts but focuses on large-scale event logistics.
  'le': {
    'Stage Rigger / Fly Crew': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 19, name: 'Fall Protection Training', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}fall-protection/` },
      { id: 25, name: 'Live Performance Electrical Certification', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}live-performance-electrical-certification/` },
    ],
    'Forklift / Aerial Lift Operator': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 27, name: 'Powered Mobile Equipment Certification', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}powered-mobile-equipment-certification/` },
      { id: 3, name: 'Aerial & Scissor Lift Training', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}aerial-and-scissor-lift/` },
    ],
    'Crowd Safety Supervisor / FOH Manager': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 4, name: 'Occupational First Aid - Basic', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}occupational-first-aid-basic/` },
      { id: 9, name: 'Crowd Management Safety (Workshop)', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}crowd-management-safety-workshop/` },
    ],
    // --- NEW ADDITIONS FOR LIVE EVENTS ---
    'Audio Visual Technician': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 17, name: 'WHMIS 2025 (Hazardous Materials)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-hazardous-materials-information-system-2025/` },
      { id: 31, name: 'Manual Material Handling', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}manual-material-handling/` },
      { id: 25, name: 'Live Performance Electrical Certification', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}live-performance-electrical-certification/` },
    ],
    'Event Planner / Administrator': [
      { id: 22, name: 'Performing Arts Safety Awareness', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 29, name: 'Workplace Bullying & Harassment', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}workplace-bullying-harassment/` },
      { id: 21, name: 'Joint Health & Safety Committee Fundamentals', type: 'Recommended', link: `${ACTSAFE_COURSE_BASE_URL}joint-health-safety-committee-fundamentals/` },
    ],
    'Other (Request OHS Advice)': [
      { id: 22, name: 'Performing Arts Safety Awareness (Foundation)', type: 'Mandatory', link: `${ACTSAFE_COURSE_BASE_URL}performing-arts-safety-awareness/` },
      { id: 16, name: 'Request OHS Consultation for Specialized Role', type: 'Recommended', link: ACTSAFE_CONSULTATION_URL },
    ],
  },
};

const RoleSelector = ({ roles, selectedRole, onSelectRole }) => (
  <div className="space-y-4">
    <label htmlFor="role-select" className="block text-lg font-medium text-gray-700">
      2. Select Your Job Role:
    </label>
    <div className="relative">
      <select
        id="role-select"
        className="w-full pl-4 pr-10 py-3 text-lg border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-actsafe-yellow focus:border-actsafe-yellow cursor-pointer transition duration-150 ease-in-out shadow-md"
        value={selectedRole || ''}
        onChange={(e) => onSelectRole(e.target.value)}
        disabled={roles.length === 0}
      >
        <option value="" disabled>
          {roles.length > 0 ? 'Choose your specific role...' : 'Select an Industry first...'}
        </option>
        {roles.map(role => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  </div>
);

const TrainingResultCard = ({ training }) => {
  const isMandatory = training.type === 'Mandatory';
  const Icon = isMandatory ? AlertTriangle : CheckCircle;
  const colorClass = isMandatory ? 'bg-red-50 border-red-300 text-red-700' : 'bg-green-50 border-green-300 text-green-700';

  return (
    <div className={`p-4 border rounded-xl shadow-sm flex items-start space-x-4 transition transform hover:scale-[1.02] ${colorClass}`}>
      <div className="flex-shrink-0 mt-1">
        <Icon className={`w-6 h-6 ${isMandatory ? 'text-red-500' : 'text-green-500'}`} />
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-lg">{training.name}</p>
        <p className={`text-sm font-medium ${isMandatory ? 'text-red-600' : 'text-green-600'}`}>
          {isMandatory ? 'MANDATORY' : 'RECOMMENDED'}
        </p>
        <a 
          // Links now use specific course URLs and open in a new tab.
          href={training.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center text-actsafe-blue hover:text-actsafe-yellow-dark text-sm font-medium transition duration-150"
        >
          View Course Details & Register &rarr;
        </a>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [selectedIndustryId, setSelectedIndustryId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Define Actsafe color palette using Tailwind's arbitrary values for consistency
  // Primary (Blue/Dark), Accent (Yellow/Gold)
  const actsafeBlue = '#0A3F5C';
  const actsafeYellow = '#FDB913';

  // Memoize available roles based on selected industry
  const availableRoles = useMemo(() => {
    if (!selectedIndustryId) return [];
    const rolesMap = TRAINING_DATA[selectedIndustryId] || {};
    
    const allRoles = Object.keys(rolesMap);
    const otherRole = 'Other (Request OHS Advice)';

    // Filter out 'Other', sort the remaining roles alphabetically, and append 'Other'
    const regularRoles = allRoles.filter(role => role !== otherRole).sort();
    
    if (allRoles.includes(otherRole)) {
      return [...regularRoles, otherRole];
    }

    return regularRoles;
  }, [selectedIndustryId]);

  // Memoize the training checklist for the selected role
  const trainingChecklist = useMemo(() => {
    if (!selectedIndustryId || !selectedRole) return [];
    return TRAINING_DATA[selectedIndustryId]?.[selectedRole] || [];
  }, [selectedIndustryId, selectedRole]);

  // Reset role when industry changes
  const handleIndustryChange = (industryId) => {
    setSelectedIndustryId(industryId);
    setSelectedRole('');
  };

  const mandatoryTraining = trainingChecklist.filter(t => t.type === 'Mandatory');
  const recommendedTraining = trainingChecklist.filter(t => t.type === 'Recommended');

  // Inject custom Tailwind config for Actsafe brand colors
  // Note: This is an inline script required for the single-file mandate.
  React.useEffect(() => {
    window.tailwind.config = {
        theme: {
            extend: {
                colors: {
                    'actsafe-blue': actsafeBlue,
                    'actsafe-yellow': actsafeYellow,
                    'actsafe-yellow-dark': '#E0A300',
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                },
            },
        },
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans" style={{ '--actsafe-blue': actsafeBlue, '--actsafe-yellow': actsafeYellow }}>
      {/* Load Tailwind CSS script */}
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="max-w-4xl mx-auto">

        {/* Header and Title Card - UPDATED */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-8 border-actsafe-yellow mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-actsafe-blue mb-2">
            Your Essential Industry Safety Training Guide
          </h1>
          <p className="text-gray-600 mb-4 text-lg">
            We help you find the **mandatory** and **recommended** training you need to work safely in B.C.'s motion picture, performing arts, and live event industries.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            {/* Keeping the friendly, non-intimidating standard */}
            <span className="px-3 py-1 bg-actsafe-blue text-white rounded-full">Based on B.C. Safety Standards</span>
            <span className="px-3 py-1 bg-gray-200 rounded-full">Free Resource from Actsafe</span>
          </div>
        </div>

        {/* Step 1: Industry Selection */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-actsafe-blue mb-4">
            1. Select Your Industry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INDUSTRIES.map(industry => {
              const Icon = industry.icon;
              const isSelected = selectedIndustryId === industry.id;
              return (
                <button
                  key={industry.id}
                  onClick={() => handleIndustryChange(industry.id)}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.03] shadow-md
                    ${isSelected 
                      ? 'border-actsafe-yellow bg-actsafe-blue text-white ring-4 ring-actsafe-yellow' 
                      : 'border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="font-semibold text-lg">{industry.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Role Selection */}
        {selectedIndustryId && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">
            <RoleSelector 
              roles={availableRoles} 
              selectedRole={selectedRole} 
              onSelectRole={setSelectedRole} 
            />
          </div>
        )}

        {/* Step 3: Results Display */}
        {selectedRole && trainingChecklist.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-actsafe-blue mb-6">
              3. Your Personalized Training Checklist
            </h2>
            
            {/* Mandatory Training Section */}
            {mandatoryTraining.length > 0 && (
              <div className="mb-8 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                <h3 className="text-xl font-semibold text-red-700 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" /> Mandatory Training
                </h3>
                <p className="text-sm text-red-600 mb-4">
                  These courses are generally required by industry regulations or union agreements for your role.
                </p>
                <div className="space-y-3">
                  {mandatoryTraining.map(training => (
                    <TrainingResultCard key={training.id} training={training} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Training Section */}
            {recommendedTraining.length > 0 && (
              <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Recommended Training
                </h3>
                <p className="text-sm text-green-600 mb-4">
                  These courses will enhance your skills and safety knowledge, improving job site compliance.
                </p>
                <div className="space-y-3">
                  {recommendedTraining.map(training => (
                    <TrainingResultCard key={training.id} training={training} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Disclaimer Added Here - REVISED */}
            <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
                <p className="font-semibold mb-1">Important Disclaimer</p>
                <p>
                    This training pathway serves as a general guide based on common industry practices and union requirements. 
                    It is **not** an official legal interpretation of the Workers Compensation Act (WCA) or the OHS Regulation. 
                    For clarification on compliance or best practices specific to your site, please 
                    <a href={ACTSAFE_CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline ml-1 text-actsafe-blue hover:text-actsafe-yellow-dark">contact Actsafe directly</a> for expert OHS advice.
                </p>
            </div>

            {/* CTA Integration - Feature 3: Consulting Lead Generation */}
            <div className="mt-8 text-center p-6 bg-actsafe-blue rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">Need Specialized Safety Guidance?</h3>
              <p className="mb-4 text-sm opacity-90">
                Our OHS consultants can help you discuss site-specific requirements or specialized crew needs for free.
              </p>
              <a 
                // Link updated to ACTSAFE_CONSULTATION_URL (now points to contact-us)
                href={ACTSAFE_CONSULTATION_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-actsafe-yellow text-actsafe-blue font-bold py-2 px-6 rounded-full shadow-lg hover:bg-actsafe-yellow-dark transition duration-300 transform hover:scale-105 inline-block"
              >
                Contact Us {/* Button text updated */}
              </a>
            </div>
          </div>
        )}

        {/* Initial Prompt */}
        {!selectedIndustryId && (
           <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-gray-400">
              <p className="text-gray-500 text-lg">
                Get started by selecting your industry above to unlock your personalized safety pathway.
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default App;

