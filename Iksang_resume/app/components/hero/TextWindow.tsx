'use client';

import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { BASE_PATH } from "@constants";

const TextWindow = () => {
  const data = useScroll();
  const windowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const c = data.range(0.65, 0.15);

    if (windowRef.current) {
      windowRef.current.setRotationFromAxisAngle(new THREE.Vector3(0, -1, 0), 0.5 *Math.PI * c);
      windowRef.current.position.x =  -0.6 * c;
      windowRef.current.position.z = -0.6 * c;
    }
  });

  const fontProps = {
    font: `${BASE_PATH}/fonts/MaruBuri-Bold.ttf`,
  };

  return (
    <group position={[0, -0.3, 0]} ref={windowRef}>

      <Text color="white" anchorX="left" anchorY="middle"
        fontSize={0.9}
        position={[-0.05, 0, 0]}
        {...fontProps}
        scale={[1, -1, 1]}
        rotation={[0, 0,  -Math.PI / 2]}>
        컴퓨터 사이언스
      </Text>

      <Text color="white" anchorX="right" anchorY="middle"
        {...fontProps}
        scale={[-1, -1, 1]}
        fontSize={0.9}
        position={[-0.05, 0, -1.4]}
        rotation={[0, 0,  -Math.PI / 2]}>
        개발자. 설계자
      </Text>

      <group position={[-0.55, 0, -0.3]}>
        <Text color="white" anchorX="left" anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.5}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          문제 해결
        </Text>

        <Text color="white" anchorX="left" anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.5}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          팀 플레이
        </Text>
      </group>

      <group position={[0.45, 0, -0.3]}>
        <Text color="white" anchorX="right" anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.5}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          호기심. 창의력
        </Text>
        <Text color="white" anchorX="right" anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.5}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          끊임없는 배움
        </Text>
      </group>
    </group>
  );
}

export default TextWindow;