import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry, textGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { TextureDataType } from 'three'
/**
 * Debug
 */
window.createImageBitmap = undefined
document.title = 'Act Natural'
let direction = false
const gui = new dat.GUI()
gui.hide()
const parameters = {
    materialColor: '#000000',
    materialColor2: '#2f2f2f'
}
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/matcaps/4.png')
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/Painterz_Regular.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Act Natural',
            {
                font: font,
                size: .3,
                height: 0.3,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2
            }
        )
       textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, textMaterial)
      
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            text.position.set(4.5,2.6,215)
           }
        else
        {
            text.position.set(.1,1.4,214)
        }
        text.rotation.set(0,.7,0)
        console.log(text.position.y)
        scene.add(text)
    }
)
gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>
    {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })



/**
 * Base
 */
// Canvas

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// button
var button = document.getElementById("explore")
let changeScene = false

//raycaster
const raycaster = new THREE.Raycaster()

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();


// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();

//loading manager
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function(url, item, total)
{
    console.log(`started loading: ${url}`)
    button.style.display = 'none'
}

const progressBar = document.getElementById('progress-bar')
loadingManager.onProgress = function(url, loaded, total)
{
   progressBar.value = (loaded / total) * 100

}

const progressBarContainer = document.querySelector('.progress-bar-container')
let centerLogo = false
loadingManager.onLoad = function()
{
    progressBarContainer.style.display = 'none'
    button.style.display = 'inline'
    centerLogo = true
}


/*
loadingManager.onError = function(url)
{
    console.log(`Got a problem loading: ${url}`)
}
*/

button.onclick = function()
{
    audioLoader.load( 'sounds/quille ad-lib.wav', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 1 );
        sound.play();
    });

    changeScene = true
    console.log(changeScene)
    document.getElementById("explore").style.visibility = "hidden"
}

/**
 * Objects
 */
const gltfLoader = new GLTFLoader(loadingManager)
let logo
gltfLoader.load(
    'logo/logo.gltf',
    (gltf) =>
    {
        logo = gltf.scene
        logo.position.set(1.2,.9,0)
        logo.scale.set(.1,.1,.1)
        logo.rotation.set(-1.5, 0,3)
       
        scene.add(logo)
        console.log(logo)
    }
)

let hall
gltfLoader.load(
    'gas/scene.gltf',  
    (gltf) =>
    {
        hall = gltf.scene
        hall.position.set(1.2,-.38,160)
        hall.scale.set(1,1,26)
        hall.rotation.set(0,0,0)
        scene.add(hall)
        console.log(hall)
    }
)

let gas
gltfLoader.load(
    'gas/final4.glb',  
    (gltf) =>
    {
        gas = gltf.scene
        gas.position.set(0,-1, 230)
        gas.scale.set(.3,.3,.3)
        gas.rotation.set(0,1.57,0)
        scene.add(gas)
        console.log(gas)
    }
)
let shop
gltfLoader.load(
    'shop/shop.glb',  
    (gltf) =>
    {
        shop = gltf.scene
        shop.position.set(0,300, 210)
        shop.scale.set(.6,.6,.6)
        shop.rotation.set(0,3.2,0)
        scene.add(shop)
        console.log(shop)
    }
)

let billboard
gltfLoader.load(
    'billboard/scene.gltf',  
    (gltf) =>
    {
        billboard = gltf.scene
        billboard.position.set(-1.5,-4.3,207)
        billboard.scale.set(.5,.5,.5)
        billboard.rotation.set(0,.5,0)
        scene.add(billboard)
        console.log(billboard)
    }
)
let spotify
gltfLoader.load(
    'billboard/spotify.glb',  
    (gltf) =>
    {
        spotify = gltf.scene
        spotify.traverse((child)=>{
            if(child.isMesh){
                child.name = 'spotify'
            }
        })
        spotify.position.set(-1.7,2.6,208)
        spotify.scale.set(.15,.15,.15)
        spotify.rotation.set(0,.5,0)
        scene.add(spotify)
        console.log(spotify)
    }
)
let tiktok
gltfLoader.load(
    'billboard/tiktok.glb',  
    (gltf) =>
    {
        tiktok = gltf.scene
        tiktok.traverse((child)=>{
            if(child.isMesh){
                child.name = 'tiktok'
            }
        })
        tiktok.position.set(-.57,2.6,208)
        tiktok.scale.set(.15,.15,.15)
        tiktok.rotation.set(0,.5,0)
        scene.add(tiktok)
        console.log(tiktok)
    }
)

