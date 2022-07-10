"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("components_VoxelImage_js",{

/***/ "./components/VoxelImage.js":
/*!**********************************!*\
  !*** ./components/VoxelImage.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar _jsxDevRuntime = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\nvar THREE = _interopRequireWildcard(__webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\"));\nvar dat = _interopRequireWildcard(__webpack_require__(/*! lil-gui */ \"./node_modules/lil-gui/dist/lil-gui.esm.js\"));\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar _animationButton = _interopRequireDefault(__webpack_require__(/*! ./AnimationButton */ \"./components/AnimationButton.js\"));\nvar _bs = __webpack_require__(/*! react-icons/bs */ \"./node_modules/react-icons/bs/index.esm.js\");\nvar _gltfloaderJs = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\nvar _orbitControlsJs = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\nvar _router = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n        default: obj\n    };\n}\nfunction _interopRequireWildcard(obj) {\n    if (obj && obj.__esModule) {\n        return obj;\n    } else {\n        var newObj = {};\n        if (obj != null) {\n            for(var key in obj){\n                if (Object.prototype.hasOwnProperty.call(obj, key)) {\n                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};\n                    if (desc.get || desc.set) {\n                        Object.defineProperty(newObj, key, desc);\n                    } else {\n                        newObj[key] = obj[key];\n                    }\n                }\n            }\n        }\n        newObj.default = obj;\n        return newObj;\n    }\n}\nvar _s = $RefreshSig$();\nvar camera, scene, renderer;\nvar loader = new _gltfloaderJs.GLTFLoader();\nvar mixer = null;\nvar controls;\nvar clock = new THREE.Clock();\nvar previousTime = 0;\n//start and stop button\nvar runAnim = false;\nvar isPlay = true;\n//animation\nfunction animation() {\n    if (!isPlay) return;\n    // const elapsedTime = clock.getElapsedTime();\n    // const deltaTime = elapsedTime - previousTime;\n    // previousTime = elapsedTime;\n    //Update mixer\n    if (mixer !== null) {\n        // mixer.update(deltaTime);\n        mixer.update(clock.getDelta());\n    }\n    // Update controls\n    controls.update();\n    render();\n    window.requestAnimationFrame(animation);\n// render();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\n//generate random gradient background\nfunction generate() {\n    var populate = function populate(a) {\n        for(var i = 0; i < 6; i++){\n            var x = Math.round(Math.random() * 14);\n            var y = hexValues[x];\n            a += y;\n        }\n        return a;\n    };\n    var hexValues = [\n        '0',\n        '1',\n        '2',\n        '3',\n        '4',\n        '5',\n        '6',\n        '7',\n        '8',\n        '9',\n        'a',\n        'b',\n        'c',\n        'd',\n        'e', \n    ];\n    var newColor1 = populate('#');\n    var newColor2 = populate('#');\n    var gradient = 'linear-gradient(#ffffff, ' + newColor2 + ')';\n    document.getElementById('overall').style.background = gradient;\n}\nmodule.exports = _s(function VoxelImage() {\n    _s();\n    var router = (0, _router).useRouter();\n    var voxelId = router.query.voxelId;\n    var mountRef = (0, _react).useRef(null);\n    (0, _react).useEffect(function() {\n        // Debug\n        var gui = new dat.GUI();\n        //Model\n        loader.load(\"/gltf/\".concat(voxelId, \".gltf\"), function(gltf) {\n            gltf.scene.traverse(function(node) {\n                console.log(node);\n                if (node.isMesh) {\n                    node.castShadow = true;\n                }\n            });\n            mixer = new THREE.AnimationMixer(gltf.scene);\n            var action = mixer.clipAction(gltf.animations[0]);\n            action.play();\n            animation();\n            gltf.scene.scale.set(0.08, 0.08, 0.08);\n            gltf.scene.position.set(0, -3.5, 0);\n            gltf.scene.rotation.y = Math.PI * 0.31;\n            scene.add(gltf.scene);\n        // gui\n        //   .add(gltf.scene.rotation, \"y\")\n        //   .min(-Math.PI)\n        //   .max(Math.PI)\n        //   .step(0.001)\n        //   .name(\"rotation\");\n        });\n        //Camera\n        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);\n        camera.position.set(4, 0, 5);\n        scene = new THREE.Scene();\n        //Create a plane that receives shadows (but does not cast them)\n        var geometry = new THREE.PlaneGeometry(100, 100, 1, 1);\n        geometry.rotateX(-Math.PI / 2);\n        var material = new THREE.ShadowMaterial();\n        material.opacity = 0.1;\n        var plane = new THREE.Mesh(geometry, material);\n        plane.position.y = -3.5;\n        plane.receiveShadow = true;\n        scene.add(plane);\n        // gui\n        //   .add(plane.position, 'y')\n        //   .min(-10)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name('lengthofShadow');\n        //Lights\n        var ambientLight = new THREE.AmbientLight(16777215, 0.5);\n        scene.add(ambientLight);\n        gui.add(ambientLight, 'intensity').min(-10).max(10).step(0.001).name('ambientlightintensity');\n        var directionalLight = new THREE.DirectionalLight(16777215, 2);\n        directionalLight.position.set(9, 10, 10);\n        directionalLight.castShadow = true;\n        directionalLight.shadow.camera.fov = 30;\n        directionalLight.shadow.camera.aspect = 1;\n        directionalLight.shadow.camera.near = 10;\n        directionalLight.shadow.camera.far = 50;\n        directionalLight.shadow.bias = -0.001;\n        directionalLight.shadow.mapSize.width = 512;\n        directionalLight.shadow.mapSize.height = 512;\n        scene.add(directionalLight);\n        // gui\n        //   .add(directionalLight, \"intensity\")\n        //   .min(0)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlightintensity\");\n        // gui\n        //   .add(directionalLight.position, \"x\")\n        //   .min(-10)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlightX\");\n        // gui\n        //   .add(directionalLight.position, \"y\")\n        //   .min(-10)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlightY\");\n        // gui\n        //   .add(directionalLight2.position, \"z\")\n        //   .min(-10)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlightZ\");\n        var directionalLight2 = new THREE.DirectionalLight(16777215, 3);\n        directionalLight2.position.set(-10, 10, -10);\n        scene.add(directionalLight2);\n        // gui\n        //   .add(directionalLight2, \"intensity\")\n        //   .min(0)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlight2intensity\");\n        // gui\n        //   .add(directionalLight2.position, \"x\")\n        //   .min(-10)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlight2X\");\n        // gui\n        //   .add(directionalLight2.position, \"y\")\n        //   .min(-10)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlight2Y\");\n        // gui\n        //   .add(directionalLight2.position, \"z\")\n        //   .min(-10)\n        //   .max(10)\n        //   .step(0.001)\n        //   .name(\"directionlight2Z\");\n        renderer = new THREE.WebGLRenderer({\n            antialias: true,\n            alpha: true\n        });\n        renderer.shadowMap.enabled = true;\n        renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n        renderer.setClearColor(16777215, 0);\n        renderer.physicallyCorrectLights = true;\n        renderer.outputEncoding = THREE.sRGBEncoding;\n        renderer.setSize(window.innerWidth, window.innerHeight);\n        renderer.setAnimationLoop(animation);\n        mountRef.current.appendChild(renderer.domElement);\n        // Controls\n        controls = new _orbitControlsJs.OrbitControls(camera, renderer.domElement);\n        controls.update();\n        controls.enableDamping = true;\n        // Animation button\n        var animateButton = document.getElementById('animate-button');\n        var stopAnimation = function(e) {\n            if (runAnim) {\n                runAnim = false;\n                isPlay = true;\n                animation();\n                console.log('animation starts');\n            } else {\n                runAnim = true;\n                isPlay = false;\n                console.log('animation stops');\n            }\n        };\n        animateButton.addEventListener('click', stopAnimation);\n        //Resize\n        window.addEventListener('resize', function() {\n            camera.aspect = window.innerWidth / window.innerHeight;\n            camera.updateProjectionMatrix();\n            renderer.setSize(window.innerWidth, window.innerHeight);\n        });\n        return function() {\n            return mountRef.removeChild(renderer.domElement);\n        };\n    }, []);\n    var ref = (0, _react).useState('#ffffff'), color = ref[0], setColor = ref[1];\n    return(/*#__PURE__*/ (0, _jsxDevRuntime).jsxDEV(\"div\", {\n        children: /*#__PURE__*/ (0, _jsxDevRuntime).jsxDEV(\"div\", {\n            ref: mountRef,\n            children: [\n                /*#__PURE__*/ (0, _jsxDevRuntime).jsxDEV(_animationButton.default, {}, void 0, false, {\n                    fileName: \"/Users/Eleanor/Desktop/uu/bones-2-voxel/components/VoxelImage.js\",\n                    lineNumber: 270,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0, _jsxDevRuntime).jsxDEV(_bs.BsFillPaletteFill, {\n                    onClick: function() {\n                        return generate();\n                    },\n                    className: \"absolute top-[85px] left-[30px] cursor-pointer\",\n                    size: 30\n                }, void 0, false, {\n                    fileName: \"/Users/Eleanor/Desktop/uu/bones-2-voxel/components/VoxelImage.js\",\n                    lineNumber: 271,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/Eleanor/Desktop/uu/bones-2-voxel/components/VoxelImage.js\",\n            lineNumber: 269,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/Eleanor/Desktop/uu/bones-2-voxel/components/VoxelImage.js\",\n        lineNumber: 268,\n        columnNumber: 5\n    }, this));\n}, \"LMxsp3aIJSdkWw1FJTWWlKYuM/E=\", false, function() {\n    return [\n        _router.useRouter\n    ];\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFFckQsRUFBUTtRQUNScEcsTUFBTSxDQUFDc0csZ0JBQWdCLENBQUMsQ0FBUSxTQUFFLFFBQ3RDLEdBRDRDLENBQUM7WUFDdkN0SCxNQUFNLENBQUN5RixNQUFNLEdBQUd6RSxNQUFNLENBQUNtRCxVQUFVLEdBQUduRCxNQUFNLENBQUNvRCxXQUFXO1lBQ3REcEUsTUFBTSxDQUFDdUgsc0JBQXNCO1lBQzdCckgsUUFBUSxDQUFDMEcsT0FBTyxDQUFDNUYsTUFBTSxDQUFDbUQsVUFBVSxFQUFFbkQsTUFBTSxDQUFDb0QsV0FBVztRQUN4RCxDQUFDO1FBRUQsTUFBTSxDQUFDLFFBQVE7WUFBRjFCLE1BQU0sQ0FBTkEsUUFBUSxDQUFDOEUsV0FBVyxDQUFDdEgsUUFBUSxDQUFDOEcsVUFBVTs7SUFDdkQsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNMLEdBQUssQ0FBcUJTLEdBQW1CLE9BQW5CQSxNQUFRLFdBQUMsQ0FBUyxXQUFyQ0MsS0FBSyxHQUFjRCxHQUFtQixLQUEvQkUsUUFBUSxHQUFJRixHQUFtQjtJQUM3QyxNQUFNLDBDQUNIRyxDQUFHOzJEQUNEQSxDQUFHO1lBQUNDLEdBQUcsRUFBRW5GLFFBQVE7O3lEQUNmb0YsZ0JBQWU7Ozs7O3lEQUNmQyxHQUFpQjtvQkFDaEJDLE9BQU8sRUFBRSxRQUFRO3dCQUFGOUcsTUFBTSxDQUFOQSxRQUFROztvQkFDdkIrRyxTQUFTLEVBQUMsQ0FBZ0Q7b0JBQzFEQyxJQUFJLEVBQUUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEIsQ0FBQzs7UUFuTWdCM0YsT0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1ZveGVsSW1hZ2UuanM/NjBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgKiBhcyBkYXQgZnJvbSAnbGlsLWd1aSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFuaW1hdGlvbkJ1dHRvbiBmcm9tICcuL0FuaW1hdGlvbkJ1dHRvbic7XG5pbXBvcnQgeyBCc0ZpbGxQYWxldHRlRmlsbCB9IGZyb20gJ3JlYWN0LWljb25zL2JzJztcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scy5qcyc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5cbmxldCBjYW1lcmEsIHNjZW5lLCByZW5kZXJlcjtcbmNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKCk7XG5sZXQgbWl4ZXIgPSBudWxsO1xubGV0IGNvbnRyb2xzO1xuY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbmxldCBwcmV2aW91c1RpbWUgPSAwO1xuXG4vL3N0YXJ0IGFuZCBzdG9wIGJ1dHRvblxubGV0IHJ1bkFuaW0gPSBmYWxzZTtcbmxldCBpc1BsYXkgPSB0cnVlO1xuXG4vL2FuaW1hdGlvblxuZnVuY3Rpb24gYW5pbWF0aW9uKCkge1xuICBpZiAoIWlzUGxheSkgcmV0dXJuO1xuICAvLyBjb25zdCBlbGFwc2VkVGltZSA9IGNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gIC8vIGNvbnN0IGRlbHRhVGltZSA9IGVsYXBzZWRUaW1lIC0gcHJldmlvdXNUaW1lO1xuICAvLyBwcmV2aW91c1RpbWUgPSBlbGFwc2VkVGltZTtcblxuICAvL1VwZGF0ZSBtaXhlclxuICBpZiAobWl4ZXIgIT09IG51bGwpIHtcbiAgICAvLyBtaXhlci51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICBtaXhlci51cGRhdGUoY2xvY2suZ2V0RGVsdGEoKSk7XG4gIH1cblxuICAvLyBVcGRhdGUgY29udHJvbHNcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcigpO1xuXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbiAgLy8gcmVuZGVyKCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxuXG4vL2dlbmVyYXRlIHJhbmRvbSBncmFkaWVudCBiYWNrZ3JvdW5kXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcbiAgY29uc3QgaGV4VmFsdWVzID0gW1xuICAgICcwJyxcbiAgICAnMScsXG4gICAgJzInLFxuICAgICczJyxcbiAgICAnNCcsXG4gICAgJzUnLFxuICAgICc2JyxcbiAgICAnNycsXG4gICAgJzgnLFxuICAgICc5JyxcbiAgICAnYScsXG4gICAgJ2InLFxuICAgICdjJyxcbiAgICAnZCcsXG4gICAgJ2UnLFxuICBdO1xuXG4gIGZ1bmN0aW9uIHBvcHVsYXRlKGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgbGV0IHggPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxNCk7XG4gICAgICBsZXQgeSA9IGhleFZhbHVlc1t4XTtcbiAgICAgIGEgKz0geTtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBjb25zdCBuZXdDb2xvcjEgPSBwb3B1bGF0ZSgnIycpO1xuICBjb25zdCBuZXdDb2xvcjIgPSBwb3B1bGF0ZSgnIycpO1xuXG4gIGNvbnN0IGdyYWRpZW50ID0gJ2xpbmVhci1ncmFkaWVudCgjZmZmZmZmLCAnICsgbmV3Q29sb3IyICsgJyknO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVyYWxsJykuc3R5bGUuYmFja2dyb3VuZCA9IGdyYWRpZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFZveGVsSW1hZ2UoKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB2b3hlbElkID0gcm91dGVyLnF1ZXJ5LnZveGVsSWQ7XG4gIGNvbnN0IG1vdW50UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gRGVidWdcbiAgICBjb25zdCBndWkgPSBuZXcgZGF0LkdVSSgpO1xuXG4gICAgLy9Nb2RlbFxuICAgIGxvYWRlci5sb2FkKGAvZ2x0Zi8ke3ZveGVsSWR9LmdsdGZgLCAoZ2x0ZikgPT4ge1xuICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZShmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcbiAgICAgICAgaWYgKG5vZGUuaXNNZXNoKSB7XG4gICAgICAgICAgbm9kZS5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcihnbHRmLnNjZW5lKTtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IG1peGVyLmNsaXBBY3Rpb24oZ2x0Zi5hbmltYXRpb25zWzBdKTtcbiAgICAgIGFjdGlvbi5wbGF5KCk7XG4gICAgICBhbmltYXRpb24oKTtcblxuICAgICAgZ2x0Zi5zY2VuZS5zY2FsZS5zZXQoMC4wOCwgMC4wOCwgMC4wOCk7XG4gICAgICBnbHRmLnNjZW5lLnBvc2l0aW9uLnNldCgwLCAtMy41LCAwKTtcbiAgICAgIGdsdGYuc2NlbmUucm90YXRpb24ueSA9IE1hdGguUEkgKiAwLjMxO1xuICAgICAgc2NlbmUuYWRkKGdsdGYuc2NlbmUpO1xuXG4gICAgICAvLyBndWlcbiAgICAgIC8vICAgLmFkZChnbHRmLnNjZW5lLnJvdGF0aW9uLCBcInlcIilcbiAgICAgIC8vICAgLm1pbigtTWF0aC5QSSlcbiAgICAgIC8vICAgLm1heChNYXRoLlBJKVxuICAgICAgLy8gICAuc3RlcCgwLjAwMSlcbiAgICAgIC8vICAgLm5hbWUoXCJyb3RhdGlvblwiKTtcbiAgICB9KTtcblxuICAgIC8vQ2FtZXJhXG4gICAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFxuICAgICAgNzAsXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIDAuMSxcbiAgICAgIDEwMFxuICAgICk7XG4gICAgY2FtZXJhLnBvc2l0aW9uLnNldCg0LCAwLCA1KTtcbiAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgLy9DcmVhdGUgYSBwbGFuZSB0aGF0IHJlY2VpdmVzIHNoYWRvd3MgKGJ1dCBkb2VzIG5vdCBjYXN0IHRoZW0pXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxMDAsIDEwMCwgMSwgMSk7XG4gICAgZ2VvbWV0cnkucm90YXRlWCgtTWF0aC5QSSAvIDIpO1xuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZG93TWF0ZXJpYWwoKTtcbiAgICBtYXRlcmlhbC5vcGFjaXR5ID0gMC4xO1xuXG4gICAgY29uc3QgcGxhbmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHBsYW5lLnBvc2l0aW9uLnkgPSAtMy41O1xuICAgIHBsYW5lLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgIHNjZW5lLmFkZChwbGFuZSk7XG5cbiAgICAvLyBndWlcbiAgICAvLyAgIC5hZGQocGxhbmUucG9zaXRpb24sICd5JylcbiAgICAvLyAgIC5taW4oLTEwKVxuICAgIC8vICAgLm1heCgxMClcbiAgICAvLyAgIC5zdGVwKDAuMDAxKVxuICAgIC8vICAgLm5hbWUoJ2xlbmd0aG9mU2hhZG93Jyk7XG5cbiAgICAvL0xpZ2h0c1xuICAgIGNvbnN0IGFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDAuNSk7XG4gICAgc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG4gICAgZ3VpXG4gICAgICAuYWRkKGFtYmllbnRMaWdodCwgJ2ludGVuc2l0eScpXG4gICAgICAubWluKC0xMClcbiAgICAgIC5tYXgoMTApXG4gICAgICAuc3RlcCgwLjAwMSlcbiAgICAgIC5uYW1lKCdhbWJpZW50bGlnaHRpbnRlbnNpdHknKTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMik7XG4gICAgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbi5zZXQoOSwgMTAsIDEwKTtcbiAgICBkaXJlY3Rpb25hbExpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlO1xuXG4gICAgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3cuY2FtZXJhLmZvdiA9IDMwO1xuICAgIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93LmNhbWVyYS5hc3BlY3QgPSAxO1xuICAgIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMTA7XG4gICAgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDUwO1xuICAgIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDE7XG4gICAgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDUxMjtcbiAgICBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDUxMjtcblxuICAgIHNjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0KTtcblxuICAgIC8vIGd1aVxuICAgIC8vICAgLmFkZChkaXJlY3Rpb25hbExpZ2h0LCBcImludGVuc2l0eVwiKVxuICAgIC8vICAgLm1pbigwKVxuICAgIC8vICAgLm1heCgxMClcbiAgICAvLyAgIC5zdGVwKDAuMDAxKVxuICAgIC8vICAgLm5hbWUoXCJkaXJlY3Rpb25saWdodGludGVuc2l0eVwiKTtcbiAgICAvLyBndWlcbiAgICAvLyAgIC5hZGQoZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbiwgXCJ4XCIpXG4gICAgLy8gICAubWluKC0xMClcbiAgICAvLyAgIC5tYXgoMTApXG4gICAgLy8gICAuc3RlcCgwLjAwMSlcbiAgICAvLyAgIC5uYW1lKFwiZGlyZWN0aW9ubGlnaHRYXCIpO1xuICAgIC8vIGd1aVxuICAgIC8vICAgLmFkZChkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLCBcInlcIilcbiAgICAvLyAgIC5taW4oLTEwKVxuICAgIC8vICAgLm1heCgxMClcbiAgICAvLyAgIC5zdGVwKDAuMDAxKVxuICAgIC8vICAgLm5hbWUoXCJkaXJlY3Rpb25saWdodFlcIik7XG4gICAgLy8gZ3VpXG4gICAgLy8gICAuYWRkKGRpcmVjdGlvbmFsTGlnaHQyLnBvc2l0aW9uLCBcInpcIilcbiAgICAvLyAgIC5taW4oLTEwKVxuICAgIC8vICAgLm1heCgxMClcbiAgICAvLyAgIC5zdGVwKDAuMDAxKVxuICAgIC8vICAgLm5hbWUoXCJkaXJlY3Rpb25saWdodFpcIik7XG5cbiAgICBjb25zdCBkaXJlY3Rpb25hbExpZ2h0MiA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAzKTtcbiAgICBkaXJlY3Rpb25hbExpZ2h0Mi5wb3NpdGlvbi5zZXQoLTEwLCAxMCwgLTEwKTtcbiAgICBzY2VuZS5hZGQoZGlyZWN0aW9uYWxMaWdodDIpO1xuXG4gICAgLy8gZ3VpXG4gICAgLy8gICAuYWRkKGRpcmVjdGlvbmFsTGlnaHQyLCBcImludGVuc2l0eVwiKVxuICAgIC8vICAgLm1pbigwKVxuICAgIC8vICAgLm1heCgxMClcbiAgICAvLyAgIC5zdGVwKDAuMDAxKVxuICAgIC8vICAgLm5hbWUoXCJkaXJlY3Rpb25saWdodDJpbnRlbnNpdHlcIik7XG4gICAgLy8gZ3VpXG4gICAgLy8gICAuYWRkKGRpcmVjdGlvbmFsTGlnaHQyLnBvc2l0aW9uLCBcInhcIilcbiAgICAvLyAgIC5taW4oLTEwKVxuICAgIC8vICAgLm1heCgxMClcbiAgICAvLyAgIC5zdGVwKDAuMDAxKVxuICAgIC8vICAgLm5hbWUoXCJkaXJlY3Rpb25saWdodDJYXCIpO1xuICAgIC8vIGd1aVxuICAgIC8vICAgLmFkZChkaXJlY3Rpb25hbExpZ2h0Mi5wb3NpdGlvbiwgXCJ5XCIpXG4gICAgLy8gICAubWluKC0xMClcbiAgICAvLyAgIC5tYXgoMTApXG4gICAgLy8gICAuc3RlcCgwLjAwMSlcbiAgICAvLyAgIC5uYW1lKFwiZGlyZWN0aW9ubGlnaHQyWVwiKTtcbiAgICAvLyBndWlcbiAgICAvLyAgIC5hZGQoZGlyZWN0aW9uYWxMaWdodDIucG9zaXRpb24sIFwielwiKVxuICAgIC8vICAgLm1pbigtMTApXG4gICAgLy8gICAubWF4KDEwKVxuICAgIC8vICAgLnN0ZXAoMC4wMDEpXG4gICAgLy8gICAubmFtZShcImRpcmVjdGlvbmxpZ2h0MlpcIik7XG5cbiAgICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlLCBhbHBoYTogdHJ1ZSB9KTtcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwO1xuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHhmZmZmZmYsIDApO1xuICAgIHJlbmRlcmVyLnBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzID0gdHJ1ZTtcbiAgICByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZztcblxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgcmVuZGVyZXIuc2V0QW5pbWF0aW9uTG9vcChhbmltYXRpb24pO1xuICAgIG1vdW50UmVmLmN1cnJlbnQuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAvLyBDb250cm9sc1xuICAgIGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICBjb250cm9scy51cGRhdGUoKTtcbiAgICBjb250cm9scy5lbmFibGVEYW1waW5nID0gdHJ1ZTtcblxuICAgIC8vIEFuaW1hdGlvbiBidXR0b25cbiAgICBjb25zdCBhbmltYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FuaW1hdGUtYnV0dG9uJyk7XG4gICAgY29uc3Qgc3RvcEFuaW1hdGlvbiA9IChlKSA9PiB7XG4gICAgICBpZiAocnVuQW5pbSkge1xuICAgICAgICBydW5BbmltID0gZmFsc2U7XG4gICAgICAgIGlzUGxheSA9IHRydWU7XG4gICAgICAgIGFuaW1hdGlvbigpO1xuICAgICAgICBjb25zb2xlLmxvZygnYW5pbWF0aW9uIHN0YXJ0cycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcnVuQW5pbSA9IHRydWU7XG4gICAgICAgIGlzUGxheSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZygnYW5pbWF0aW9uIHN0b3BzJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICBhbmltYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RvcEFuaW1hdGlvbik7XG5cbiAgICAvL1Jlc2l6ZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiBtb3VudFJlZi5yZW1vdmVDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgfSwgW10pO1xuICBjb25zdCBbY29sb3IsIHNldENvbG9yXSA9IHVzZVN0YXRlKCcjZmZmZmZmJyk7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxkaXYgcmVmPXttb3VudFJlZn0+XG4gICAgICAgIDxBbmltYXRpb25CdXR0b24gLz5cbiAgICAgICAgPEJzRmlsbFBhbGV0dGVGaWxsXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gZ2VuZXJhdGUoKX1cbiAgICAgICAgICBjbGFzc05hbWU9J2Fic29sdXRlIHRvcC1bODVweF0gbGVmdC1bMzBweF0gY3Vyc29yLXBvaW50ZXInXG4gICAgICAgICAgc2l6ZT17MzB9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibmFtZXMiOlsiVEhSRUUiLCJkYXQiLCJjYW1lcmEiLCJzY2VuZSIsInJlbmRlcmVyIiwibG9hZGVyIiwiR0xURkxvYWRlciIsIm1peGVyIiwiY29udHJvbHMiLCJjbG9jayIsIkNsb2NrIiwicHJldmlvdXNUaW1lIiwicnVuQW5pbSIsImlzUGxheSIsImFuaW1hdGlvbiIsInVwZGF0ZSIsImdldERlbHRhIiwicmVuZGVyIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZ2VuZXJhdGUiLCJwb3B1bGF0ZSIsImEiLCJpIiwieCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInkiLCJoZXhWYWx1ZXMiLCJuZXdDb2xvcjEiLCJuZXdDb2xvcjIiLCJncmFkaWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsImJhY2tncm91bmQiLCJtb2R1bGUiLCJleHBvcnRzIiwiVm94ZWxJbWFnZSIsInJvdXRlciIsInVzZVJvdXRlciIsInZveGVsSWQiLCJxdWVyeSIsIm1vdW50UmVmIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiZ3VpIiwiR1VJIiwibG9hZCIsImdsdGYiLCJ0cmF2ZXJzZSIsIm5vZGUiLCJjb25zb2xlIiwibG9nIiwiaXNNZXNoIiwiY2FzdFNoYWRvdyIsIkFuaW1hdGlvbk1peGVyIiwiYWN0aW9uIiwiY2xpcEFjdGlvbiIsImFuaW1hdGlvbnMiLCJwbGF5Iiwic2NhbGUiLCJzZXQiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwiUEkiLCJhZGQiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIlNjZW5lIiwiZ2VvbWV0cnkiLCJQbGFuZUdlb21ldHJ5Iiwicm90YXRlWCIsIm1hdGVyaWFsIiwiU2hhZG93TWF0ZXJpYWwiLCJvcGFjaXR5IiwicGxhbmUiLCJNZXNoIiwicmVjZWl2ZVNoYWRvdyIsImFtYmllbnRMaWdodCIsIkFtYmllbnRMaWdodCIsIm1pbiIsIm1heCIsInN0ZXAiLCJuYW1lIiwiZGlyZWN0aW9uYWxMaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJzaGFkb3ciLCJmb3YiLCJhc3BlY3QiLCJuZWFyIiwiZmFyIiwiYmlhcyIsIm1hcFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImRpcmVjdGlvbmFsTGlnaHQyIiwiV2ViR0xSZW5kZXJlciIsImFudGlhbGlhcyIsImFscGhhIiwic2hhZG93TWFwIiwiZW5hYmxlZCIsInR5cGUiLCJQQ0ZTb2Z0U2hhZG93TWFwIiwic2V0Q2xlYXJDb2xvciIsInBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzIiwib3V0cHV0RW5jb2RpbmciLCJzUkdCRW5jb2RpbmciLCJzZXRTaXplIiwic2V0QW5pbWF0aW9uTG9vcCIsImN1cnJlbnQiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJPcmJpdENvbnRyb2xzIiwiZW5hYmxlRGFtcGluZyIsImFuaW1hdGVCdXR0b24iLCJzdG9wQW5pbWF0aW9uIiwiZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwicmVtb3ZlQ2hpbGQiLCJ1c2VTdGF0ZSIsImNvbG9yIiwic2V0Q29sb3IiLCJkaXYiLCJyZWYiLCJBbmltYXRpb25CdXR0b24iLCJCc0ZpbGxQYWxldHRlRmlsbCIsIm9uQ2xpY2siLCJjbGFzc05hbWUiLCJzaXplIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/VoxelImage.js\n");

/***/ })

});