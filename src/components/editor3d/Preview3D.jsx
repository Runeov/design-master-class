import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import RobloxCharacter from './RobloxCharacter';

// Loading spinner component
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-purple-600 font-medium text-sm">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

// Main 3D Preview Component
export default function Preview3D({ textureDataUrl, className = '' }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative bg-gradient-to-b from-purple-100 to-pink-100 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">👀</span>
          <span className="font-bold text-purple-700 text-sm">3D Preview</span>
        </div>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
        <p className="text-xs text-gray-600">
          🖱️ Drag to rotate • Scroll to zoom
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        shadows
        dpr={[1, 2]}
        style={{ height: '100%', minHeight: '400px' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* 3D Character with texture */}
        <Suspense fallback={<Loader />}>
          <RobloxCharacter 
            textureDataUrl={textureDataUrl} 
            onLoaded={() => setIsLoading(false)}
          />
        </Suspense>

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}