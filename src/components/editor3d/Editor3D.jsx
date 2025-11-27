import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import PaintableCharacter from './PaintableCharacter';

// Loading spinner component
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-purple-600 font-medium text-sm">Loading 3D Editor...</p>
      </div>
    </Html>
  );
}

// Raycaster for 3D painting
function PaintRaycaster({ isActive, brushColor, brushSize, onPaint }) {
  const { camera, gl, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const isPainting = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseDown = (event) => {
      isPainting.current = true;
      paint(event);
    };

    const handleMouseMove = (event) => {
      if (isPainting.current) {
        paint(event);
      }
    };

    const handleMouseUp = () => {
      isPainting.current = false;
    };

    const paint = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      
      // Find paintable meshes
      const paintableMeshes = [];
      scene.traverse((child) => {
        if (child.isMesh && child.userData.paintable) {
          paintableMeshes.push(child);
        }
      });

      const intersects = raycaster.current.intersectObjects(paintableMeshes);
      
      if (intersects.length > 0) {
        const intersect = intersects[0];
        if (intersect.uv) {
          onPaint({
            uv: intersect.uv,
            point: intersect.point,
            face: intersect.face,
            object: intersect.object,
            color: brushColor,
            size: brushSize,
          });
        }
      }
    };

    gl.domElement.addEventListener('mousedown', handleMouseDown);
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('mouseup', handleMouseUp);
    gl.domElement.addEventListener('mouseleave', handleMouseUp);

    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('mouseup', handleMouseUp);
      gl.domElement.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isActive, camera, gl, scene, brushColor, brushSize, onPaint]);

  return null;
}

// Main 3D Editor Component
export default function Editor3D({ 
  onTextureUpdate,
  initialTexture = null,
  className = '' 
}) {
  const [activeTool, setActiveTool] = useState('rotate'); // rotate, paint, erase
  const [brushColor, setBrushColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(20);
  const [textureCanvas, setTextureCanvas] = useState(null);
  const characterRef = useRef();

  // Initialize texture canvas
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);
    
    // If there's an initial texture, draw it
    if (initialTexture) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 512, 512);
        setTextureCanvas(canvas);
      };
      img.src = initialTexture;
    } else {
      setTextureCanvas(canvas);
    }
  }, [initialTexture]);

  // Handle paint on 3D model
  const handlePaint = useCallback((paintData) => {
    if (!textureCanvas) return;
    
    const ctx = textureCanvas.getContext('2d');
    const { uv, color, size } = paintData;
    
    // Convert UV to canvas coordinates
    const x = uv.x * textureCanvas.width;
    const y = (1 - uv.y) * textureCanvas.height; // Flip Y for canvas
    
    // Draw circle at paint location
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = activeTool === 'erase' ? '#FFFFFF' : color;
    ctx.fill();
    
    // Notify parent of texture update
    if (onTextureUpdate) {
      onTextureUpdate(textureCanvas.toDataURL());
    }
    
    // Force re-render of character
    if (characterRef.current) {
      characterRef.current.updateTexture(textureCanvas);
    }
  }, [textureCanvas, activeTool, onTextureUpdate]);

  // Color palette
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8B500', '#1ABC9C',
    '#000000', '#FFFFFF', '#808080', '#C0392B'
  ];

  return (
    <div className={`relative bg-gradient-to-b from-indigo-100 to-purple-100 rounded-2xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap gap-2">
        {/* Tool Selection */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex gap-2">
          <button
            onClick={() => setActiveTool('rotate')}
            className={`p-2 rounded-lg transition-all ${
              activeTool === 'rotate' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title="Rotate View"
          >
            🔄
          </button>
          <button
            onClick={() => setActiveTool('paint')}
            className={`p-2 rounded-lg transition-all ${
              activeTool === 'paint' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title="Paint Brush"
          >
            🖌️
          </button>
          <button
            onClick={() => setActiveTool('erase')}
            className={`p-2 rounded-lg transition-all ${
              activeTool === 'erase' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title="Eraser"
          >
            🧹
          </button>
        </div>

        {/* Brush Size */}
        {(activeTool === 'paint' || activeTool === 'erase') && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Size:</span>
            <input
              type="range"
              min="5"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs font-bold text-indigo-600 w-6">{brushSize}</span>
          </div>
        )}
      </div>

      {/* Color Palette */}
      {activeTool === 'paint' && (
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <p className="text-xs font-medium text-gray-600 mb-2">🎨 Colors</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBrushColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    brushColor === color ? 'border-indigo-500 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        shadows
        dpr={[1, 2]}
        style={{ height: '100%', minHeight: '500px' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* Paint Raycaster */}
        <PaintRaycaster
          isActive={activeTool === 'paint' || activeTool === 'erase'}
          brushColor={brushColor}
          brushSize={brushSize}
          onPaint={handlePaint}
        />

        {/* 3D Character */}
        <Suspense fallback={<Loader />}>
          <PaintableCharacter 
            ref={characterRef}
            textureCanvas={textureCanvas}
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

        {/* Camera controls - disabled when painting */}
        <OrbitControls
          enabled={activeTool === 'rotate'}
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Instructions */}
      <div className="absolute bottom-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
        <p className="text-xs text-gray-600">
          {activeTool === 'rotate' && '🖱️ Drag to rotate • Scroll to zoom'}
          {activeTool === 'paint' && '🖌️ Click and drag to paint on the model'}
          {activeTool === 'erase' && '🧹 Click and drag to erase'}
        </p>
      </div>
    </div>
  );
}