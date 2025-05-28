// Fichier déplacé dans finances/page.jsx
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Finances</h1>
      <div className="bg-white rounded-xl shadow p-8 mb-12 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Statistiques de revenus</h2>
        <div className="w-full max-w-2xl h-64">
          <svg width="100%" height="100%" viewBox="0 0 500 200">
            <polyline fill="none" stroke="#34d399" strokeWidth="4" points="0,180 80,160 160,120 240,100 320,80 400,60 480,30" />
          </svg>
          <div className="flex justify-between mt-2 text-gray-400 text-xs">
            <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
