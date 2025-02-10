// three-animation.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Scene3D {
  constructor() {
    // Creamos el contenedor y lo agregamos al header
    this.container = document.createElement('div');
    this.container.id = 'three-container';
    document.querySelector('header').appendChild(this.container);
    
    // Escena
    this.scene = new THREE.Scene();
    
    // Cámara
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Posición fija de la cámara
    this.camera.position.set(0, 2, 10);
    this.camera.lookAt(0, 0, 0);
    
    // Renderizador
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    
    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
    
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.5);
    bottomLight.position.set(0, -5, 0);
    this.scene.add(bottomLight);
    
    // Cargamos el modelo dentro de un grupo para centrarlo
    this.loadModel();
    
    // Eventos de redimensionado y scroll
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.addScrollAnimation();
    
    // Inicio de la animación
    this.animate();
  }
  
  loadModel() {
    const loader = new GLTFLoader();
    
    loader.load(
      './files/Desk.glb',
      (gltf) => {
        // Creamos un grupo contenedor para el modelo
        this.deskGroup = new THREE.Group();
        
        // Obtenemos el modelo cargado y ajustamos su escala
        const model = gltf.scene;
        model.scale.set(2.5, 2.5, 2.5);
        
        // Calculamos el bounding box para centrar el modelo en el grupo
        const bbox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        
        // Desplazamos el modelo para que su centro quede en (0,0,0) del grupo
        model.position.sub(center);
        
        // Agregamos el modelo al grupo y el grupo a la escena
        this.deskGroup.add(model);
        this.scene.add(this.deskGroup);
        
        // Establecemos la rotación inicial para ver la parte frontal (opcional)
        this.deskGroup.rotation.y = Math.PI;
      },
      undefined,
      (error) => {
        console.error('Error cargando el modelo:', error);
      }
    );
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  addScrollAnimation() {
    window.addEventListener('scroll', () => {
      if (!this.deskGroup) return;
      
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollPosition / maxScroll;
      
      // Rotación suave basada en el scroll, iniciando en PI para ver la parte frontal
      this.deskGroup.rotation.y = Math.PI + (scrollProgress * Math.PI * 2);
    });
  }
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

export default Scene3D;
