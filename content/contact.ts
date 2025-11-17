// content/contact.ts

// ================================
//  CORE COLORS / TOKENS
// ================================
export const DSA_PURPLE = '#40327E' as const;

export const CONTACT_COLORS = {
  pageBg: '#000C05',
  textMain: '#ECEBC7',
  textSoft: '#ECEBC7B3',
  accentPurple: DSA_PURPLE,
  accentGreen: '#336341',
  borderSoft: '#2B3B33',
  cardBg: '#050F0A',
} as const;

// ================================
//  TYPES
// ================================
export interface OfficeCity {
  id: string;
  label: string;
  addressLines: string[];
}

export interface ContactChannel {
  title: string;
  email: string;
  phoneLines: string[];
}

export interface ContactSectionCopy {
  contactHeading: string;
  addressHeading: string;
  business: ContactChannel;
  career: ContactChannel;
}

export interface JoinUsCopy {
  heading: string;
  bodyLines: string[];
  noteLines: string[];
  resumeButtonLabel: string;
  portfolioButtonLabel: string;
  submitButtonLabel: string;
}

export interface FormPlaceholders {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  statusLabel: string;
  locationLabel: string;
  positionLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
}

// ================================
//  TEXT CONTENT
// ================================
export const contactSectionCopy: ContactSectionCopy = {
  contactHeading: 'Contact Us',
  addressHeading: 'Address',
  business: {
    title: 'Business Collaboration',
    email: 'dayoung@dayoung.work',
    phoneLines: ['+86 177 2268 4557', '+86 755 88878571'],
  },
  career: {
    title: 'Career',
    email: 'job@dayoung.work',
    phoneLines: ['+86 177 2784 7995'],
  },
};

export const offices: OfficeCity[] = [
  {
    id: 'shenzhen',
    label: 'Shenzhen',
    addressLines: [
      '13A Floor, Cultural and Sports Industry HQ Tower,',
      'Futian Sports Park, Futian District, Shenzhen, China',
    ],
  },
  {
    id: 'shanghai',
    label: 'Shanghai',
    addressLines: [
      '270-1b ZhongYi Building, NanJin East Road,',
      'Huang Pu District, Shanghai, China',
    ],
  },
  {
    id: 'singapore',
    label: 'Singapore',
    addressLines: ['73 Holland Grove View, Singapore 276230'],
  },
  // Paris is in the tab bar but no address given, easy to add later:
  {
    id: 'paris',
    label: 'Paris',
    addressLines: ['(Coming soon)'],
  },
];

export const joinUsCopy: JoinUsCopy = {
  heading: 'Join Us',
  bodyLines: [
    'Our company is constantly seeking designers who are passionate about the aesthetic design of new ecological art, love landscape, light and shadow, public art, have graduated from relevant design majors, possess high artistic accomplishment and aesthetic sense, and have working experience in high-quality design companies to join the DSA team.',
    'We offer job opportunities for project manager, environmental update designer, assistant designer and intern positions.',
  ],
  noteLines: [
    'Please submit your resume and portfolio.',
    'Each file should not exceed 50mb.',
  ],
  resumeButtonLabel: 'Resume',
  portfolioButtonLabel: 'Portfolio',
  submitButtonLabel: 'Submit',
};

export const formPlaceholders: FormPlaceholders = {
  firstName: 'First name',
  lastName: 'Last name',
  mobile: '+00',
  email: 'email@gmail.com',
  statusLabel: 'Status',
  locationLabel: 'Location',
  positionLabel: 'Position',
  messageLabel: 'Your message',
  messagePlaceholder: 'Leave your message',
};

// ================================
//  DROPDOWN OPTIONS
// ================================
export const STATUS_OPTIONS = [
  'Employed',
  'Unemployed',
  'Student',
  'Freelancer',
] as const;

export const POSITION_OPTIONS = [
  'Project Manager',
  'Environmental Update Designer',
  'Assistant Designer',
  'Intern',
] as const;

// by default we use the same list as the office tabs,
// but you can decouple later if needed
export const LOCATION_OPTIONS = offices.map((o) => o.label);

// ================================
//  ERROR / MODAL COPY
// ================================
export const submissionErrorCopy = {
  title: 'Submission Incomplete',
  message:
    'Please fill in all required fields and upload your resume and portfolio before submitting.',
  primaryButtonLabel: 'Okay',
  secondaryButtonLabel: 'Cancel',
} as const;