let youtube
gltfLoader.load(
    'billboard/youtube1.glb',  
    (gltf) =>
    {
        youtube = gltf.scene
        youtube.traverse((child)=>{
            if(child.isMesh){
                child.name = 'youtube'
            }
        })
        youtube.position.set(-2.75,2.4,209)
        youtube.scale.set(.7,.7,.7)
        youtube.rotation.set(0,-1,-.5)
        scene.add(youtube)
        console.log(youtube)
    }
)

let cap
gltfLoader.load(
    'billboard/cap.glb',  
    (gltf) =>
    {
        cap = gltf.scene
        cap.traverse((child)=>{
            if(child.isMesh){
                child.name = 'cap'
            }
        })
        cap.position.set(-1.7,1.8,208)
        cap.scale.set(.2,.2,.2)
        cap.rotation.set(-.2,-.7,-.7)
        scene.add(cap)
        console.log(cap)
    }
)
let insta
gltfLoader.load(
    'billboard/instagram_logo.glb',  
    (gltf) =>
    {
        insta = gltf.scene
        insta.traverse((child)=>{
            if(child.isMesh){
                child.name = 'insta'
            }
        })
        insta.position.set(-1,1.8,210.5)
        insta.scale.set(17,17,17)
        insta.rotation.set(-1.8,-1.8,-.5)
        scene.add(insta)
        console.log(insta)
    }
)
let itunes
gltfLoader.load(
    'billboard/itunes.glb',  
    (gltf) =>
    {
        itunes = gltf.scene
        itunes.traverse((child)=>{
            if(child.isMesh){
                child.name = 'itunes'
            }
        })
        itunes.position.set(-2.2,2.7,209)
        itunes.scale.set(.075,.075,.075)
        itunes.rotation.set(1.5,0,-.4)
        scene.add(itunes)
        console.log(itunes)
    }
)




// Texture
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})
// Material2
const material2 = new THREE.MeshToonMaterial({
    color: parameters.materialColor2,
    gradientMap: gradientTexture
})
const geometry = new THREE.PlaneGeometry( 70, 70 );
const plane = new THREE.Mesh( geometry, material2);
plane.position.set(0,0,206)
scene.add(plane);
/**
 * Lights
 */
const directionalLight = new THREE.AmbientLight('#ffd591', 1.4)
directionalLight.position.set(0, 0, 218)
scene.add(directionalLight)

/**
 * Particles
 */

// Geometry
const particlesCount = 500
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] =   0.5 - Math.random() * 1
    positions[i * 3 + 2] = (Math.random() - 0.5) * 7

    
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: textureLoader,
    size: 0.03
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//mouse
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 -1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
    
})

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 1, 100)
camera.position.x =1.2
camera.position.z = 5.6
cameraGroup.add(camera)
camera.add( listener );
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */


/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
    
})
window.addEventListener('click', () =>
{
    if(currentIntersect)
    {
        
        //console.log(currentIntersect.object.name)
        switch(currentIntersect.object.name)
        {
            case "tiktok":
                console.log('click on object 1')
                window.open('https://www.tiktok.com/@actnaturaldc')
                break

            case "youtube":
                window.open('https://www.youtube.com/channel/UCi_vNTzvV95myqwgACgaVvA')
                break

            case "spotify":
                console.log('click on object 3')
                window.open('https://open.spotify.com/artist/41HuWTMv2g0PvtDDCmFUpg')
                break
                
            case "insta":
                console.log('click on object 4')
                window.open('https://www.instagram.com/actnaturaldc/?hl=en')
                break

            case "itunes":
                console.log('click on object 5')
                window.open('https://music.apple.com/us/artist/act-natural/1473074193')
                break

            case "cap":
                console.log('click on object 6')
                window.open('https://act-natural-music.myshopify.com/')
            break
        }
    }
})

window.addEventListener('touchstart', (event) =>
{
    if(currentIntersect)
    {   event.stopPropagation();
        event.preventDefault();
        //console.log(currentIntersect.object.name)
        switch(currentIntersect.object.name)
        {
            case "tiktok":
                console.log('click on object 1')
                window.open('https://www.tiktok.com/@actnaturaldc')
                break

            case "youtube":
                window.open('https://www.youtube.com/channel/UCi_vNTzvV95myqwgACgaVvA')
                break

            case "spotify":
                console.log('click on object 3')
                window.open('https://open.spotify.com/artist/41HuWTMv2g0PvtDDCmFUpg')
                break
                
            case "insta":
                console.log('click on object 4')
                window.open('https://www.instagram.com/actnaturaldc/?hl=en')
                break

            case "itunes":
                console.log('click on object 5')
                window.open('https://music.apple.com/us/artist/act-natural/1473074193')
                break

            case "cap":
                console.log('click on object 6')
                window.open('https://act-natural-music.myshopify.com/')
            break
        }
    }
})

/**
 * Animate
 */

