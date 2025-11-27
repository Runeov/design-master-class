import React, { useRef, useMemo, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Paintable Roblox-style character with UV mapping for 3D painting
const PaintableCharacter = forwardRef(({ textureCanvas }, ref) => {
  const groupRef = useRef();
  const torsoRef = useRef();
  const [texture, setTexture] = useState(null);

  // Create texture from canvas
  useEffect(() => {
    if (!textureCanvas) return;
    
    const tex = new THREE.CanvasTexture(textureCanvas);
    tex.flipY = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    setTexture(tex);
  }, [textureCanvas]);

  // Expose method to update texture
  useImperativeHandle(ref, () => ({
    updateTexture: (canvas) => {
      if (texture) {
        texture.needsUpdate = true;
      }
    }
  }), [texture]);

  // Update texture when canvas changes
  useEffect(() => {
    if (texture && textureCanvas) {
      texture.needsUpdate = true;
    }
  }, [texture, textureCanvas]);

  // Default material for body parts without texture
  const skinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD5B8',
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  // Material for the torso with the paintable texture
  const shirtMaterial = useMemo(() => {
    if (texture) {
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.9,
        metalness: 0,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.9,
      metalness: 0,
    });
  }, [texture]);

  // Pants material
  const pantsMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2563EB',
      roughness: 0.9,
      metalness: 0,
    });
  }, []);

  // Hair material
  const hairMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4A3728',
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  // Gentle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  // Create box geometry with proper UVs for painting
  const createPaintableBox = (width, height, depth) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    // UV mapping is already set up by Three.js for BoxGeometry
    return geometry;
  };

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#FFD5B8" roughness={0.8} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <boxGeometry args={[0.85, 0.15, 0.85]} />
        <primitive object={hairMaterial} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 1.45, 0.41]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.2, 1.45, 0.41]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 1.25, 0.41]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Torso (T-Shirt) - PAINTABLE */}
      <mesh 
        ref={torsoRef} 
        position={[0, 0.6, 0]} 
        castShadow
        userData={{ paintable: true }}
      >
        <boxGeometry args={[0.9, 0.9, 0.5]} />
        {texture ? (
          <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
        ) : (
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} metalness={0} />
        )}
      </mesh>

      {/* Left Arm */}
      <group position={[-0.6, 0.6, 0]}>
        {/* Upper arm (shirt sleeve) - PAINTABLE */}
        <mesh 
          position={[0, 0.15, 0]} 
          castShadow
          userData={{ paintable: true }}
        >
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          {texture ? (
            <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
          ) : (
            <meshStandardMaterial color="#FFFFFF" roughness={0.9} metalness={0} />
          )}
        </mesh>
        {/* Lower arm (skin) */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.28, 0.4, 0.28]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.6, 0.6, 0]}>
        {/* Upper arm (shirt sleeve) - PAINTABLE */}
        <mesh 
          position={[0, 0.15, 0]} 
          castShadow
          userData={{ paintable: true }}
        >
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          {texture ? (
            <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
          ) : (
            <meshStandardMaterial color="#FFFFFF" roughness={0.9} metalness={0} />
          )}
        </mesh>
        {/* Lower arm (skin) */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.28, 0.4, 0.28]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>

      {/* Left Leg */}
      <mesh position={[-0.22, -0.35, 0]} castShadow>
        <boxGeometry args={[0.35, 0.9, 0.35]} />
        <primitive object={pantsMaterial} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.22, -0.35, 0]} castShadow>
        <boxGeometry args={[0.35, 0.9, 0.35]} />
        <primitive object={pantsMaterial} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.22, -0.85, 0.05]} castShadow>
        <boxGeometry args={[0.35, 0.15, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.22, -0.85, 0.05]} castShadow>
        <boxGeometry args={[0.35, 0.15, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
});

PaintableCharacter.displayName = 'PaintableCharacter';

export default PaintableCharacter;