import * as React from 'react';
import * as THREE from 'three';
import {useThree} from 'react-three-fiber';

export const Terrain = ({width, height, terrain}) => {
  // let vertices = [];
  // for (let x = 0; x < width; x++) {
  //   for (let y = 0; y < height; y++) {
  //     const z = terrain[x][y][0];
  //     vertices.push(new THREE.Vector3(x, y, z));
  //   }
  // }
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    width - 1,
    height - 1,
  );
  geometry.vertices = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const z = terrain[x][y][0];
      geometry.vertices.push(new THREE.Vector3(x, y, z));
    }
  }
  geometry.verticesNeedUpdate = true;
  geometry.computeFlatVertexNormals();

  return (
    <>
      <spotLight
        color="white"
        intensity={0.5}
        position={[width, height, 400]}
      />
      <scene>
        <mesh
          geometry={geometry}
          castShadow
          receiveShadow
          rotation={new THREE.Euler(-1, 0, 0)}
        >
          {/* <planeGeometry
            name="geometry"
            vertices={vertices}
            onUpdate={geometry => {
              geometry.verticesNeedUpdate = true;
              geometry.computeFlatVertexNormals();
            }}
            args={[width, height, width - 1, height - 1]}
          /> */}
          <meshLambertMaterial
            name="material"
            color="peachpuff"
            side={THREE.DoubleSide}
            flatShading={true}
          />
        </mesh>
      </scene>
    </>
  );
};
