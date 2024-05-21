import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Pane } from 'tweakpane';
const pane = new Pane()
console.log(pane);
// console.log(OrbitControls);

const scene = new THREE.Scene()
//Creating custom geometry 
// const geometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
// 	0, 0,  0, // v0
// 	2, 0,  0, // v1
// 	0, 2,  0, // v2

// ])
// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
// const material = new THREE.MeshBasicMaterial( { color: "white" } );
// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );


let cubeGeo = new THREE.TorusKnotGeometry(1,0.4,64,8)
const cubeMaterial = new THREE.MeshPhysicalMaterial()
cubeMaterial.color = new THREE.Color("red")
//cubeMaterial.side = 2 //or THREE.DoubleSide
cubeMaterial.transparent = true
cubeMaterial.opacity = 0.9
cubeMaterial.fog = false
pane.addBinding(cubeMaterial, 'metalness',{
min: 0,
max: 1,
scale:0.1
})
pane.addBinding(cubeMaterial, 'roughness',{
min: -2,
max: 1,
scale:0.1
})
pane.addBinding(cubeMaterial, 'reflectivity',{
min: -2,
max: 1,
scale:0.1
})
pane.addBinding(cubeMaterial, 'clearcoat',{
min: -2,
max: 1,
scale:0.1
})

const cubeMesh = new THREE.Mesh(cubeGeo,cubeMaterial)
cubeMesh.position.set(0,0,0)

const planeGeometry = new THREE.PlaneGeometry(1,1)
const plane = new THREE.Mesh(planeGeometry,cubeMaterial)
plane.position.set(-1.5,0,0)
scene.add( plane )


const fog = new THREE.Fog("black", 1, 20)
scene.fog = fog
scene.background = new THREE.Color("black")

const directionalLight = new THREE.DirectionalLight()
const helper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(helper)
directionalLight.position.set(0,0,5)
directionalLight.intensity = 1
directionalLight.color = new THREE.Color("white")
scene.add( directionalLight)

// cubeMesh.rotation.y = Math.PI * 2 // Default rotation
//Easier method for calculating rotation
// cubeMesh.rotation.reorder('YXZ') //called to order the rotation process

// const cubeMesh2 = new THREE.Mesh(cubeGeo,cubeMaterial)
// cubeMesh2.position.set(1.2,0,)
// console.log(cubeMesh2);
// const cubeMesh3 = new THREE.Mesh(cubeGeo,cubeMaterial)
// cubeMesh3.position.set(2.4,0,0)
// const group = new THREE.Group
// group.add(cubeMesh)
// group.add(cubeMesh2)
// group.add(cubeMesh3)

// The Method of adding new stuff to the scene
// scene.add(group)
scene.add(cubeMesh)
const planeParameters = {
    width: 1,
    height:1,
}
const planeFolder = pane.addFolder({
    title: "Oba",
    expanded: true,
})
planeFolder.addBinding(planeParameters, "width", {
    min: 0,
    max: 10,
    step:0.01,
    label: "AAAA"
})
.on("change", ()=>{
    cubeGeo = new THREE.PlaneGeometry(planeParameters.width,planeParameters.height)
    cubeMesh.geometry = cubeGeo
})
planeFolder.addBinding(planeParameters, "height", {
    min: 0,
    max: 10,
    step:0.01,
    label: "AAAA"
})
.on("change", ()=>{
    cubeGeo = new THREE.PlaneGeometry(planeParameters.width,planeParameters.height)
    cubeMesh.geometry = cubeGeo
})
// const tempVector = new THREE.Vector3(0,3,0)
// cubeMesh.position.y = 0.5
// cubeMesh.position.x = -1
// cubeMesh.position.z = -1
// cubeMesh.position.copy(tempVector)

const axesHelper = new THREE.AxesHelper(1)
cubeMesh.add(axesHelper)

const camera = new THREE.PerspectiveCamera(
    20, 
    window.innerWidth / window.innerHeight,
    0.1,
    200
    )
camera.position.z = 5
// Not needed but you can add it(camera) to the scene
scene.add(camera)

console.log(cubeMesh.position.distanceTo(camera.position));
//use .set for changing 3 values at the same time

//DOM container
const canvas = document.querySelector('.threejs')
//render what we have
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
//How to add controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

renderer.setSize(window.innerWidth, window.innerHeight)
// This is a way to fix antialiasing issue where edges look like stairs
// renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
// console.log(window.devicePixelRatio);

const clock = new THREE.Clock()
let previousTime = 0
const renderloop =() => {
    //delta equation
    const currentTime = clock.getElapsedTime()
    const delta = currentTime - previousTime
    previousTime = currentTime

    // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20
    // console.log(Math.sin(currentTime));
    // cubeMesh.rotation.y = Math.sin(currentTime) +2

    // cubeMesh.rotation.x += THREE.MathUtils.degToRad(10)
    // console.log("rendered");
    controls.update()
    renderer.render(scene, camera) // the rendering loop
    window.requestAnimationFrame(renderloop)
}
renderloop()

// console.log(canvas);
// console.log(scene);
// console.log(cubeMesh);