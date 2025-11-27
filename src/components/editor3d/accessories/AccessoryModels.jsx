import React, { useMemo } from 'react';
import * as THREE from 'three';

// Crown accessory
export function Crown({ color = '#FFD700', position = [0, 0, 0], scale = 1 }) {
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.8,
    roughness: 0.2,
  }), [color]);

  return (
    <group position={position} scale={scale}>
      {/* Base ring */}
      <mesh castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.15, 32]} />
        <primitive object={material} />
      </mesh>
      {/* Points */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(angle * Math.PI / 180) * 0.32,
            0.2,
            Math.sin(angle * Math.PI / 180) * 0.32
          ]}
          castShadow
        >
          <coneGeometry args={[0.08, 0.25, 4]} />
          <primitive object={material} />
        </mesh>
      ))}
      {/* Gems */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <mesh 
          key={`gem-${i}`} 
          position={[
            Math.cos(angle * Math.PI / 180) * 0.32,
            0.08,
            Math.sin(angle * Math.PI / 180) * 0.32
          ]}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#FF0000" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Top Hat accessory
export function TopHat({ color = '#1a1a1a', bandColor = '#8B0000', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Brim */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Main cylinder */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.45, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Band */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.08, 32]} />
        <meshStandardMaterial color={bandColor} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Baseball Cap accessory
export function BaseballCap({ color = '#2563EB', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Cap dome */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Brim */}
      <mesh position={[0, 0, 0.25]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Button on top */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

// Angel Wings accessory
export function AngelWings({ color = '#FFFFFF', position = [0, 0, 0], scale = 1 }) {
  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.2, 0.5, 0.5, 0.4, 0.8);
    shape.bezierCurveTo(0.3, 1.0, 0.1, 0.9, 0, 0.7);
    shape.bezierCurveTo(-0.1, 0.5, -0.1, 0.2, 0, 0);
    return shape;
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Left wing */}
      <mesh position={[-0.3, 0, -0.1]} rotation={[0.2, 0.3, 0.1]} castShadow>
        <extrudeGeometry args={[wingShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 }]} />
        <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Right wing */}
      <mesh position={[0.3, 0, -0.1]} rotation={[0.2, -0.3, -0.1]} scale={[-1, 1, 1]} castShadow>
        <extrudeGeometry args={[wingShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 }]} />
        <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Devil Horns accessory
export function DevilHorns({ color = '#8B0000', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Left horn */}
      <mesh position={[-0.25, 0.1, 0]} rotation={[0, 0, 0.3]} castShadow>
        <coneGeometry args={[0.08, 0.35, 8]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Right horn */}
      <mesh position={[0.25, 0.1, 0]} rotation={[0, 0, -0.3]} castShadow>
        <coneGeometry args={[0.08, 0.35, 8]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  );
}

// Halo accessory
export function Halo({ color = '#FFD700', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.35, 0.04, 16, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
    </group>
  );
}

// Sunglasses accessory
export function Sunglasses({ frameColor = '#1a1a1a', lensColor = '#333333', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Left lens */}
      <mesh position={[-0.15, 0, 0.02]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.02]} />
        <meshStandardMaterial color={lensColor} metalness={0.5} roughness={0.1} transparent opacity={0.8} />
      </mesh>
      {/* Right lens */}
      <mesh position={[0.15, 0, 0.02]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.02]} />
        <meshStandardMaterial color={lensColor} metalness={0.5} roughness={0.1} transparent opacity={0.8} />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.06, 0.02, 0.02]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.25, 0, -0.1]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.02, 0.25]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.25, 0, -0.1]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.02, 0.02, 0.25]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
    </group>
  );
}

// Headphones accessory
export function Headphones({ color = '#1a1a1a', accentColor = '#FF6B6B', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Headband */}
      <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.35, 0.03, 8, 32, Math.PI]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Left ear cup */}
      <mesh position={[-0.38, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.42, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
      {/* Right ear cup */}
      <mesh position={[0.38, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.42, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
    </group>
  );
}

// Backpack accessory
export function Backpack({ color = '#4ECDC4', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Front pocket */}
      <mesh position={[0, -0.1, 0.13]}>
        <boxGeometry args={[0.35, 0.3, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Straps */}
      <mesh position={[-0.15, 0, 0.15]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.06, 0.5, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.15, 0, 0.15]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.06, 0.5, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Sword accessory
export function Sword({ bladeColor = '#C0C0C0', handleColor = '#8B4513', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale} rotation={[0, 0, -0.3]}>
      {/* Blade */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.08, 0.6, 0.02]} />
        <meshStandardMaterial color={bladeColor} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Blade tip */}
      <mesh position={[0, 0.72, 0]} rotation={[0, 0, Math.PI]} castShadow>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <meshStandardMaterial color={bladeColor} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Guard */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color={handleColor} roughness={0.8} />
      </mesh>
      {/* Pommel */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Shield accessory
export function Shield({ color = '#2563EB', emblemColor = '#FFD700', position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Main shield body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.35, 0.25, 0.08, 6]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Emblem */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
        <meshStandardMaterial color={emblemColor} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handle (back) */}
      <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.08, 0.04, 0.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Export all accessories with metadata
export const ACCESSORIES = [
  { id: 'crown', name: 'Crown', component: Crown, category: 'head', defaultColor: '#FFD700', position: [0, 1.85, 0] },
  { id: 'tophat', name: 'Top Hat', component: TopHat, category: 'head', defaultColor: '#1a1a1a', position: [0, 1.95, 0] },
  { id: 'baseballcap', name: 'Baseball Cap', component: BaseballCap, category: 'head', defaultColor: '#2563EB', position: [0, 1.8, 0] },
  { id: 'angelwings', name: 'Angel Wings', component: AngelWings, category: 'back', defaultColor: '#FFFFFF', position: [0, 0.8, -0.3] },
  { id: 'devilhorns', name: 'Devil Horns', component: DevilHorns, category: 'head', defaultColor: '#8B0000', position: [0, 1.85, 0] },
  { id: 'halo', name: 'Halo', component: Halo, category: 'head', defaultColor: '#FFD700', position: [0, 2.1, 0] },
  { id: 'sunglasses', name: 'Sunglasses', component: Sunglasses, category: 'face', defaultColor: '#1a1a1a', position: [0, 1.45, 0.4] },
  { id: 'headphones', name: 'Headphones', component: Headphones, category: 'head', defaultColor: '#1a1a1a', position: [0, 1.5, 0] },
  { id: 'backpack', name: 'Backpack', component: Backpack, category: 'back', defaultColor: '#4ECDC4', position: [0, 0.6, -0.4] },
  { id: 'sword', name: 'Sword', component: Sword, category: 'hand', defaultColor: '#C0C0C0', position: [0.8, 0.3, 0] },
  { id: 'shield', name: 'Shield', component: Shield, category: 'hand', defaultColor: '#2563EB', position: [-0.7, 0.5, 0.1] },
];