let tiktokGrow = false
let spotifyGrow = false
let currentIntersect = false
const clickFunc = function()
{
    if(currentIntersect)
    {
        
        //console.log(currentIntersect.object.name)
        switch(currentIntersect.object.name)
        {
            case "tiktok":
                console.log('click on object 1')
                window.open('https://www.tiktok.com/@actnaturaldc')
                break

            case "youtube":
                window.open('https://www.youtube.com/channel/UCi_vNTzvV95myqwgACgaVvA')
                break

            case "spotify":
                console.log('click on object 3')
                window.open('https://open.spotify.com/artist/41HuWTMv2g0PvtDDCmFUpg')
                break
                
            case "insta":
                console.log('click on object 4')
                window.open('https://www.instagram.com/actnaturaldc/?hl=en')
                break

            case "itunes":
                console.log('click on object 5')
                window.open('https://music.apple.com/us/artist/act-natural/1473074193')
                break

            case "cap":
                console.log('click on object 6')
                window.open('https://act-natural-music.myshopify.com/')
            break
        }
    }
}
window.addEventListener('pointermove', clickFunc)
window.addEventListener('touchmove', clickFunc)
window.addEventListener('pointerdown', clickFunc)
window.addEventListener('mousedown', clickFunc)
window.addEventListener('touchstart', clickFunc)
window.addEventListener('pointerup', clickFunc)
window.addEventListener('touchend', clickFunc)
window.addEventListener('mouseup', clickFunc)
window.addEventListener('touchcancel', clickFunc)
const tick = () =>
{
    /*x
if(tiktok)
{
    if(tiktok.scale.x > .15)
    {
        tiktokGrow = true
    }
    if(tiktok.scale.x < .1)
    {
        tiktokGrow = false
    }
    if(tiktokGrow == true)
    {
        tiktok.scale.x -= 0.0005
        tiktok.scale.y -= 0.0005
        tiktok.scale.z -= 0.0005
    }
    if(tiktokGrow == false)
    {
        tiktok.scale.x += 0.0005
        tiktok.scale.y += 0.0005
        tiktok.scale.z += 0.0005
    }



}
if(spotify)
{
    if(spotify.scale.x > .15)
    {
        spotifyGrow = true
    }
    if(spotify.scale.x < .1)
    {
        spotifyGrow = false
    }
    if(spotifyGrow == true)
    {
        spotify.scale.x -= 0.0005
        spotify.scale.y -= 0.0005
        spotify.scale.z -= 0.0005
    }
    if(spotifyGrow == false)
    {
        spotify.scale.x += 0.0005
        spotify.scale.y += 0.0005
        spotify.scale.z += 0.0005
    }


}
*/
if (typeof scene != "undefined")
{
    if(centerLogo == true)
    {
raycaster.setFromCamera(mouse,camera)
const test = [spotify, tiktok, youtube, itunes, cap, insta]
const intersects = raycaster.intersectObjects(test, true)
if(intersects.length)
{
    if(!currentIntersect)
    {
        
        console.log('mouse enter')
        canvas.style.cursor = "pointer"
    }

    currentIntersect = intersects[0]
}
else
{
    if(currentIntersect)
    {
        console.log('mouse leave')
        canvas.style.cursor = "default"
    }
    
    currentIntersect = null
}  



}
}

    if(particles)
    {
        if(particles.position.x > 1)
        {
            direction = true
        }
        if(particles.position.x < -1)
        {
            direction = false
        }

        if(direction == false)
        {
            particles.position.x += 0.005
        }
        if(direction == true)
        {
            particles.position.x -= 0.005
        }
        //console.log(direction)
        //console.log(particles.position.x)
    }

    if(logo)
    {
        logo.rotation.z -= 0.0225 
      
    }

    if(changeScene)
    {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            if(camera.position.z <220)
            {
           camera.position.z += 1
           camera.position.y += 0.0001
           if(camera.position.z > 212)
           {
               
               camera.rotation.x -= 0.01
               camera.rotation.y += 0.08
               camera.position.y += 0.15
               camera.position.x += 0.9
               
           }
            }
           
            
        }
           
      else if(camera.position.z <218)
        {
       camera.position.z += 1
       camera.position.y += 0.0001
       if(camera.position.z > 212)
       {
           camera.rotation.x -= 0.015
           camera.rotation.y += 0.08
           camera.position.y += 0.17
           camera.position.x += 0.6
       }
        }
       
     
    }
    if(logo)
    {
    if(progressBar.value == 100)
    {
     if  (logo.position.y > .2)
     {
         logo.position.y -= 0.005
     }
     
    if(logo.scale.x <  .3)
    {
        logo.scale.x += 0.0009
        logo.scale.y += 0.0009
        logo.scale.z += 0.0009
    }

        
    }
    
}
    

   
    // Render
    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()