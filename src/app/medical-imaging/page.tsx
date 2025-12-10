'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MedicalImaging() {
  const [selectedImaging, setSelectedImaging] = useState('mri');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const imagingTypes = {
    mri: {
      name: 'MRI Scan',
      fullName: 'Magnetic Resonance Imaging',
      description: 'High-resolution anatomical imaging for soft tissue analysis',
      applications: ['Brain tumors', 'Spinal cord injuries', 'Organ assessment', 'Joint damage']
    },
    ct: {
      name: 'CT Scan',
      fullName: 'Computed Tomography',
      description: 'Cross-sectional imaging for detailed internal structure visualization',
      applications: ['Lung cancer detection', 'Abdominal imaging', 'Bone fractures', 'Internal bleeding']
    },
    xray: {
      name: 'X-Ray',
      fullName: 'Radiography',
      description: 'Quick imaging for bone and initial chest assessments',
      applications: ['Fracture detection', 'Chest radiography', 'Dental imaging', 'Foreign objects']
    },
    pet: {
      name: 'PET Scan',
      fullName: 'Positron Emission Tomography',
      description: 'Metabolic imaging for cancer detection and disease activity',
      applications: ['Cancer detection', 'Alzheimer diagnosis', 'Cardiac viability', 'Infection detection']
    }
  };

  const current = imagingTypes[selectedImaging as keyof typeof imagingTypes];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!uploadedImage) return;
    
    setLoading(true);
    // Simulate analysis processing
    setTimeout(() => {
      setAnalysis({
        type: current.name,
        findings: [
          'Anatomically normal structure detected',
          'No significant abnormalities identified',
          'Tissue density within normal range',
          'Clear visualization of region of interest'
        ],
        confidence: Math.floor(Math.random() * 20) + 80,
        recommendation: 'Results appear normal. Clinical correlation recommended.',
        processingTime: '2.3 seconds'
      });
      setLoading(false);
    }, 2300);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-green-600 hover:text-green-800 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Imaging Analysis</h1>
        <p className="text-gray-600 text-lg mb-12">
          Advanced AI-powered analysis of medical images using deep learning segmentation and classification
        </p>

        <div className="grid md:grid-cols-4 gap-3 mb-12">
          {Object.entries(imagingTypes).map(([key, imaging]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedImaging(key);
                setAnalysis(null);
              }}
              className={`p-3 rounded-lg font-semibold text-sm transition ${
                selectedImaging === key
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              {imaging.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image Upload and Preview */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.fullName}</h2>
            <p className="text-gray-600 mb-6">{current.description}</p>

            <div className="mb-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">Primary Uses:</h3>
              <ul className="space-y-2">
                {current.applications.map((app, idx) => (
                  <li key={idx} className="text-sm text-gray-700">✓ {app}</li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center mb-6 bg-gray-50">
              {uploadedImage ? (
                <div>
                  <img
                    src={uploadedImage}
                    alt="Uploaded medical image"
                    className="max-w-full h-auto mx-auto rounded-lg mb-4 max-h-64"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-sm font-bold text-red-600 hover:text-red-800 hover:underline"
                  >
                    ✕ Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">🖼️</div>
                  <label className="cursor-pointer block">
                    <span className="text-gray-900 font-bold text-lg hover:text-green-700 transition">
                      Click to upload medical image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-700 font-medium mt-2">or drag and drop</p>
                  <p className="text-sm text-gray-600 font-medium mt-1">PNG, JPG, DICOM up to 50MB</p>
                </div>
              )}
            </div>

            <button
              onClick={handleAnalysis}
              disabled={!uploadedImage || loading}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition text-lg"
            >
              {loading ? 'Analyzing Image...' : 'Analyze Image'}
            </button>
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>

            {analysis ? (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-gray-600 mb-2">Imaging Type</p>
                  <p className="text-xl font-bold text-gray-900">{analysis.type}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">Key Findings</p>
                  <ul className="space-y-2">
                    {analysis.findings.map((finding: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700">
                        ✓ {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Model Confidence</p>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-yellow-600">{analysis.confidence}%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-yellow-500"
                        style={{ width: `${analysis.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm font-semibold text-gray-900 mb-2">📋 Clinical Recommendation</p>
                  <p className="text-gray-700 text-sm">{analysis.recommendation}</p>
                </div>

                <div className="text-xs text-gray-500 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Processing Time:</strong> {analysis.processingTime}</p>
                  <p className="mt-2"><strong>Note:</strong> This is a demonstration. Real analysis would use trained deep learning models (CNN, U-Net) for segmentation and classification on actual medical data.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📊</div>
                <p className="text-gray-500">Upload a {current.name.toLowerCase()} image to see AI-powered analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* Technologies & Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Technologies</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Convolutional Neural Networks (CNN)</h4>
                <p className="text-sm text-gray-600">
                  Extract spatial features from medical images for classification
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">U-Net Architecture</h4>
                <p className="text-sm text-gray-600">
                  Precise segmentation of organs and tumors from medical imaging
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">ResNet Models</h4>
                <p className="text-sm text-gray-600">
                  Deep residual networks for accurate disease classification
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Analysis Pipeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Image Preprocessing</p>
                  <p className="text-sm text-gray-600">Normalize, enhance, and prepare image data</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Feature Extraction</p>
                  <p className="text-sm text-gray-600">Extract relevant patterns using deep learning</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Segmentation & Classification</p>
                  <p className="text-sm text-gray-600">Identify regions of interest and classify findings</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Clinical Report Generation</p>
                  <p className="text-sm text-gray-600">Produce interpretable results for clinicians</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Integration with Diagnosis Pipeline</h3>
          <p className="text-gray-600 mb-6">
            Medical imaging analysis can be seamlessly integrated with disease prediction and doctor recommendation systems:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-green-200 rounded-lg">
              <p className="font-semibold text-gray-900 mb-3">📊 Medical Imaging</p>
              <p className="text-sm text-gray-600">AI analyzes scan results and extracts features</p>
              <p className="text-xs text-green-600 mt-4">↓</p>
            </div>
            <div className="p-6 border-2 border-blue-200 rounded-lg">
              <p className="font-semibold text-gray-900 mb-3">🔬 Disease Prediction</p>
              <p className="text-sm text-gray-600">Combines imaging data with patient parameters</p>
              <p className="text-xs text-blue-600 mt-4">↓</p>
            </div>
            <div className="p-6 border-2 border-purple-200 rounded-lg">
              <p className="font-semibold text-gray-900 mb-3">👨‍⚕️ Doctor Match</p>
              <p className="text-sm text-gray-600">Recommends specialists based on findings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
