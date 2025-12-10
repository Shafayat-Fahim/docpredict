'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DiseasePrediction() {
  const [selectedDisease, setSelectedDisease] = useState('cancer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Disease to specialty mapping - CRITICAL: Must match exactly with doctorsBySpecialty keys
  const diseaseSpecialtyMap: Record<string, string> = {
    'cancer': 'Oncologist',
    'heart': 'Cardiologist',
    'alzheimer': 'Neurologist',
    'chronic': 'General Practitioner'
  };

  // Doctors database mapped by specialty for recommendations
  const doctorsBySpecialty: Record<string, any[]> = {
    'Oncologist': [
      { name: 'Dr. Sarah Johnson', specialty: 'Oncologist', rating: 4.9, reviews: 456, experience: '18 years', hospital: 'Cancer Care Center', phone: '+1-212-555-0147', email: 'sarah.johnson@cancercare.com', availableSlots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
      { name: 'Dr. Emma Rodriguez', specialty: 'Oncologist', rating: 4.8, reviews: 389, experience: '15 years', hospital: 'Memorial Medical Center', phone: '+1-212-555-0198', email: 'emma.rodriguez@memorial.com', availableSlots: ['9:00 AM', '11:30 AM', '3:00 PM'] },
      { name: 'Dr. Michael Zhang', specialty: 'Oncologist', rating: 4.7, reviews: 312, experience: '12 years', hospital: 'St. Luke\'s Hospital', phone: '+1-212-555-0156', email: 'michael.zhang@stlukes.com', availableSlots: ['1:00 PM', '3:30 PM', '5:00 PM'] }
    ],
    'Cardiologist': [
      { name: 'Dr. Robert Anderson', specialty: 'Cardiologist', rating: 4.9, reviews: 523, experience: '19 years', hospital: 'Heart Health Institute', phone: '+1-212-555-0102', email: 'robert.anderson@hearthealth.com', availableSlots: ['9:30 AM', '1:00 PM', '4:00 PM'] },
      { name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.8, reviews: 467, experience: '16 years', hospital: 'Cardiovascular Center', phone: '+1-212-555-0147', email: 'sarah.johnson@cardio.com', availableSlots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
      { name: 'Dr. James Wilson', specialty: 'Cardiologist', rating: 4.7, reviews: 401, experience: '13 years', hospital: 'Downtown Medical Center', phone: '+1-212-555-0189', email: 'james.wilson@downtown.com', availableSlots: ['11:00 AM', '3:00 PM', '5:30 PM'] }
    ],
    'Neurologist': [
      { name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.9, reviews: 478, experience: '17 years', hospital: 'Neurology Excellence', phone: '+1-212-555-0145', email: 'michael.chen@neuro.com', availableSlots: ['9:00 AM', '1:30 PM', '4:00 PM'] },
      { name: 'Dr. Patricia Brown', specialty: 'Neurologist', rating: 4.8, reviews: 423, experience: '14 years', hospital: 'Brain & Spine Institute', phone: '+1-212-555-0163', email: 'patricia.brown@brainspine.com', availableSlots: ['10:30 AM', '2:30 PM', '5:00 PM'] },
      { name: 'Dr. David Kumar', specialty: 'Neurologist', rating: 4.7, reviews: 356, experience: '11 years', hospital: 'Central Neuro Clinic', phone: '+1-212-555-0177', email: 'david.kumar@neuro.com', availableSlots: ['8:30 AM', '12:00 PM', '3:30 PM'] }
    ],
    'General Practitioner': [
      { name: 'Dr. Emily Green', specialty: 'General Practitioner', rating: 4.9, reviews: 612, experience: '14 years', hospital: 'Primary Care Clinic', phone: '+1-212-555-0152', email: 'emily.green@primarycare.com', availableSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
      { name: 'Dr. John Smith', specialty: 'General Practitioner', rating: 4.8, reviews: 534, experience: '12 years', hospital: 'Community Health Center', phone: '+1-212-555-0168', email: 'john.smith@community.com', availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'] },
      { name: 'Dr. Lisa Anderson', specialty: 'General Practitioner', rating: 4.7, reviews: 489, experience: '10 years', hospital: 'City Medical Associates', phone: '+1-212-555-0174', email: 'lisa.anderson@citymed.com', availableSlots: ['9:30 AM', '12:30 PM', '2:30 PM', '4:30 PM'] }
    ]
  };

  const diseases = {
    cancer: {
      name: 'Cancer Detection',
      algorithm: 'CNN (Convolutional Neural Network)',
      inputFields: [
        { name: 'Age', type: 'number', placeholder: 'Enter age (18-100)' },
        { name: 'Tumor Size', type: 'number', placeholder: 'Enter tumor size (cm)', step: '0.1' },
        { name: 'Cell Type', type: 'select', options: ['Benign', 'Malignant', 'Carcinoma', 'Adenocarcinoma'] }
      ],
      description: 'Predicts cancer risk based on medical parameters using deep learning'
    },
    heart: {
      name: 'Heart Disease',
      algorithm: 'Random Forest',
      inputFields: [
        { name: 'Age', type: 'number', placeholder: 'Enter age (18-100)' },
        { name: 'Blood Pressure', type: 'text', placeholder: 'e.g., 120/80' },
        { name: 'Cholesterol', type: 'number', placeholder: 'Enter cholesterol level (mg/dL)' },
        { name: 'Heart Rate', type: 'number', placeholder: 'Enter heart rate (bpm)' }
      ],
      description: 'Assesses cardiovascular disease risk using ensemble learning'
    },
    alzheimer: {
      name: "Alzheimer's Detection",
      algorithm: 'LSTM (Long Short-Term Memory)',
      inputFields: [
        { name: 'Age', type: 'number', placeholder: 'Enter age (18-100)' },
        { name: 'Memory Score', type: 'number', placeholder: 'Enter score (0-100)' },
        { name: 'Cognitive Test', type: 'number', placeholder: 'Enter test score (0-100)' }
      ],
      description: 'Evaluates Alzheimer\'s risk using sequential neural networks'
    },
    chronic: {
      name: 'Chronic Disease',
      algorithm: 'SVM (Support Vector Machine)',
      inputFields: [
        { name: 'Age', type: 'number', placeholder: 'Enter age (18-100)' },
        { name: 'BMI', type: 'number', placeholder: 'Enter BMI (kg/m²)', step: '0.1' },
        { name: 'Blood Sugar', type: 'number', placeholder: 'Enter glucose level (mg/dL)' },
        { name: 'Disease History', type: 'select', options: ['None', 'Hypertension', 'Diabetes', 'Both', 'Other'] }
      ],
      description: 'Predicts chronic disease susceptibility using support vectors'
    }
  };

  const current = diseases[selectedDisease as keyof typeof diseases];

  const handlePrediction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const specialty = diseaseSpecialtyMap[selectedDisease as keyof typeof diseaseSpecialtyMap];
      const doctors = doctorsBySpecialty[specialty] || [];
      
      setResult({
        risk: Math.floor(Math.random() * 100),
        confidence: Math.floor(Math.random() * 100) + 70,
        recommendation: `Please consult with a ${specialty} for diagnosis and treatment`,
        specialty: specialty,
        recommendedDoctors: doctors
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Disease Prediction Models</h1>
        <p className="text-gray-600 text-lg mb-12">
          Select a disease type and enter patient parameters to get AI-powered predictions
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {Object.entries(diseases).map(([key, disease]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedDisease(key);
                setResult(null);
              }}
              className={`p-4 rounded-lg font-semibold transition ${
                selectedDisease === key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              {disease.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.name}</h2>
            <p className="text-gray-600 mb-6">{current.description}</p>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Algorithm:</strong> {current.algorithm}
              </p>
            </div>

            <form onSubmit={handlePrediction} className="space-y-5">
              {current.inputFields.map((field: any, idx: number) => (
                <div key={idx}>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    {field.name} <span className="text-red-600">*</span>
                  </label>
                  {field.type === 'select' ? (
                    <select
                      required
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-gray-900 font-medium bg-white"
                    >
                      <option value="">Select {field.name}...</option>
                      {field.options.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      step={field.step || 'any'}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-gray-900 font-medium placeholder-gray-600 bg-white"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition text-lg"
              >
                {loading ? 'Analyzing...' : 'Get Prediction'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
            
            {result ? (
              <div className="space-y-6">
                <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Risk Score</p>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-indigo-600">{result.risk}%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          result.risk > 70 ? 'bg-red-500' : result.risk > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${result.risk}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Model Confidence</p>
                  <p className="text-3xl font-bold text-green-600">{result.confidence}%</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <p className="text-sm font-semibold text-gray-900 mb-2">⚠️ Important</p>
                  <p className="text-gray-700">{result.recommendation}</p>
                </div>

                <div className="text-xs text-gray-500 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Note:</strong> This is a demonstration using simulated data. Real predictions would integrate actual ML models trained on medical datasets.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📊</div>
                <p className="text-gray-500">Fill in the patient parameters and click "Get Prediction" to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Doctors Section */}
        {result && result.recommendedDoctors && result.recommendedDoctors.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Recommended {result.specialty}s</h3>
            <p className="text-gray-600 mb-6">Based on your prediction results, here are the top specialists for you:</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {result.recommendedDoctors.map((doctor: any, idx: number) => (
                <div key={idx} className="p-6 border-2 border-indigo-200 rounded-lg hover:shadow-lg transition">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-gray-900">{doctor.name}</h4>
                    <p className="text-indigo-600 font-semibold text-sm">{doctor.specialty}</p>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-700"><strong>{doctor.rating}</strong> ({doctor.reviews} reviews)</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Experience:</strong> {doctor.experience}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Hospital:</strong> {doctor.hospital}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg mb-4 border-l-4 border-blue-400">
                    <p className="text-xs text-gray-600"><strong>Phone:</strong> {doctor.phone}</p>
                    <p className="text-xs text-gray-600 break-all"><strong>Email:</strong> {doctor.email}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Available Time Slots:</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availableSlots.map((slot: string) => (
                        <span key={slot} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition">
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Models Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Algorithms Used</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🧠 Deep Learning Models</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>CNN:</strong> For image-based analysis (medical imaging)</li>
                <li>• <strong>LSTM:</strong> For sequential temporal data</li>
                <li>• <strong>Autoencoders:</strong> For feature extraction</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">⚙️ Machine Learning Models</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>SVM:</strong> For classification tasks</li>
                <li>• <strong>Random Forest:</strong> For ensemble predictions</li>
                <li>• <strong>Gradient Boosting:</strong> For improved accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
