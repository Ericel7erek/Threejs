import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
console.log(OrbitControls);

const scene = new THREE.Scene()

const cubeGeo = new THREE.BoxGeometry(1,1,1)

const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
cubeGeo,
cubeMaterial
)
// The Method of adding new stuff to the scene
scene.add(cubeMesh)

const camera = new THREE.PerspectiveCamera(
    20, 
    window.innerWidth / window.innerHeight,
    0.1,
    10
    )
camera.position.z = 5
// Not needed but you can add it(camera) to the scene
scene.add(camera)

//DOM container
const canvas = document.querySelector('.threejs')
//render what we have
const renderer = new THREE.WebGLRenderer({canvas})

//How to add controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

const renderloop =() => {
    console.log("rendered");
    controls.update()
    renderer.render(scene, camera) // the rendering loop
    window.requestAnimationFrame(renderloop)
}
renderloop()

console.log(canvas);
console.log(scene);
console.log(cubeMesh);