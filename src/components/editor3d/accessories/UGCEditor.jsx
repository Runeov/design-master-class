import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import RobloxCharacter from '../RobloxCharacter';
import { ACCESSORIES } from './AccessoryModels';

// Character with equipped accessories
function CharacterWithAccessories({ accessories, characterColor }) {
  return (
    <group>
      <RobloxCharacter 
        position={[0, 0, 0]} 
        bodyColor={characterColor}
      />
      {accessories.map((acc, index) => {
        const accessoryDef = ACCESSORIES.find(a => a.id === acc.id);
        if (!accessoryDef) return null;
        
        const AccessoryComponent = accessoryDef.component;
        return (
          <AccessoryComponent
            key={`${acc.id}-${index}`}
            color={acc.color}
            position={acc.position || accessoryDef.position}
            scale={acc.scale || 1}
          />
        );
      })}
    </group>
  );
}

// Accessory preview card
function AccessoryCard({ accessory, isSelected, onSelect, onAdd }) {
  return (
    <div 
      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-800">{accessory.name}</h4>
          <span className="text-xs text-gray-500 capitalize">{accessory.category}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// Equipped accessory item
function EquippedItem({ accessory, accessoryDef, onRemove, onColorChange, onScaleChange }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-800">{accessoryDef?.name || accessory.id}</span>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-600 w-12">Color:</label>
          <input
            type="color"
            value={accessory.color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-600 w-12">Scale:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={accessory.scale}
            onChange={(e) => onScaleChange(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs text-gray-500 w-8">{accessory.scale.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}

export function UGCEditor() {
  const [equippedAccessories, setEquippedAccessories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [characterColor, setCharacterColor] = useState('#FFE4C4');
  
  const categories = ['all', 'head', 'face', 'back', 'hand'];
  
  const filteredAccessories = selectedCategory === 'all' 
    ? ACCESSORIES 
    : ACCESSORIES.filter(a => a.category === selectedCategory);

  const addAccessory = (accessory) => {
    setEquippedAccessories(prev => [
      ...prev,
      {
        id: accessory.id,
        color: accessory.defaultColor,
        scale: 1,
        position: accessory.position,
      }
    ]);
  };

  const removeAccessory = (index) => {
    setEquippedAccessories(prev => prev.filter((_, i) => i !== index));
  };

  const updateAccessoryColor = (index, color) => {
    setEquippedAccessories(prev => prev.map((acc, i) => 
      i === index ? { ...acc, color } : acc
    ));
  };

  const updateAccessoryScale = (index, scale) => {
    setEquippedAccessories(prev => prev.map((acc, i) => 
      i === index ? { ...acc, scale } : acc
    ));
  };

  const exportConfig = () => {
    const config = {
      character: { color: characterColor },
      accessories: equippedAccessories,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roblox-avatar-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">UGC Accessory Editor</h1>
              <p className="text-gray-600">Create and customize Roblox accessories</p>
            </div>
            <button
              onClick={exportConfig}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Config
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-[500px]">
                <Canvas
                  camera={{ position: [3, 2, 5], fov: 50 }}
                  shadows
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                  />
                  <Suspense fallback={null}>
                    <CharacterWithAccessories 
                      accessories={equippedAccessories}
                      characterColor={characterColor}
                    />
                    <ContactShadows
                      position={[0, -0.01, 0]}
                      opacity={0.4}
                      scale={10}
                      blur={2}
                    />
                    <Environment preset="studio" />
                  </Suspense>
                  <OrbitControls 
                    enablePan={false}
                    minDistance={3}
                    maxDistance={10}
                    target={[0, 1, 0]}
                  />
                  <gridHelper args={[10, 10, '#ddd', '#eee']} />
                </Canvas>
              </div>
              
              {/* Character color picker */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Character Skin:</label>
                  <input
                    type="color"
                    value={characterColor}
                    onChange={(e) => setCharacterColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <div className="flex gap-2">
                    {['#FFE4C4', '#DEB887', '#D2691E', '#8B4513', '#F5DEB3'].map(color => (
                      <button
                        key={color}
                        onClick={() => setCharacterColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          characterColor === color ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Equipped Accessories */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Equipped ({equippedAccessories.length})
              </h3>
              {equippedAccessories.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No accessories equipped. Add some from the library below!
                </p>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {equippedAccessories.map((acc, index) => (
                    <EquippedItem
                      key={`${acc.id}-${index}`}
                      accessory={acc}
                      accessoryDef={ACCESSORIES.find(a => a.id === acc.id)}
                      onRemove={() => removeAccessory(index)}
                      onColorChange={(color) => updateAccessoryColor(index, color)}
                      onScaleChange={(scale) => updateAccessoryScale(index, scale)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Accessory Library */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Accessory Library</h3>
              
              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Accessory list */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredAccessories.map(accessory => (
                  <AccessoryCard
                    key={accessory.id}
                    accessory={accessory}
                    isSelected={selectedAccessory === accessory.id}
                    onSelect={() => setSelectedAccessory(accessory.id)}
                    onAdd={() => addAccessory(accessory)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UGCEditor;