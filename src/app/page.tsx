'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">DocPredict</h1>
          <div className="space-x-4">
            <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered Healthcare Solutions
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          DocPredict combines machine learning, doctor recommendations, and medical imaging analysis
          to provide comprehensive AI-powered healthcare support.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Features</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Disease Prediction */}
          <Link href="/disease-prediction">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer h-full">
              <div className="text-4xl mb-4">🔬</div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                Disease Prediction
              </h4>
              <p className="text-gray-600 mb-4">
                Uses machine learning algorithms (SVM, Random Forest, CNN, LSTM) to predict:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Cancer Detection</li>
                <li>✓ Heart Disease Prediction</li>
                <li>✓ Alzheimer's Detection</li>
                <li>✓ Chronic Disease Prediction</li>
              </ul>
            </div>
          </Link>

          {/* Doctor Recommendation */}
          <Link href="/doctor-recommendation">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer h-full">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                Doctor Recommendation
              </h4>
              <p className="text-gray-600 mb-4">
                Intelligent matching system using:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Collaborative Filtering</li>
                <li>✓ Content-Based Filtering</li>
                <li>✓ Symptom-Based Matching</li>
                <li>✓ Specialist Recommendations</li>
              </ul>
            </div>
          </Link>

          {/* Medical Imaging */}
          <Link href="/medical-imaging">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer h-full">
              <div className="text-4xl mb-4">🖼️</div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                Medical Imaging Analysis
              </h4>
              <p className="text-gray-600 mb-4">
                Advanced image analysis for:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ MRI Segmentation</li>
                <li>✓ CT Scan Classification</li>
                <li>✓ X-ray Analysis</li>
                <li>✓ PET Scan Interpretation</li>
              </ul>
            </div>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">About DocPredict</h3>
          <p className="text-gray-600 text-lg max-w-3xl">
            DocPredict is a systematic literature review implementation showcasing AI models used in 
            disease diagnosis and doctor recommendation systems. This project demonstrates how machine learning, 
            deep learning, and intelligent filtering systems can be integrated to provide comprehensive 
            healthcare support. Each feature can be used independently or in combination for a complete 
            diagnostic and recommendation experience.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>DocPredict</p>
        </div>
      </footer>
    </div>
  );
}
