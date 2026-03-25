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
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float heightFade = smoothstep(0.0, 0.8, vUv.y);
    float centerDist = abs(vUv.x - 0.5) * 2.0;
    float radialFade = 1.0 - smoothstep(0.0, 1.0, centerDist);

    float alpha = heightFade * radialFade * uOpacity;
    gl_FragColor = vec4(uColor * alpha, alpha);
  }
`;

type Props = {
  from?: [number, number, number];
  to?: [number, number, number];
  width?: number;
  color?: string;
  opacity?: number;
};

const PLANE_COUNT = 3;

const LightBeam = ({
  from = [0, 3, 2],
  to = [0, 0, 0.3],
  width = 2.0,
  color = '#ff6688',
  opacity = 0.12,
}: Props) => {
  const { midpoint, quaternions, height, material } = useMemo(() => {
    const lightPos = new THREE.Vector3(...from);
    const targetPos = new THREE.Vector3(...to);
    const dir = new THREE.Vector3().subVectors(targetPos, lightPos);
    const h = dir.length();
    const mid = new THREE.Vector3().lerpVectors(lightPos, targetPos, 0.5);
    const beamDir = dir.clone().normalize();

    // Y축을 빔 방향으로 정렬하는 기본 쿼터니언
    const baseQ = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      beamDir,
    );

    // 빔 축 기준으로 각 평면을 회전
    const quats = Array.from({ length: PLANE_COUNT }, (_, i) => {
      const angle = (Math.PI / PLANE_COUNT) * i;
      const axialQ = new THREE.Quaternion().setFromAxisAngle(beamDir, angle);
      return new THREE.Quaternion().multiplyQuaternions(axialQ, baseQ);
    });

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: opacity },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    return {
      midpoint: [mid.x, mid.y, mid.z] as [number, number, number],
      quaternions: quats,
      height: h,
      material: mat,
    };
  }, [from, to, color, opacity]);

  return (
    <group position={midpoint}>
      {quaternions.map((q, i) => (
        <mesh key={i} quaternion={q} material={material}>
          <planeGeometry args={[width, height]} />
        </mesh>
      ))}
    </group>
  );
};

export default LightBeam;
