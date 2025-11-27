import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple Roblox-style character made with basic shapes
// This is a placeholder until we have a proper GLB model
export default function RobloxCharacter({ textureDataUrl, onLoaded }) {
  const groupRef = useRef();
  const torsoMeshRef = useRef();
  const leftSleeveRef = useRef();
  const rightSleeveRef = useRef();
  const [texture, setTexture] = useState(null);
  
  // Load texture when dataUrl changes
  useEffect(() => {
    if (!textureDataUrl) {
      setTexture(null);
      if (onLoaded) onLoaded();
      return;
    }
    
    const loader = new THREE.TextureLoader();
    loader.load(
      textureDataUrl,
      (loadedTexture) => {
        loadedTexture.flipY = true; // Canvas textures need flipY = true
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
        if (onLoaded) onLoaded();
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
        if (onLoaded) onLoaded();
      }
    );
  }, [textureDataUrl, onLoaded]);

  // Update mesh materials when texture changes
  useEffect(() => {
    const material = texture 
      ? new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.9,
          metalness: 0,
        })
      : new THREE.MeshStandardMaterial({
          color: '#FFFFFF',
          roughness: 0.9,
          metalness: 0,
        });

    if (torsoMeshRef.current) {
      torsoMeshRef.current.material = material;
    }
    if (leftSleeveRef.current) {
      leftSleeveRef.current.material = material;
    }
    if (rightSleeveRef.current) {
      rightSleeveRef.current.material = material;
    }

    return () => {
      material.dispose();
    };
  }, [texture]);

  // Default material for body parts without texture
  const skinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD5B8', // Skin tone
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  // Pants material
  const pantsMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2563EB', // Blue jeans
      roughness: 0.9,
      metalness: 0,
    });
  }, []);

  // Hair material
  const hairMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4A3728', // Brown hair
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  // Gentle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#FFD5B8" roughness={0.8} />
      </mesh>

      {/* Hair (simple block on top) */}
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
      <mesh position={[0, 1.25, 0.41]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Torso (T-Shirt) - Main body */}
      <mesh ref={torsoMeshRef} position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.9, 0.9, 0.5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.6, 0.6, 0]}>
        {/* Upper arm (shirt sleeve) */}
        <mesh ref={leftSleeveRef} position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
        </mesh>
        {/* Lower arm (skin) */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.28, 0.4, 0.28]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.6, 0.6, 0]}>
        {/* Upper arm (shirt sleeve) */}
        <mesh ref={rightSleeveRef} position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
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
}