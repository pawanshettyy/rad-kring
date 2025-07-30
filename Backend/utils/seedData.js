const AboutContent = require('../models/AboutContent');
const News = require('../models/News');
const PrivacyPolicy = require('../models/PrivacyPolicy');

const seedAboutContent = async () => {
  try {
    // Check if about content already exists
    const existingContent = await AboutContent.countDocuments();
    if (existingContent > 0) {
      console.log('About content already exists, skipping seed...');
      return;
    }

    const aboutSections = [
      {
        section: 'hero',
        title: 'RAD KRING AVIATION',
        subtitle: 'Pioneering the Future of Urban Air Mobility',
        content: 'We are revolutionizing urban transportation with our cutting-edge eVTOL (Electric Vertical Takeoff and Landing) aircraft, making air travel accessible, sustainable, and efficient for everyone.',
        order: 1,
        metadata: {
          layout: 'center',
          backgroundColor: '#000000'
        }
      },
      {
        section: 'mission',
        title: 'Our Mission',
        content: 'To democratize air travel by providing safe, sustainable, and affordable eVTOL transportation solutions that connect communities and reduce urban congestion while minimizing environmental impact.',
        order: 2,
        metadata: {
          layout: 'left'
        }
      },
      {
        section: 'vision',
        title: 'Our Vision',
        content: 'To create a world where flying cars are not just science fiction but an integral part of daily urban transportation, making cities more connected, efficient, and livable for everyone.',
        order: 3,
        metadata: {
          layout: 'right'
        }
      },
      {
        section: 'values',
        title: 'Our Values',
        content: 'Safety First • Innovation Excellence • Environmental Responsibility • Customer Focus • Integrity & Transparency • Continuous Improvement',
        order: 4,
        metadata: {
          layout: 'center'
        }
      },
      {
        section: 'history',
        title: 'Our Journey',
        content: 'Founded in 2023, RAD KRING AVIATION emerged from a vision to transform urban mobility. Our team of aerospace engineers, designers, and innovators came together with a shared passion for creating the future of transportation. From our first prototype to our advanced Sankalpa v1 aircraft, we have consistently pushed the boundaries of what\'s possible in electric aviation.',
        order: 5,
        metadata: {
          layout: 'full-width'
        }
      },
      {
        section: 'achievements',
        title: 'Key Achievements',
        content: '✈️ Successfully developed Sankalpa v1 eVTOL prototype\n🏆 Zero-emission flight technology\n🔋 Advanced battery management systems\n🛡️ Industry-leading safety protocols\n🌍 Made in India, Built for the World',
        order: 6,
        metadata: {
          layout: 'center'
        }
      }
    ];

    await AboutContent.insertMany(aboutSections);
    console.log('✅ About content seeded successfully');

  } catch (error) {
    console.error('❌ Error seeding about content:', error);
  }
};

