import React, { useState } from 'react';
import { 
  RotateCw, 
  MoveHorizontal, 
  MoveVertical, 
  Maximize2, 
  RotateCcw, 
  RefreshCw 
} from 'lucide-react';

function App() {
  const [transforms, setTransforms] = useState({
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
  });

  const resetTransforms = () => {
    setTransforms({
      translateX: 0,
      translateY: 0,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
    });
  };

  const transformStyle = {
    transform: `
      translate(${transforms.translateX}px, ${transforms.translateY}px)
      rotate(${transforms.rotate}deg)
      scale(${transforms.scaleX}, ${transforms.scaleY})
      skew(${transforms.skewX}deg, ${transforms.skewY}deg)
    `,
  };

  const TransformControl = ({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step = 1,
    icon: Icon 
  }) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="ml-auto text-sm text-gray-500">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CSS Transform Visualizer</h1>
          <p className="text-gray-600">Understand how CSS transform properties work by experimenting with the controls</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Controls</h2>
              <button
                onClick={resetTransforms}
                className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <TransformControl
              label="Translate X"
              value={transforms.translateX}
              onChange={(value) => setTransforms({ ...transforms, translateX: value })}
              min={-100}
              max={100}
              icon={MoveHorizontal}
            />

            <TransformControl
              label="Translate Y"
              value={transforms.translateY}
              onChange={(value) => setTransforms({ ...transforms, translateY: value })}
              min={-100}
              max={100}
              icon={MoveVertical}
            />

            <TransformControl
              label="Rotate"
              value={transforms.rotate}
              onChange={(value) => setTransforms({ ...transforms, rotate: value })}
              min={-180}
              max={180}
              icon={RotateCw}
            />

            <TransformControl
              label="Scale X"
              value={transforms.scaleX}
              onChange={(value) => setTransforms({ ...transforms, scaleX: value })}
              min={0.5}
              max={2}
              step={0.1}
              icon={Maximize2}
            />

            <TransformControl
              label="Scale Y"
              value={transforms.scaleY}
              onChange={(value) => setTransforms({ ...transforms, scaleY: value })}
              min={0.5}
              max={2}
              step={0.1}
              icon={Maximize2}
            />

            <TransformControl
              label="Skew X"
              value={transforms.skewX}
              onChange={(value) => setTransforms({ ...transforms, skewX: value })}
              min={-45}
              max={45}
              icon={RotateCcw}
            />

            <TransformControl
              label="Skew Y"
              value={transforms.skewY}
              onChange={(value) => setTransforms({ ...transforms, skewY: value })}
              min={-45}
              max={45}
              icon={RotateCcw}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Preview</h2>
            <div className="relative h-[400px] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="absolute inset-0 grid place-items-center">
                <div 
                  style={transformStyle}
                  className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium transition-transform duration-200"
                >
                  Transform Me!
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full border-2 border-dashed border-gray-300 opacity-50" />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Generated CSS</h3>
              <pre className="text-sm bg-white p-3 rounded border border-gray-200 overflow-x-auto">
                {`transform: ${transformStyle.transform};`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;