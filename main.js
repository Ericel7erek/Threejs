import * as THREE from 'three'

const scene = new THREE.Scene()

const cubeGeo = new THREE.BoxGeometry(1,1,1)

const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
cubeGeo,
cubeMaterial
)

scene.add(cubeMesh)

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,0.1,30)
camera.position.z = 5

scene.add(camera)


const canvas = document.querySelector('.threejs')

const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)


console.log(canvas);
console.log(scene);
console.log(cubeMesh);