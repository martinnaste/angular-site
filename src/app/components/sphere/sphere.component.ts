import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.css']
})
export class SphereComponent implements AfterViewInit {

  @ViewChild('sphereRef') elementRef!: ElementRef;
  private sphere!: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  constructor() { }

  ngAfterViewInit(): void {
    this.sphere = this.elementRef.nativeElement;
    this.init();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer();
    this.sphere.appendChild(this.renderer.domElement); // adding this to the page instead of to the document
    //document.body.appendChild(renderer.domElement);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';

    // scene
    this.scene = new THREE.Scene();

    // camera
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(20, 20, 20);

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    var light = new THREE.HemisphereLight(0xeeeeee, 0x888888, 1);
    light.position.set(0, 20, 0);
    this.scene.add(light);

    // material
    var material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      flatShading: true,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    });


    // dot example
    var dotGeometry = new THREE.BufferGeometry();
    var dotVertices = new Float32Array([
      4.0, 4.0,  0.0
    ]);
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotVertices, 3));
    
    var dotMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true
    });
    var dot = new THREE.Points(dotGeometry, dotMaterial);
    this.scene.add(dot);
    
    var sphereGeo = new THREE.SphereGeometry( 4 );
    // const sphereMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const sphere = new THREE.Mesh( sphereGeo, material );
    sphere.translateZ(4.0);
    /* sphere.position.set(0, 0, 4); */
    this.scene.add( sphere );
    // var center = getCenterPoint(sphere)
    // console.log('center', center);
    this.animate();
  }
  animate() {
    //had to make a reference to this component and then call the animate function in itself
    //it works but im not sure if this is correct
    const sphere: SphereComponent = this;
    (function animate() {
      requestAnimationFrame(animate);
  
      var width = sphere.renderer.domElement.clientWidth;
      var height = sphere.renderer.domElement.clientHeight;
      
      sphere.renderer.setPixelRatio(1);
    
      sphere.renderer.setSize(sphere.renderer.domElement.clientWidth, sphere.renderer.domElement.clientHeight, false);
    
      sphere.camera.aspect = width / height;
      sphere.camera.updateProjectionMatrix();
      sphere.renderer.render(sphere.scene, sphere.camera);
    })();
  }

}
