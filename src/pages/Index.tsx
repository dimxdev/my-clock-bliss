
import React from 'react';
import AnalogClock from '@/components/AnalogClock';
import DigitalClock from '@/components/DigitalClock';
import CountdownTimer from '@/components/CountdownTimer';

const Index = () => {
  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            Jakarta Time <span className="text-sm font-normal">(UTC+7)</span>
          </h1>
          
          <div className="mb-8 flex justify-center">
            <AnalogClock />
          </div>
          
          <div className="mb-8">
            <DigitalClock />
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Study Timer
            </h2>
            <CountdownTimer />
          </div>
        </div>
      </div>
      
      <footer className="mt-6 text-sm text-center text-gray-500">
        <p>Waktu Jakarta (WIB) - Designed for productive study sessions</p>
      </footer>
    </div>
  );
};

export default Index;
