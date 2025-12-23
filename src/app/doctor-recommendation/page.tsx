'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DoctorRecommendation() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Symptom to specialty mapping
  const symptomSpecialtyMap: Record<string, string[]> = {
    'Chest Pain': ['Cardiologist'],
    'Shortness of Breath': ['Cardiologist', 'General Practitioner'],
    'Headache': ['Neurologist', 'General Practitioner'],
    'Fever': ['General Practitioner'],
    'Cough': ['General Practitioner'],
    'Fatigue': ['General Practitioner'],
    'Joint Pain': ['General Practitioner'],
    'Memory Loss': ['Neurologist'],
    'Dizziness': ['Neurologist', 'General Practitioner'],
    'Nausea': ['General Practitioner']
  };

  const availableSymptoms = [
    'Chest Pain', 'Shortness of Breath', 'Headache', 'Fever', 'Cough',
    'Fatigue', 'Joint Pain', 'Memory Loss', 'Dizziness', 'Nausea'
  ];

  const doctorsByCity: Record<string, any[]> = {
    'New York, USA': [
      { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.8, reviews: 342, experience: '15 years', availableSlots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'], location: 'Downtown Medical Center, 2.3 km away', distance: 2.3, address: '123 Main St, Downtown, NY', phone: '+1-212-555-0101', email: 'sarah.johnson@medicenter.com', hospital: 'Downtown Medical Center' },
      { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.7, reviews: 287, experience: '12 years', availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM'], location: 'Central Health Plaza, 5.8 km away', distance: 5.8, address: '456 Central Ave, NY', phone: '+1-212-555-0102', email: 'michael.chen@healthplaza.com', hospital: 'Central Health Plaza' },
      { id: 3, name: 'Dr. James Wilson', specialty: 'Cardiologist', rating: 4.6, reviews: 215, experience: '8 years', availableSlots: ['8:30 AM', '12:00 PM', '2:30 PM', '5:00 PM'], location: 'West Side Medical, 3.5 km away', distance: 3.5, address: '321 West Lane, NY', phone: '+1-212-555-0103', email: 'james.wilson@westside.com', hospital: 'West Side Medical' }
    ],
    'Los Angeles, USA': [
      { id: 4, name: 'Dr. Emily Rodriguez', specialty: 'General Practitioner', rating: 4.9, reviews: 521, experience: '10 years', availableSlots: ['9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM', '5:00 PM'], location: 'Riverside Clinic, 1.2 km away', distance: 1.2, address: '789 Riverside Rd, LA', phone: '+1-323-555-0104', email: 'emily.rodriguez@riverside.com', hospital: 'Riverside Clinic' },
      { id: 5, name: 'Dr. Lisa Martinez', specialty: 'Neurologist', rating: 4.5, reviews: 198, experience: '9 years', availableSlots: ['10:30 AM', '2:00 PM'], location: 'North Park Hospital, 2.8 km away', distance: 2.8, address: '654 North Blvd, LA', phone: '+1-323-555-0105', email: 'lisa.martinez@northpark.com', hospital: 'North Park Hospital' },
      { id: 6, name: 'Dr. David Thompson', specialty: 'Dermatologist', rating: 4.7, reviews: 156, experience: '11 years', availableSlots: ['9:00 AM', '11:00 AM', '3:00 PM', '4:30 PM'], location: 'Sunset Medical Clinic, 4.1 km away', distance: 4.1, address: '999 Sunset Blvd, LA', phone: '+1-323-555-0106', email: 'david.thompson@sunset.com', hospital: 'Sunset Medical Clinic' }
    ],
    'Chicago, USA': [
      { id: 7, name: 'Dr. Robert Anderson', specialty: 'Cardiologist', rating: 4.8, reviews: 403, experience: '16 years', availableSlots: ['9:00 AM', '1:00 PM', '4:00 PM'], location: 'Chicago Heart Center, 1.8 km away', distance: 1.8, address: '500 Michigan Ave, Chicago', phone: '+1-312-555-0107', email: 'robert.anderson@heartcenter.com', hospital: 'Chicago Heart Center' },
      { id: 8, name: 'Dr. Patricia Brown', specialty: 'General Practitioner', rating: 4.6, reviews: 378, experience: '13 years', availableSlots: ['10:00 AM', '12:30 PM', '2:30 PM', '4:30 PM'], location: 'North Shore Medical, 3.2 km away', distance: 3.2, address: '750 North Shore Dr, Chicago', phone: '+1-312-555-0108', email: 'patricia.brown@northshore.com', hospital: 'North Shore Medical' },
      { id: 9, name: 'Dr. William Davis', specialty: 'Neurologist', rating: 4.7, reviews: 245, experience: '10 years', availableSlots: ['8:30 AM', '11:00 AM', '3:30 PM'], location: 'Downtown Neuro Clinic, 2.5 km away', distance: 2.5, address: '123 Downtown Loop, Chicago', phone: '+1-312-555-0109', email: 'william.davis@neuro.com', hospital: 'Downtown Neuro Clinic' }
    ],
    'Toronto, Canada': [
      { id: 10, name: 'Dr. Jennifer Lee', specialty: 'General Practitioner', rating: 4.9, reviews: 412, experience: '12 years', availableSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'], location: 'Toronto Medical Center, 2.1 km away', distance: 2.1, address: '1000 College St, Toronto', phone: '+1-416-555-0110', email: 'jennifer.lee@torontomedical.com', hospital: 'Toronto Medical Center' },
      { id: 11, name: 'Dr. Carlos Hernandez', specialty: 'Cardiologist', rating: 4.7, reviews: 334, experience: '14 years', availableSlots: ['10:30 AM', '1:30 PM', '3:30 PM'], location: 'Heart Health Clinic, 3.6 km away', distance: 3.6, address: '555 Queen St W, Toronto', phone: '+1-416-555-0111', email: 'carlos.hernandez@hearthealth.com', hospital: 'Heart Health Clinic' },
      { id: 12, name: 'Dr. Michelle Wong', specialty: 'Dermatologist', rating: 4.8, reviews: 289, experience: '11 years', availableSlots: ['9:30 AM', '11:30 AM', '2:30 PM', '4:30 PM', '5:30 PM'], location: 'Skin Care Center, 1.9 km away', distance: 1.9, address: '777 Bloor St, Toronto', phone: '+1-416-555-0112', email: 'michelle.wong@skincare.com', hospital: 'Skin Care Center' }
    ],
    'Vancouver, Canada': [
      { id: 13, name: 'Dr. Alexandra Park', specialty: 'Neurologist', rating: 4.6, reviews: 267, experience: '9 years', availableSlots: ['9:00 AM', '12:00 PM', '3:00 PM'], location: 'Vancouver Brain Clinic, 2.7 km away', distance: 2.7, address: '333 Granville St, Vancouver', phone: '+1-604-555-0113', email: 'alexandra.park@brain.com', hospital: 'Vancouver Brain Clinic' },
      { id: 14, name: 'Dr. Marcus Johnson', specialty: 'Cardiologist', rating: 4.8, reviews: 381, experience: '15 years', availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'], location: 'West Coast Heart Center, 1.5 km away', distance: 1.5, address: '888 Burrard St, Vancouver', phone: '+1-604-555-0114', email: 'marcus.johnson@heartwest.com', hospital: 'West Coast Heart Center' },
      { id: 15, name: 'Dr. Susan Miller', specialty: 'General Practitioner', rating: 4.7, reviews: 298, experience: '10 years', availableSlots: ['9:30 AM', '1:00 PM'], location: 'Medical Plaza, 4.3 km away', distance: 4.3, address: '444 West Broadway, Vancouver', phone: '+1-604-555-0115', email: 'susan.miller@medplaza.com', hospital: 'Medical Plaza' }
    ],
    'London, UK': [
      { id: 16, name: 'Dr. Thomas Bennett', specialty: 'Cardiologist', rating: 4.9, reviews: 567, experience: '17 years', availableSlots: ['9:00 AM', '11:30 AM', '2:00 PM'], location: 'Royal London Hospital, 1.8 km away', distance: 1.8, address: '100 Harley St, London', phone: '+44-20-555-0116', email: 'thomas.bennett@royal.com', hospital: 'Royal London Hospital' },
      { id: 17, name: 'Dr. Emma Thompson', specialty: 'Neurologist', rating: 4.8, reviews: 443, experience: '13 years', availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM'], location: 'St. Mary\'s Clinic, 2.4 km away', distance: 2.4, address: '250 Oxford St, London', phone: '+44-20-555-0117', email: 'emma.thompson@stmarys.com', hospital: 'St. Mary\'s Clinic' },
      { id: 18, name: 'Dr. David Clarke', specialty: 'General Practitioner', rating: 4.7, reviews: 389, experience: '11 years', availableSlots: ['9:30 AM', '11:00 AM', '2:30 PM', '4:30 PM', '5:00 PM'], location: 'Central Medical Practice, 3.1 km away', distance: 3.1, address: '500 Regent St, London', phone: '+44-20-555-0118', email: 'david.clarke@central.com', hospital: 'Central Medical Practice' }
    ],
    'Manchester, UK': [
      { id: 19, name: 'Dr. Katherine Wright', specialty: 'Dermatologist', rating: 4.6, reviews: 312, experience: '9 years', availableSlots: ['10:00 AM', '12:00 PM', '2:30 PM', '4:30 PM'], location: 'Manchester Skin Clinic, 2.2 km away', distance: 2.2, address: '150 Deansgate, Manchester', phone: '+44-161-555-0119', email: 'katherine.wright@skin.com', hospital: 'Manchester Skin Clinic' },
      { id: 20, name: 'Dr. Philip Harris', specialty: 'Cardiologist', rating: 4.8, reviews: 398, experience: '14 years', availableSlots: ['9:00 AM', '1:00 PM'], location: 'Heart Care Manchester, 3.5 km away', distance: 3.5, address: '300 Market St, Manchester', phone: '+44-161-555-0120', email: 'philip.harris@heartcare.com', hospital: 'Heart Care Manchester' }
    ],
    'Berlin, Germany': [
      { id: 21, name: 'Dr. Klaus Mueller', specialty: 'Cardiologist', rating: 4.8, reviews: 456, experience: '16 years', availableSlots: ['9:30 AM', '2:00 PM', '4:00 PM'], location: 'Charité Medical Center, 2.1 km away', distance: 2.1, address: '10 Schumannstr, Berlin', phone: '+49-30-555-0121', email: 'klaus.mueller@charite.com', hospital: 'Charité Medical Center' },
      { id: 22, name: 'Dr. Annika Schmidt', specialty: 'Neurologist', rating: 4.7, reviews: 334, experience: '12 years', availableSlots: ['10:00 AM', '1:30 PM'], location: 'Berlin Neuro Clinic, 4.2 km away', distance: 4.2, address: '50 Kurfürstendamm, Berlin', phone: '+49-30-555-0122', email: 'annika.schmidt@neuro.com', hospital: 'Berlin Neuro Clinic' },
      { id: 23, name: 'Dr. Stefan Weber', specialty: 'General Practitioner', rating: 4.9, reviews: 501, experience: '14 years', availableSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'], location: 'Alexanderplatz Medical, 1.9 km away', distance: 1.9, address: '100 Alexanderplatz, Berlin', phone: '+49-30-555-0123', email: 'stefan.weber@med.com', hospital: 'Alexanderplatz Medical' }
    ],
    'Munich, Germany': [
      { id: 24, name: 'Dr. Gabriele Hoffmann', specialty: 'Dermatologist', rating: 4.6, reviews: 278, experience: '10 years', availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM'], location: 'Munich Skin Center, 2.8 km away', distance: 2.8, address: '75 Marienplatz, Munich', phone: '+49-89-555-0124', email: 'gabriele.hoffmann@skin.com', hospital: 'Munich Skin Center' },
      { id: 25, name: 'Dr. Matthias Bauer', specialty: 'Cardiologist', rating: 4.7, reviews: 412, experience: '13 years', availableSlots: ['9:00 AM', '1:00 PM'], location: 'Bavarian Heart Clinic, 3.2 km away', distance: 3.2, address: '120 Neuschwansteinstr, Munich', phone: '+49-89-555-0125', email: 'matthias.bauer@heart.com', hospital: 'Bavarian Heart Clinic' }
    ],
    'Paris, France': [
      { id: 26, name: 'Dr. Pierre Dubois', specialty: 'Cardiologist', rating: 4.9, reviews: 523, experience: '17 years', availableSlots: ['9:00 AM', '1:00 PM'], location: 'Pitié-Salpêtrière Hospital, 2.3 km away', distance: 2.3, address: '47 Boulevard de l\'Hôpital, Paris', phone: '+33-1-555-0126', email: 'pierre.dubois@hopital.fr', hospital: 'Pitié-Salpêtrière Hospital' },
      { id: 27, name: 'Dr. Marie Leclerc', specialty: 'Neurologist', rating: 4.8, reviews: 445, experience: '14 years', availableSlots: ['10:30 AM', '2:30 PM', '4:00 PM'], location: 'Neurocenter Paris, 3.8 km away', distance: 3.8, address: '100 Avenue des Champs-Élysées, Paris', phone: '+33-1-555-0127', email: 'marie.leclerc@neuro.fr', hospital: 'Neurocenter Paris' },
      { id: 28, name: 'Dr. Jean Laurent', specialty: 'General Practitioner', rating: 4.7, reviews: 401, experience: '11 years', availableSlots: ['9:30 AM', '11:30 AM', '2:00 PM', '4:00 PM', '5:00 PM'], location: 'Central Clinic, 1.7 km away', distance: 1.7, address: '75 Rue de Rivoli, Paris', phone: '+33-1-555-0128', email: 'jean.laurent@clinic.fr', hospital: 'Central Clinic' }
    ],
    'Madrid, Spain': [
      { id: 29, name: 'Dr. Carlos Fernandez', specialty: 'Cardiologist', rating: 4.8, reviews: 489, experience: '15 years', availableSlots: ['9:00 AM', '1:00 PM', '4:00 PM'], location: 'Hospital Universitario, 2.2 km away', distance: 2.2, address: '10 Calle de Serrano, Madrid', phone: '+34-91-555-0129', email: 'carlos.fernandez@hosp.es', hospital: 'Hospital Universitario' },
      { id: 30, name: 'Dr. Isabel Garcia', specialty: 'Dermatologist', rating: 4.6, reviews: 302, experience: '9 years', availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'], location: 'Madrid Skin Clinic, 3.1 km away', distance: 3.1, address: '250 Gran Vía, Madrid', phone: '+34-91-555-0130', email: 'isabel.garcia@skin.es', hospital: 'Madrid Skin Clinic' },
      { id: 31, name: 'Dr. Miguel Rodriguez', specialty: 'Neurologist', rating: 4.7, reviews: 356, experience: '12 years', availableSlots: ['9:30 AM', '12:30 PM'], location: 'Neuro Madrid, 2.9 km away', distance: 2.9, address: '500 Paseo de la Castellana, Madrid', phone: '+34-91-555-0131', email: 'miguel.rodriguez@neuro.es', hospital: 'Neuro Madrid' }
    ],
    'Mumbai, India': [
      { id: 32, name: 'Dr. Rajesh Sharma', specialty: 'Cardiologist', rating: 4.8, reviews: 567, experience: '16 years', availableSlots: ['10:00 AM', '2:00 PM', '4:30 PM'], location: 'Apollo Hospital, 2.4 km away', distance: 2.4, address: '226 Linking Road, Mumbai', phone: '+91-22-555-0132', email: 'rajesh.sharma@apollo.in', hospital: 'Apollo Hospital' },
      { id: 33, name: 'Dr. Priya Patel', specialty: 'General Practitioner', rating: 4.9, reviews: 623, experience: '13 years', availableSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'], location: 'Max Healthcare, 1.8 km away', distance: 1.8, address: '500 Marine Drive, Mumbai', phone: '+91-22-555-0133', email: 'priya.patel@max.in', hospital: 'Max Healthcare' },
      { id: 34, name: 'Dr. Vikram Singh', specialty: 'Neurologist', rating: 4.7, reviews: 412, experience: '11 years', availableSlots: ['10:30 AM', '3:00 PM'], location: 'Fortis Hospital, 3.5 km away', distance: 3.5, address: '750 Bandra Kurla, Mumbai', phone: '+91-22-555-0134', email: 'vikram.singh@fortis.in', hospital: 'Fortis Hospital' }
    ],
    'Delhi, India': [
      { id: 35, name: 'Dr. Amit Desai', specialty: 'Cardiologist', rating: 4.7, reviews: 489, experience: '14 years', availableSlots: ['9:00 AM', '1:00 PM'], location: 'AIIMS Delhi, 3.2 km away', distance: 3.2, address: '100 Ansari Rd, Delhi', phone: '+91-11-555-0135', email: 'amit.desai@aiims.in', hospital: 'AIIMS Delhi' },
      { id: 36, name: 'Dr. Neha Gupta', specialty: 'Dermatologist', rating: 4.8, reviews: 534, experience: '12 years', availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM', '4:30 PM'], location: 'Medanta Healthcare, 2.1 km away', distance: 2.1, address: '250 Saket, Delhi', phone: '+91-11-555-0136', email: 'neha.gupta@medanta.in', hospital: 'Medanta Healthcare' },
      { id: 37, name: 'Dr. Arjun Menon', specialty: 'General Practitioner', rating: 4.6, reviews: 378, experience: '10 years', availableSlots: ['9:30 AM', '12:00 PM', '2:30 PM'], location: 'Apollo Clinic, 1.5 km away', distance: 1.5, address: '500 Connaught Place, Delhi', phone: '+91-11-555-0137', email: 'arjun.menon@apollo.in', hospital: 'Apollo Clinic' }
    ],
    'Tokyo, Japan': [
      { id: 38, name: 'Dr. Hiroshi Tanaka', specialty: 'Cardiologist', rating: 4.9, reviews: 612, experience: '17 years', availableSlots: ['9:30 AM', '1:00 PM', '3:00 PM'], location: 'Tokyo Metropolitan Hospital, 2.3 km away', distance: 2.3, address: '1-4-1 Shinjuku, Tokyo', phone: '+81-3-555-0138', email: 'hiroshi.tanaka@metro.jp', hospital: 'Tokyo Metropolitan Hospital' },
      { id: 39, name: 'Dr. Yuki Suzuki', specialty: 'Neurologist', rating: 4.8, reviews: 501, experience: '13 years', availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'], location: 'Teikyo University Hospital, 3.7 km away', distance: 3.7, address: '2-11-1 Kanda, Tokyo', phone: '+81-3-555-0139', email: 'yuki.suzuki@teikyo.jp', hospital: 'Teikyo University Hospital' },
      { id: 40, name: 'Dr. Kenji Yamamoto', specialty: 'General Practitioner', rating: 4.7, reviews: 445, experience: '11 years', availableSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:30 PM'], location: 'Ginza Clinic, 2.1 km away', distance: 2.1, address: '7-7-7 Ginza, Tokyo', phone: '+81-3-555-0140', email: 'kenji.yamamoto@ginza.jp', hospital: 'Ginza Clinic' }
    ],
    'Sydney, Australia': [
      { id: 41, name: 'Dr. James Mitchell', specialty: 'Cardiologist', rating: 4.8, reviews: 534, experience: '15 years', availableSlots: ['9:00 AM', '1:00 PM', '3:30 PM'], location: 'Royal Prince Alfred Hospital, 2.2 km away', distance: 2.2, address: '50 Missenden Rd, Sydney', phone: '+61-2-555-0141', email: 'james.mitchell@rpah.com.au', hospital: 'Royal Prince Alfred Hospital' },
      { id: 42, name: 'Dr. Sarah Cooper', specialty: 'Dermatologist', rating: 4.7, reviews: 412, experience: '10 years', availableSlots: ['10:30 AM', '2:00 PM', '4:00 PM'], location: 'Sydney Skin Center, 3.4 km away', distance: 3.4, address: '250 Pitt St, Sydney', phone: '+61-2-555-0142', email: 'sarah.cooper@skin.com.au', hospital: 'Sydney Skin Center' },
      { id: 43, name: 'Dr. Michael Brown', specialty: 'General Practitioner', rating: 4.9, reviews: 578, experience: '12 years', availableSlots: ['9:00 AM', '11:00 AM', '1:30 PM', '3:30 PM', '5:00 PM'], location: 'Central Medical, 1.8 km away', distance: 1.8, address: '500 Oxford St, Sydney', phone: '+61-2-555-0143', email: 'michael.brown@central.com.au', hospital: 'Central Medical' }
    ],
    'Singapore, Singapore': [
      { id: 44, name: 'Dr. Tan Wei Ming', specialty: 'Cardiologist', rating: 4.9, reviews: 623, experience: '16 years', availableSlots: ['9:30 AM', '1:00 PM', '3:30 PM'], location: 'National Heart Center, 2.1 km away', distance: 2.1, address: '5 Hospital Drive, Singapore', phone: '+65-555-0144', email: 'tan.weiming@heart.sg', hospital: 'National Heart Center' },
      { id: 45, name: 'Dr. Lim Su Chen', specialty: 'Neurologist', rating: 4.8, reviews: 501, experience: '13 years', availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'], location: 'Singapore General Hospital, 2.8 km away', distance: 2.8, address: '1 Outram Rd, Singapore', phone: '+65-555-0145', email: 'lim.suchen@sgh.sg', hospital: 'Singapore General Hospital' },
      { id: 46, name: 'Dr. Ng Hui Ling', specialty: 'Dermatologist', rating: 4.7, reviews: 445, experience: '11 years', availableSlots: ['9:00 AM', '11:30 AM', '2:30 PM', '4:30 PM'], location: 'Gleneagles Medical, 1.5 km away', distance: 1.5, address: '6A Napier Rd, Singapore', phone: '+65-555-0146', email: 'ng.huiling@gleneagles.sg', hospital: 'Gleneagles Medical' }
    ],
    'São Paulo, Brazil': [
      { id: 47, name: 'Dr. Carlos Silva', specialty: 'Cardiologist', rating: 4.8, reviews: 512, experience: '14 years', availableSlots: ['9:00 AM', '1:00 PM', '3:30 PM'], location: 'Hospital das Clínicas, 2.5 km away', distance: 2.5, address: '500 Avenida Paulista, São Paulo', phone: '+55-11-555-0147', email: 'carlos.silva@hc.br', hospital: 'Hospital das Clínicas' },
      { id: 48, name: 'Dr. Fernanda Costa', specialty: 'General Practitioner', rating: 4.9, reviews: 589, experience: '12 years', availableSlots: ['9:30 AM', '11:00 AM', '2:00 PM', '4:00 PM', '5:00 PM'], location: 'Sabara Hospital, 1.9 km away', distance: 1.9, address: '250 Rua Augusta, São Paulo', phone: '+55-11-555-0148', email: 'fernanda.costa@sabara.br', hospital: 'Sabara Hospital' },
      { id: 49, name: 'Dr. Roberto Santos', specialty: 'Neurologist', rating: 4.6, reviews: 378, experience: '10 years', availableSlots: ['10:30 AM', '2:30 PM', '4:00 PM'], location: 'Einstein Hospital, 3.2 km away', distance: 3.2, address: '750 Avenida Brasil, São Paulo', phone: '+55-11-555-0149', email: 'roberto.santos@einstein.br', hospital: 'Einstein Hospital' }
    ],
    'Dhaka, Bangladesh': [
      { id: 50, name: 'Dr. Mohammad Hasan', specialty: 'Cardiologist', rating: 4.8, reviews: 534, experience: '16 years', availableSlots: ['10:00 AM', '2:00 PM', '4:30 PM'], location: 'Square Hospital, 2.1 km away', distance: 2.1, address: '18/F Block A, Bashundhara, Dhaka', phone: '+880-2-555-0150', email: 'mohammad.hasan@square.com.bd', hospital: 'Square Hospital' },
      { id: 51, name: 'Dr. Fatima Begum', specialty: 'General Practitioner', rating: 4.9, reviews: 612, experience: '13 years', availableSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'], location: 'Apollo Hospitals Dhaka, 1.5 km away', distance: 1.5, address: '39 Banani, Dhaka', phone: '+880-2-555-0151', email: 'fatima.begum@apollo.com.bd', hospital: 'Apollo Hospitals Dhaka' },
      { id: 52, name: 'Dr. Karim Rahman', specialty: 'Neurologist', rating: 4.7, reviews: 445, experience: '11 years', availableSlots: ['10:30 AM', '2:00 PM'], location: 'Labaid Specialized Hospital, 3.2 km away', distance: 3.2, address: '4/A Panthapath, Dhaka', phone: '+880-2-555-0152', email: 'karim.rahman@labaid.com.bd', hospital: 'Labaid Specialized Hospital' },
      { id: 53, name: 'Dr. Nadia Khan', specialty: 'Dermatologist', rating: 4.6, reviews: 389, experience: '10 years', availableSlots: ['9:30 AM', '1:00 PM', '3:30 PM', '4:30 PM'], location: 'Evercare Hospital Dhaka, 2.8 km away', distance: 2.8, address: '1 Aftabnagar, Rampura, Dhaka', phone: '+880-2-555-0153', email: 'nadia.khan@evercare.com.bd', hospital: 'Evercare Hospital Dhaka' }
    ]
  };

  const cities = Object.keys(doctorsByCity).sort();

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setRecommendations([]);
  };

  const handleRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.length === 0 || !selectedCity) return;

    setLoading(true);
    setTimeout(() => {
      const cityDoctors = doctorsByCity[selectedCity] || [];
      const specialties = symptoms.flatMap(symptom => symptomSpecialtyMap[symptom] || []);
      const filtered = cityDoctors
        .filter(doc => specialties.includes(doc.specialty))
        .map(doc => ({ ...doc, matchScore: 70 + Math.floor(Math.random() * 25) }))
        .sort((a, b) => a.distance - b.distance);
      setRecommendations(filtered);
      setLoading(false);
    }, 1200);
  };

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setSelectedSlot('');
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    setBookingConfirmed(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedDoctor(null);
    setSelectedSlot('');
    setBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Recommendation System</h1>
        <p className="text-gray-600 text-lg mb-12">
          Find the best specialist for your symptoms worldwide - nearby doctors recommended first
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Preferences</h2>
            <p className="text-sm text-gray-600 mb-6">Select your city and symptoms to find nearby doctors</p>

            <form onSubmit={handleRecommendation} className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                <h3 className="text-sm font-bold text-gray-800 mb-3">📍 Select Your City</h3>
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-900 font-medium bg-white"
                >
                  <option value="">Choose a city...</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {selectedCity && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900">✓ Selected: <span className="text-blue-600">{selectedCity}</span></p>
                    <p className="text-xs text-gray-600 mt-1">{doctorsByCity[selectedCity]?.length} doctors available</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-3">Your Symptoms</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                  {availableSymptoms.map(symptom => (
                    <label key={symptom} className="flex items-center gap-3 p-3 hover:bg-purple-100 rounded-lg cursor-pointer transition bg-white border border-gray-200">
                      <input
                        type="checkbox"
                        checked={symptoms.includes(symptom)}
                        onChange={() => toggleSymptom(symptom)}
                        className="w-5 h-5 rounded border-2 border-gray-400 accent-purple-600"
                      />
                      <span className="text-gray-800 font-medium">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-300">
                <p className="text-sm font-bold text-gray-800 mb-4">
                  Selected: <span className="text-purple-600">{symptoms.length}</span> symptom{symptoms.length !== 1 ? 's' : ''}
                </p>
                <button
                  type="submit"
                  disabled={loading || symptoms.length === 0 || !selectedCity}
                  className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition text-lg"
                >
                  {loading ? 'Finding Nearby Doctors...' : 'Find Doctors'}
                </button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-3">Matching Features</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Global City Search</li>
                <li>✓ Location-Based Sorting</li>
                <li>✓ Collaborative Filtering</li>
                <li>✓ Symptom Matching</li>
                <li>✓ Rating System</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recommended Doctors</h2>
              {selectedCity && (
                <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  📍 {selectedCity}
                </span>
              )}
            </div>

            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((doctor, idx) => (
                  <div key={doctor.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                          {idx === 0 && (
                            <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-800 rounded">
                              🏆 Nearest
                            </span>
                          )}
                        </div>
                        <p className="text-purple-600 font-semibold">{doctor.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-600">{doctor.matchScore}%</div>
                        <p className="text-xs text-gray-500">Match Score</p>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg mb-4 border-l-4 border-blue-400">
                      <p className="text-sm font-semibold text-gray-900">📍 {doctor.location}</p>
                      <p className="text-xs text-gray-600 mt-1">{doctor.address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-lg font-semibold text-gray-900">⭐ {doctor.rating} ({doctor.reviews} reviews)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="text-lg font-semibold text-gray-900">{doctor.experience}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg mb-4 border-l-4 border-green-400">
                      <p className="text-sm text-green-700">✓ {doctor.availableSlots.join(', ')}</p>
                    </div>

                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">👨‍⚕️</div>
                <p className="text-gray-500">
                  {!selectedCity ? 'Select a city first' : 'Select your symptoms and click "Find Doctors" to see recommendations'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!bookingConfirmed ? (
              <>
                <div className="bg-purple-600 text-white p-6 flex justify-between items-center sticky top-0">
                  <h2 className="text-2xl font-bold">Book Appointment</h2>
                  <button
                    onClick={closeBookingModal}
                    className="text-2xl hover:text-purple-200 transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-8 space-y-6">
                  {/* Doctor Info */}
                  <div className="p-6 bg-linear-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedDoctor.name}</h3>
                    <p className="text-purple-600 font-semibold text-lg mb-4">{selectedDoctor.specialty}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Hospital</p>
                        <p className="font-semibold text-gray-900">{selectedDoctor.hospital}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-semibold text-gray-900">⭐ {selectedDoctor.rating}/5.0</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-bold text-gray-900 mb-4">📞 Contact Details</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900 text-lg">{selectedDoctor.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900 break-all">{selectedDoctor.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold text-gray-900">{selectedDoctor.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-bold text-gray-900 mb-4">📅 Select Time Slot</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedDoctor.availableSlots.map((slot: string) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-lg font-semibold transition ${
                            selectedSlot === slot
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-900 border-2 border-green-400 hover:bg-green-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <p className="text-sm text-gray-700">
                      <strong>✓ Appointment Duration:</strong> 30 minutes
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>✓ Consultation Type:</strong> In-person / Video Call
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>✓ Confirmation:</strong> You will receive SMS & Email confirmation
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={closeBookingModal}
                      className="flex-1 bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      disabled={!selectedSlot}
                      className="flex-1 bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
                
                <div className="bg-green-50 rounded-lg p-8 mb-6 border-2 border-green-200">
                  <p className="text-lg text-gray-700 mb-4">Your appointment has been successfully booked.</p>
                  
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-white rounded-lg border-l-4 border-green-600">
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-bold text-gray-900 text-lg">{selectedDoctor.name}</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm text-gray-600">Time Slot</p>
                      <p className="font-bold text-gray-900 text-lg">{selectedSlot}</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border-l-4 border-purple-600">
                      <p className="text-sm text-gray-600">Hospital</p>
                      <p className="font-bold text-gray-900 text-lg">{selectedDoctor.hospital}</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-bold text-gray-900">{selectedDoctor.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-400">
                  <h4 className="font-bold text-gray-900 mb-3">📋 What to Expect</h4>
                  <ul className="text-left text-gray-700 space-y-2">
                    <li>✓ Check-in 10 minutes before appointment</li>
                    <li>✓ Bring valid ID and health insurance card</li>
                    <li>✓ Confirmation details sent to {selectedDoctor.email}</li>
                    <li>✓ Contact: {selectedDoctor.phone}</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={closeBookingModal}
                    className="bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
                  >
                    Print Confirmation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
