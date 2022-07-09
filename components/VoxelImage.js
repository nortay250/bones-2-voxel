import * as THREE from 'three';
import * as dat from 'lil-gui';
import { useCallback, useEffect, useRef, useState } from 'react';
import AnimationButton from './AnimationButton';
import { BsFillPaletteFill } from 'react-icons/bs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useRouter } from 'next/router';

let camera, scene, renderer;
const loader = new GLTFLoader();
let mixer = null;
let controls;
const clock = new THREE.Clock();
let previousTime = 0;

//start and stop button
let runAnim = false;
let isPlay = true;

//animation
function animation() {
  if (!isPlay) return;
  // const elapsedTime = clock.getElapsedTime();
  // const deltaTime = elapsedTime - previousTime;
  // previousTime = elapsedTime;

  //Update mixer
  if (mixer !== null) {
    // mixer.update(deltaTime);
    mixer.update(clock.getDelta());
  }

  // Update controls
  controls.update();
  render();

  window.requestAnimationFrame(animation);
  // render();
}

function render() {
  renderer.render(scene, camera);
}

//generate random gradient background
function generate() {
  const hexValues = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
  ];

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hexValues[x];
      a += y;
    }
    return a;
  }

  const newColor1 = populate('#');
  const newColor2 = populate('#');

  const gradient = 'linear-gradient(#ffffff, ' + newColor2 + ')';

  document.getElementById('overall').style.background = gradient;
}

module.exports = function VoxelImage() {
  const router = useRouter();
  const voxelId = router.query.voxelId;
  const mountRef = useRef(null);

  useEffect(() => {
    // Debug
    // const gui = new dat.GUI();

    //Model
    loader.load(`/gltf/${voxelId}.gltf`, (gltf) => {
      gltf.scene.traverse(function (node) {
        console.log(node);
        if (node.isMesh) {
          node.castShadow = true;
        }
      });
      mixer = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
      animation();

      gltf.scene.scale.set(0.08, 0.08, 0.08);
      gltf.scene.position.set(0, -3.5, 0);
      gltf.scene.rotation.y = Math.PI * 0.31;
      scene.add(gltf.scene);

      // gui
      //   .add(gltf.scene.rotation, "y")
      //   .min(-Math.PI)
      //   .max(Math.PI)
      //   .step(0.001)
      //   .name("rotation");
    });

    //Camera
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(4, 0, 5);
    scene = new THREE.Scene();

    //Create a plane that receives shadows (but does not cast them)
    const geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.ShadowMaterial();
    material.opacity = 0.1;

    const plane = new THREE.Mesh(geometry, material);
    plane.position.y = -3.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // gui
    //   .add(plane.position, 'y')
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name('lengthofShadow');

    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    // gui
    //   .add(ambientLight, "intensity")
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name("ambientlightintensity");

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(9, 10, 10);
    directionalLight.castShadow = true;

    directionalLight.shadow.camera.fov = 30;
    directionalLight.shadow.camera.aspect = 1;
    directionalLight.shadow.camera.near = 10;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.001;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;

    scene.add(directionalLight);

    // gui
    //   .add(directionalLight, "intensity")
    //   .min(0)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlightintensity");
    // gui
    //   .add(directionalLight.position, "x")
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlightX");
    // gui
    //   .add(directionalLight.position, "y")
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlightY");
    // gui
    //   .add(directionalLight2.position, "z")
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlightZ");

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight2.position.set(-10, 10, -10);
    scene.add(directionalLight2);

    // gui
    //   .add(directionalLight2, "intensity")
    //   .min(0)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlight2intensity");
    // gui
    //   .add(directionalLight2.position, "x")
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlight2X");
    // gui
    //   .add(directionalLight2.position, "y")
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlight2Y");
    // gui
    //   .add(directionalLight2.position, "z")
    //   .min(-10)
    //   .max(10)
    //   .step(0.001)
    //   .name("directionlight2Z");

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 0);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enableDamping = true;

    // Animation button
    const animateButton = document.getElementById('animate-button');
    const stopAnimation = (e) => {
      if (runAnim) {
        runAnim = false;
        isPlay = true;
        animation();
        console.log('animation starts');
      } else {
        runAnim = true;
        isPlay = false;
        console.log('animation stops');
      }
    };
    animateButton.addEventListener('click', stopAnimation);

    //Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => mountRef.removeChild(renderer.domElement);
  }, []);
  const [color, setColor] = useState('#ffffff');
  return (
    <div>
      <div ref={mountRef}>
        <AnimationButton />
        <BsFillPaletteFill
          onClick={() => generate()}
          className='absolute top-[85px] left-[30px] cursor-pointer'
          size={30}
        />
      </div>
    </div>
  );
};
