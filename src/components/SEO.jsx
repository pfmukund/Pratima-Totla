/**
 * Per-route SEO. Uses React 19 native document metadata hoisting —
 * <title>/<meta>/<link>/<script> rendered inside any component automatically
 * land in <head>. No react-helmet dependency required.
 *
 * Pass per-page title/description/canonical/image. Person JSON-LD is included
 * once on every page so search engines have rich subject understanding.
 */
const SITE_URL = 'https://pratimatotla.com';
const DEFAULT_IMAGE = '/img/personas/cultural-icon.webp';

const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Dr. Pratima Totla',
  alternateName: 'Pratima Totla',
  jobTitle: 'National Secretary, Republican Party of India (Athawale)',
  description:
    'Social leader, public communicator, cultural icon, and political organiser. National Secretary of the Republican Party of India under Shri Ramdas Athawale; Mrs. India Fashion Icon 2017; producer of the Hindi feature film The Hundred Bucks (2020); International Chairperson of the Anti-Corruption Foundation of India.',
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_IMAGE}`,
  birthDate: '1976-06-27',
  birthPlace: { '@type': 'Place', name: 'Rajasthan, India' },
  nationality: { '@type': 'Country', name: 'India' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Rajasthan' },
  honorificPrefix: 'Dr.',
  award: [
    'Honorary Doctorate, Academy of Universal Global Peace, USA',
    'World Icon Award (Sri Lanka, 2018)',
    'Mrs. India Fashion Icon (2017)',
    'Brand Ambassador, Mrs. Heritage World (2017)',
    'Top 50 Indian Icon Award (Mumbai)',
    'International Cultural Award, Vishnu Temple, Bangkok',
    'Nari Shakti Samman Award',
    'Rashtra Gaurav Award',
  ],
  affiliation: [
    { '@type': 'Organization', name: 'Republican Party of India (Athawale)', url: 'https://depwd.gov.in/en/sri-ramdas-athawale/' },
    { '@type': 'Organization', name: 'Anti-Corruption Foundation of India' },
    { '@type': 'Organization', name: 'Rajasthan International Film Festival', url: 'https://www.riffjaipur.org/' },
  ],
  sameAs: [
    'https://www.instagram.com/pratimatotla/',
    'https://www.facebook.com/DrPratimaTotla/',
    'https://in.linkedin.com/in/dr-pratima-totla-0a867814b',
    'https://x.com/pratimatotla',
    'https://www.imdb.com/title/tt12583836/',
    'https://finance.yahoo.com/news/pratima-totla-joins-rpi-appointed-044500877.html',
  ],
};

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Dr. Pratima Totla — Official Portfolio',
  publisher: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} · Dr. Pratima Totla`
    : 'Dr. Pratima Totla — Leadership with Purpose';
  const desc =
    description ||
    'Official portfolio of Dr. Pratima Totla — National Secretary, Republican Party of India. Cultural icon, public communicator, and global voice for dignity, equality, and citizen-first leadership.';
  const url = `${SITE_URL}${path}`;
  const fullImage = `${SITE_URL}${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="author" content="Dr. Pratima Totla" />
      <meta name="keywords" content="Pratima Totla, Dr Pratima Totla, RPI National Secretary, Mrs India Fashion Icon, The Hundred Bucks producer, Anti-Corruption Foundation India, Ramdas Athawale, Rajasthan International Film Festival, I Can campaign, Indian women leadership, Ambedkarite politics" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="og:site_name" content="Dr. Pratima Totla" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@pratimatotla" />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }} />
    </>
  );
}