const seedNews = async () => {
  try {
    // Check if news already exists
    const existingNews = await News.countDocuments();
    if (existingNews > 0) {
      console.log('News articles already exist, skipping seed...');
      return;
    }

    const newsArticles = [
      {
        title: 'RAD KRING AVIATION Announces Sankalpa v1 eVTOL Aircraft',
        excerpt: 'Revolutionary electric vertical takeoff and landing aircraft designed for urban air mobility, featuring zero-emission technology and advanced safety systems.',
        content: `RAD KRING AVIATION is proud to announce the launch of our flagship eVTOL aircraft, the Sankalpa v1. This groundbreaking aircraft represents years of research and development in electric aviation technology.

Key Features:
- 100% electric propulsion system
- 6-passenger capacity
- Advanced safety protocols
- Zero-emission flight
- Innovative design for urban environments

The Sankalpa v1 is designed to revolutionize urban transportation by providing a clean, efficient, and safe alternative to traditional ground transportation. With its vertical takeoff and landing capabilities, the aircraft can operate from designated vertiports throughout urban areas.

"This is just the beginning of our journey to transform urban mobility," said the RAD KRING AVIATION team. "The Sankalpa v1 represents our commitment to creating sustainable transportation solutions for the future."`,
        category: 'announcement',
        tags: ['eVTOL', 'electric aircraft', 'urban mobility', 'Sankalpa v1'],
        featured: true,
        seoTitle: 'RAD KRING AVIATION Sankalpa v1 eVTOL Aircraft Launch',
        seoDescription: 'Discover the revolutionary Sankalpa v1 eVTOL aircraft by RAD KRING AVIATION - zero-emission urban air mobility solution.'
      },
      {
        title: 'The Future of Urban Air Mobility is Electric',
        excerpt: 'Exploring how electric aviation technology is set to transform city transportation and reduce urban congestion while promoting environmental sustainability.',
        content: `The urban transportation landscape is on the verge of a revolutionary transformation. Electric Vertical Takeoff and Landing (eVTOL) aircraft are emerging as the solution to urban congestion, environmental concerns, and the growing need for efficient transportation.

Why Electric Aviation Matters:

1. Environmental Impact
Electric aircraft produce zero direct emissions, contributing to cleaner air in urban environments. This is crucial as cities worldwide grapple with air pollution and climate change.

2. Noise Reduction
Unlike traditional helicopters, eVTOL aircraft are significantly quieter, making them suitable for urban operations without disturbing communities.

3. Efficiency
Direct point-to-point travel eliminates the need for ground infrastructure like roads and bridges, dramatically reducing travel times.

4. Accessibility
eVTOL aircraft can reach areas that are difficult to access by traditional transportation, improving connectivity for underserved communities.

The technology behind electric aviation has advanced rapidly, with improvements in battery technology, electric motors, and autonomous flight systems making commercial eVTOL operations increasingly viable.

At RAD KRING AVIATION, we're committed to leading this transformation with our innovative approach to electric aircraft design and urban air mobility solutions.`,
        category: 'technology',
        tags: ['electric aviation', 'urban mobility', 'sustainability', 'future transport'],
        featured: true,
        seoTitle: 'Electric Aviation: Future of Urban Air Mobility',
        seoDescription: 'Learn about electric aviation technology and its role in transforming urban transportation with zero-emission eVTOL aircraft.'
      },
      {
        title: 'Safety First: Our Approach to eVTOL Aircraft Design',
        excerpt: 'Comprehensive overview of the safety protocols, redundant systems, and rigorous testing procedures that make RAD KRING AVIATION aircraft industry leaders in safety.',
        content: `Safety is not just a priority at RAD KRING AVIATION – it's the foundation upon which every decision is made. Our approach to eVTOL aircraft safety encompasses multiple layers of protection, advanced technology, and rigorous testing protocols.

Multi-Layered Safety Systems:

1. Redundant Propulsion
Our aircraft feature multiple independent propulsion systems, ensuring safe flight even if individual components fail.

2. Advanced Flight Controls
Automated flight management systems continuously monitor aircraft performance and can take corrective action when needed.

3. Emergency Protocols
Comprehensive emergency procedures and backup systems ensure passenger safety in all scenarios.

4. Rigorous Testing
Every component undergoes extensive testing under various conditions to ensure reliability and safety.

5. Pilot Training
Comprehensive training programs ensure our pilots are prepared for all flight scenarios.

Regulatory Compliance:
We work closely with aviation authorities to ensure our aircraft meet and exceed all safety requirements. Our commitment to transparency and collaboration with regulators helps establish industry standards for eVTOL operations.

Continuous Improvement:
Safety is an ongoing commitment. We continuously analyze flight data, incorporate feedback, and implement improvements to enhance safety across all operations.

"Safety isn't just about technology – it's about culture, training, and a commitment to excellence in every aspect of our operations," emphasizes our safety team.`,
        category: 'technology',
        tags: ['safety', 'aircraft design', 'eVTOL', 'aviation standards'],
        featured: false,
        seoTitle: 'eVTOL Aircraft Safety: RAD KRING AVIATION Standards',
        seoDescription: 'Discover the comprehensive safety systems and protocols that make RAD KRING AVIATION eVTOL aircraft industry leaders.'
      }
    ];

    await News.insertMany(newsArticles);
    console.log('✅ News articles seeded successfully');

  } catch (error) {
    console.error('❌ Error seeding news:', error);
  }
};

const seedPrivacyPolicy = async () => {
  try {
    // Check if privacy policy already exists
    const existingPolicy = await PrivacyPolicy.countDocuments();
    if (existingPolicy > 0) {
      console.log('Privacy policy already exists, skipping seed...');
      return;
    }

    const privacyPolicyData = {
      version: '1.0',
      title: 'Privacy Policy',
      lastUpdated: new Date(),
      effectiveDate: new Date(),
      sections: [
        {
          heading: 'Information We Collect',
          content: 'We collect information you provide directly to us, such as when you create an account, book a flight, contact us, or subscribe to our newsletter. This may include your name, email address, phone number, payment information, and flight preferences.',
          order: 1
        },
        {
          heading: 'How We Use Your Information',
          content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and comply with legal obligations. We may also use your information for safety and security purposes.',
          order: 2
        },
        {
          heading: 'Information Sharing',
          content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers, legal authorities when required, and in connection with business transfers.',
          order: 3
        },
        {
          heading: 'Data Security',
          content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
          order: 4
        },
        {
          heading: 'Your Rights',
          content: 'You have the right to access, update, or delete your personal information. You may also opt out of certain communications and request information about how your data is processed. Contact us to exercise these rights.',
          order: 5
        },
        {
          heading: 'Cookies and Tracking',
          content: 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can manage cookie preferences through your browser settings.',
          order: 6
        },
        {
          heading: 'Changes to This Policy',
          content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.',
          order: 7
        }
      ],
      contactInfo: {
        email: 'privacy@radkringaviation.com',
        address: 'Aviation Hub, India',
        phone: '+91 (555) 123-4567'
      },
      isActive: true,
      complianceRegions: ['GDPR', 'CCPA', 'India-PDPB']
    };

    await PrivacyPolicy.create(privacyPolicyData);
    console.log('✅ Privacy policy seeded successfully');

  } catch (error) {
    console.error('❌ Error seeding privacy policy:', error);
  }
};

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...');
  
  await seedAboutContent();
  await seedNews();
  await seedPrivacyPolicy();
  
  console.log('🎉 Database seeding completed!');
};

module.exports = {
  seedDatabase,
  seedAboutContent,
  seedNews,
  seedPrivacyPolicy
};
