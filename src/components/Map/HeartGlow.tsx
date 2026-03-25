import { useTexture } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float alpha = texture2D(uTexture, vUv).a;
    float finalAlpha = alpha * uOpacity;
    gl_FragColor = vec4(uColor * finalAlpha, finalAlpha);
  }
`;

type Props = {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  opacity?: number;
};

const HeartGlow = ({
  position = [0, 0, 0.3],
  scale = 2,
  color = '#ff6688',
  opacity = 0.8,
}: Props) => {
  const texture = useTexture('/assets/heart-blur.png');

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: opacity },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [texture, color, opacity],
  );

  return (
    <mesh position={position} material={material}>
      <planeGeometry args={[scale, scale]} />
    </mesh>
  );
};

export default HeartGlow;
