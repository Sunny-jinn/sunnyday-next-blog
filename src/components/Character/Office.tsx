/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/newOffice.gltf 
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'emotion-icons/boxicons-regular';

export function Office(props: any) {
  const group = useRef();
  const screen = useRef(null);

  const { nodes, materials, animations }: any = useGLTF('/models/office.gltf');
  const { actions } = useAnimations(animations, screen);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation-y={-Math.PI / 3.7}
      rotation-x={Math.PI / 8}
      position={[0.8, -1.5, 0]}
      scale={1.8}
    >
      <group name="Scene">
        <group name="Pen" position={[0.428, 1.007, -0.835]}>
          <mesh
            name="Mug_with_office_tools"
            geometry={nodes.Mug_with_office_tools.geometry}
            material={materials['Material.001']}
            position={[0.436, -0.058, 0.087]}
            scale={100}
          />
        </group>
        <group
          name="Rug"
          position={[0.048, 0.015, 0.45]}
          rotation={[0, 1.552, 0]}
          scale={0.517}
        >
          <group
            name="Carpet_1"
            position={[-0.038, 0, 0.33]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={93.62}
          >
            <mesh
              name="Carpet_1_1"
              geometry={nodes.Carpet_1_1.geometry}
              material={materials.DarkRed}
            />
            <mesh
              name="Carpet_1_2"
              geometry={nodes.Carpet_1_2.geometry}
              material={materials.LightOrange}
            />
          </group>
        </group>
        <group
          name="newChair"
          position={[0.021, -0.036, 0.1]}
          rotation={[-Math.PI / 2, 0, -3.037]}
          scale={0.317}
        >
          <group
            name="795eb8a678ba47e9aa407650124fe5dcfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.0099}
          >
            <group name="RootNode">
              <group name="Computer_Chair">
                <mesh
                  name="Computer_Chair_High_Heels_2_0"
                  geometry={nodes.Computer_Chair_High_Heels_2_0.geometry}
                  material={materials.High_Heels_2}
                  position={[0, 10.867, 0]}
                  rotation={[0, -0.138, 0]}
                  scale={0.986}
                />
              </group>
            </group>
          </group>
        </group>
        <mesh
          name="mouse"
          geometry={nodes.mouse.geometry}
          material={materials.lambert3SG}
          position={[-0.001, 0.95, -0.984]}
          scale={0.0015}
        />
        <mesh
          name="Monitor"
          geometry={nodes.Monitor.geometry}
          material={materials.lambert3SG}
          position={[0.005, 0.964, -0.926]}
          scale={0.002}
        />
        <mesh
          name="Keyboard1"
          geometry={nodes.Keyboard1.geometry}
          material={materials.lambert3SG}
          position={[0.06, 0.956, -0.854]}
          scale={0.0012}
        />
        <mesh
          name="Message_Board"
          geometry={nodes.Message_Board.geometry}
          material={materials.Mat}
          position={[0.07, 1.707, -1.157]}
          rotation={[Math.PI, -1.552, Math.PI]}
          scale={0.01}
        />
        <group name="frappe" position={[0.652, 0.951, -0.756]} scale={0.406}>
          <mesh
            name="frappe_1"
            geometry={nodes.frappe_1.geometry}
            material={materials.brownDark}
          />
          <mesh
            name="frappe_1_1"
            geometry={nodes.frappe_1_1.geometry}
            material={materials._defaultMat}
          />
          <mesh
            name="frappe_1_2"
            geometry={nodes.frappe_1_2.geometry}
            material={materials.brownLight}
          />
        </group>
        <mesh
          name="straw"
          geometry={nodes.straw.geometry}
          material={materials.brownDarkest}
          position={[0.652, 0.951, -0.756]}
          scale={0.406}
        />
        <mesh
          name="MonitorScreen"
          ref={screen}
          geometry={nodes.MonitorScreen.geometry}
          material={materials.매테리얼}
          position={[0.005, 1.305, -0.919]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.364, 0.36, 0.202]}
        />
        <mesh
          name="Cube001_Cube002"
          geometry={nodes.Cube001_Cube002.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cube002_Cube003"
          geometry={nodes.Cube002_Cube003.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cube003_Cube004"
          geometry={nodes.Cube003_Cube004.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cube004_Cube005"
          geometry={nodes.Cube004_Cube005.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cube005_Cube006"
          geometry={nodes.Cube005_Cube006.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cube006_Cube007"
          geometry={nodes.Cube006_Cube007.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cube007_Cube008"
          geometry={nodes.Cube007_Cube008.geometry}
          material={materials.GrayPlastic}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cube_Cube001"
          geometry={nodes.Cube_Cube001.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder"
          geometry={nodes.Cylinder.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder001"
          geometry={nodes.Cylinder001.geometry}
          material={materials.WhiteSteelScrew}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder002"
          geometry={nodes.Cylinder002.geometry}
          material={materials.BlackPlastic}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder003"
          geometry={nodes.Cylinder003.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder004"
          geometry={nodes.Cylinder004.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder005"
          geometry={nodes.Cylinder005.geometry}
          material={materials.BlackPlastic}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder006"
          geometry={nodes.Cylinder006.geometry}
          material={materials.WhiteSteelScrew}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder007"
          geometry={nodes.Cylinder007.geometry}
          material={materials.WhiteSteelScrew}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder008"
          geometry={nodes.Cylinder008.geometry}
          material={materials.BlackPlastic}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder009"
          geometry={nodes.Cylinder009.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder010"
          geometry={nodes.Cylinder010.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder011"
          geometry={nodes.Cylinder011.geometry}
          material={materials.BlackPlastic}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder012"
          geometry={nodes.Cylinder012.geometry}
          material={materials.WhiteSteelScrew}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Cylinder013"
          geometry={nodes.Cylinder013.geometry}
          material={materials.BlackCoatSteel}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="Plane001_Plane002"
          geometry={nodes.Plane001_Plane002.geometry}
          material={materials.BlackWood}
          position={[0.213, 0, -0.725]}
          rotation={[Math.PI, -1.568, Math.PI]}
        />
        <mesh
          name="group24448074"
          geometry={nodes.group24448074.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group31856083"
          geometry={nodes.group31856083.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group103419857"
          geometry={nodes.group103419857.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group172818934"
          geometry={nodes.group172818934.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group285410933"
          geometry={nodes.group285410933.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group476784665"
          geometry={nodes.group476784665.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group525605584"
          geometry={nodes.group525605584.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group560799048"
          geometry={nodes.group560799048.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group714662036"
          geometry={nodes.group714662036.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group722357104"
          geometry={nodes.group722357104.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1025492697"
          geometry={nodes.group1025492697.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1278045090"
          geometry={nodes.group1278045090.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1308825903"
          geometry={nodes.group1308825903.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1377145234"
          geometry={nodes.group1377145234.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1377232627"
          geometry={nodes.group1377232627.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1406455588"
          geometry={nodes.group1406455588.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1417853301"
          geometry={nodes.group1417853301.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1507777984"
          geometry={nodes.group1507777984.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1647754183"
          geometry={nodes.group1647754183.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1699085095"
          geometry={nodes.group1699085095.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1781696643"
          geometry={nodes.group1781696643.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <group
          name="group1885116500"
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        >
          <mesh
            name="mesh1885116500"
            geometry={nodes.mesh1885116500.geometry}
            material={materials.mat21}
          />
          <mesh
            name="mesh1885116500_1"
            geometry={nodes.mesh1885116500_1.geometry}
            material={materials.mat20}
          />
        </group>
        <mesh
          name="group1987077651"
          geometry={nodes.group1987077651.geometry}
          material={materials.mat20}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group1989238829"
          geometry={nodes.group1989238829.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
        <mesh
          name="group2053840647"
          geometry={nodes.group2053840647.geometry}
          material={materials.mat9}
          position={[1.486, 0.342, -0.853]}
          scale={0.285}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/office.gltf');