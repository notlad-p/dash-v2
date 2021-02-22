import * as THREE from 'three';
import p5 from 'p5';
import BIRDS from 'vanta/dist/vanta.birds.min';
import CELLS from 'vanta/dist/vanta.cells.min.js';
import CLOUDS from 'vanta/dist/vanta.clouds.min.js';
import CLOUDS2 from 'vanta/dist/vanta.clouds2.min.js';
// import DOTS from 'vanta/dist/vanta.dots.min.js';
import FOG from 'vanta/dist/vanta.fog.min.js';
import GLOBE from 'vanta/dist/vanta.globe.min.js';
// import HALO from 'vanta/dist/vanta.halo.min.js';
import NET from 'vanta/dist/vanta.net.min.js';
import RINGS from 'vanta/dist/vanta.rings.min.js';
// import TOPOLOGY from 'vanta/dist/vanta.topology.min.js';
// import TRUNK from 'vanta/dist/vanta.trunk.min';
import WAVES from 'vanta/dist/vanta.waves.min.js';
import birdsImg from '../assets/backgrounds/birds.jpg';
import cellsImg from '../assets/backgrounds/cells.jpg';
import cloudsImg from '../assets/backgrounds/clouds.jpg';
import clouds2Img from '../assets/backgrounds/clouds2.jpg';
import noiseImg from '../assets/backgrounds/noise.png';
// import dotsImg from '../assets/backgrounds/dots.jpg';
import fogImg from '../assets/backgrounds/fog.jpg';
import globeImg from '../assets/backgrounds/globe.jpg';
// import haloImg from '../assets/backgrounds/halo.jpg';
import netImg from '../assets/backgrounds/net.jpg';
import ringsImg from '../assets/backgrounds/rings.jpg';
// import topologyImg from '../assets/backgrounds/topology.jpg';
// import trunkImg from '../assets/backgrounds/trunk.jpg';
import wavesImg from '../assets/backgrounds/waves.jpg';
import Lockr from 'lockr';

// 3 objects - colors, sliders, checkboxes
      // each with type, & input array - name & value
   // options: ['backgroundColor', 'color1', 'color2', 'colorMode', 'quantity', 'birdSize', 'wingSpan', 'speedLimit', 'separation', 'alignment', 'cohesion'],

const backgroundStandard = {
  el: '.App',
  p5: p5,
  THREE: THREE,
}

const backgroundData = [
  {
    name: 'Birds',
    backgroundEffect: () => {
      return BIRDS({
        ...backgroundStandard,
        backgroundColor: Lockr.get('0-backgroundColor', '#071622'),
        color1: Lockr.get('0-color1', '#ff0000'),
        color2: Lockr.get('0-color2', '#00d1ff'),
        colorMode: Lockr.get('0-colorMode', 'varianceGradient'),
        quantity: Lockr.get('0-quantity', 5),
        birdSize: Lockr.get('0-birdSize', 1),
        wingSpan: Lockr.get('0-wingSpan', 30),
        speedLimit: Lockr.get('0-speedLimit', 5),
        separation: Lockr.get('0-speration', 20),
        alignment: Lockr.get('0-alignment', 20),
        cohesion: Lockr.get('0-cohesion', 20),
        mouseControls: Lockr.get('0-mouseControls', true),
      });
    },
    img: birdsImg,
    options: [
      {
        type: 'color',
        name: 'backgroundColor', 
        value: Lockr.get('0-backgroundColor', '#071622'),
        restart: false,
      },
      {
        type: 'color',
        name: 'color1', 
        value:  Lockr.get('0-color1', '#ff0000'),
        restart: true,
      },
      {
        type: 'color',
        name: 'color2', 
        value: Lockr.get('0-color2', '#00d1ff'),
        restart: true,
      },
      {
        type: 'select',
        name: 'colorMode', 
        value: Lockr.get('0-colorMode', 'varianceGradient'),
        restart: true,
      },
      {
        type: 'range',
        name: 'quantity', 
        min: 1,
        max: 5,
        step: 1,
        value: Lockr.get('0-quantity', 5),
        restart: true,
      },
      {
        type: 'range',
        name: 'birdSize', 
        min: 0.5,
        max: 4,
        step: 0.1,
        value: Lockr.get('0-birdSize', 1),
        restart: true,
      },
      {
        type: 'range',
        min: 10,
        max: 40,
        step: 1,
        name: 'wingSpan', 
        value: Lockr.get('0-wingSpan', 30),
        restart: true,
      },
      {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
        name: 'speedLimit', 
        value: Lockr.get('0-speedLimit', 5),
        restart: true,
      },
      {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
        name: 'separation',
        value: Lockr.get('0-speration', 20),
        restart: true,
      },
      {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
        name: 'alignment', 
        value: Lockr.get('0-alignment', 20),
        restart: true,
      },
      {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
        name: 'cohesion', 
        value: Lockr.get('0-cohesion', 20),
        restart: true,
      },
      {
        type: 'checkbox',
        name: 'mouseControls', 
        value: Lockr.get('0-mouseControls', true),
        restart: false,
      },    
    ],
  },
  {
    name: 'Cells',
    backgroundEffect: () => {
      return CELLS({
        ...backgroundStandard,
        color1: Lockr.get('1-color1', '#0b8a93'),
        color2: Lockr.get('1-color2', '#e2dd36'),
        size: parseInt(Lockr.get('1-size', 1.5), 10),
        speed: parseInt(Lockr.get('1-speed', 1), 10),
      });
    },
    img: cellsImg,
    options: [
      {
        type: 'color',
        name: 'color1', 
        value:  Lockr.get('1-color1', '#0b8a93'),
        restart: false,
      },
      {
        type: 'color',
        name: 'color2', 
        value: Lockr.get('1-color2', '#e2dd36'),
        restart: false,
      },
      {
        type: 'range',
        min: 0.2,
        max: 5,
        step: 0.10,
        name: 'size',
        value: Lockr.get('1-size', 1.5),
        restart: false,
      },
      {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
        name: 'speed',
        value: Lockr.get('1-speed', 1),
        restart: false,
      },
    ],
  },
  {
    name: 'Clouds',
    backgroundEffect: () => {
      return CLOUDS({
        ...backgroundStandard,
      });
    },
    img: cloudsImg,
    options: [
      {
        type: 'color',
        name: 'backgroundColor',
        value:  Lockr.get('2-backgroundColor', '#ffffff'),
        restart: false,
      },
      {
        type: 'color',
        name: 'skyColor',
        value:  Lockr.get('2-skyColor', '#68b8d7'),
        restart: false,
      },
      {
        type: 'color',
        name: 'cloudColor',
        value:  Lockr.get('2-cloudColor', '#adc1de'),
        restart: false,
      },
      {
        type: 'color',
        name: 'cloudShadowColor',
        value:  Lockr.get('2-cloudShadowColor', '#183550'),
        restart: false,
      },
      {
        type: 'color',
        name: 'sunColor',
        value:  Lockr.get('2-sunColor', '#ff9919'),
        restart: false,
      },
      {
        type: 'color',
        name: 'sunGlareColor', 
        value:  Lockr.get('2-sunGlareColor', '#ff6633'),
        restart: false,
      },
      {
        type: 'color',
        name: 'sunlightColor',
        value:  Lockr.get('2-sunlightColor', '#ff9933'),
        restart: false,
      },
      {
        type: 'range',
        min: 0.00,
        max: 3.00,
        step: 0.1,
        name: 'speed',
        value:  Lockr.get('2-speed', 1),
        restart: false,
      },
      {
        type: 'checkbox',
        name: 'mouseControls', 
        value: Lockr.get('2-mouseControls', true),
        restart: false,
      }, 
    ],
  },
  {
    name: 'Clouds 2',
    backgroundEffect: () => {
      return  CLOUDS2({
        ...backgroundStandard,
        texturePath: noiseImg,
        skyColor: Lockr.get('3-skyColor', '#5ca6ca'),
        cloudColor: Lockr.get('3-cloudColor', '#334d80'),
        lightColor: Lockr.get('3-lightColor', '#ffffff'),
        speed: parseInt(Lockr.get('3-speed', 1), 10),
      });
    },
    img: clouds2Img,
    options: [
      {
        type: 'color',
        name: 'skyColor',
        value: Lockr.get('3-skyColor', '#000000'),
        restart: false,
      },
      {
        type: 'color',
        name: 'cloudColor',
        value: Lockr.get('3-cloudColor', '#5ca6ca'),
        restart: false,
      },
      {
        type: 'color',
        name: 'lightColor',
        value: Lockr.get('3-lightColor', '#ffffff'),
        restart: false,
      },
      {
        type: 'range',
        name: 'speed',
        min: 0.00,
        max: 5.00,
        step: 0.1,
        value: Lockr.get('3-speed', 1),
        restart: false,
      },
    ],
  },
  // {
  //   backgroundEffect: () => {
  //     return DOTS({
  //       ...backgroundStandard,
  //     });
  //   },
  //   img: dotsImg,
  // },
  {
    name: 'Fog',
    backgroundEffect: () => {
      return FOG({
        ...backgroundStandard,
        highlightColor: Lockr.get('4-highlightColor', '#ffc300'),
        midtoneColor: Lockr.get('4-midtoneColor', '#ff1f00'),
        lowlightColor: Lockr.get('4-lowlightColor', '#2d00ff'),
        baseColor: Lockr.get('4-baseColor', '#ffebeb'),
        blurFactor: Lockr.get('4-blurFactor', 0.6),
        zoom: Lockr.get('4-zoom', 1),
        speed: Lockr.get('4-speed', 1),
      });
    },
    img: fogImg,
    options: [
      {
        type: 'color',
        name: 'highlightColor',
        value: Lockr.get('4-highlightColor', '#ffc300'),
        restart: false,
      },
      {
        type: 'color',
        name: 'midtoneColor',
        value: Lockr.get('4-midtoneColor', '#ff1f00'),
        restart: false,
      },
      {
        type: 'color',
        name: 'lowlightColor',
        value: Lockr.get('4-lowlightColor', '#2d00ff'),
        restart: false,
      },
      {
        type: 'color',
        name: 'baseColor',
        value: Lockr.get('4-baseColor', '#ffebeb'),
        restart: false,
      },
      {
        type: 'range',
        min: 0.10,
        max: 0.90,
        step: 0.01,
        name: 'blurFactor',
        value: Lockr.get('4-blurFactor', 0.6),
        restart: false,
      },
      {
        type: 'range',
        min: 0.10,
        max: 3.00,
        step: 0.1,
        name: 'zoom',
        value: Lockr.get('4-zoom', 1),
        restart: false,
      },
      {
        type: 'range',
        min: 0.00,
        max: 5.00,
        step: 0.1,
        name: 'speed',
        value: Lockr.get('4-speed', 1),
        restart: false,
      },
    ],
  },
  {
    name: 'Globe',
    backgroundEffect: () => {
      return GLOBE({
        ...backgroundStandard,
        backgroundColor: Lockr.get('5-backgroundColor', '#121212'),
        color: Lockr.get('5-color', '#8C00FF'),
        color2: Lockr.get('5-color2', '#00FF33'),
      });
    },
    img: globeImg,
    options: [
      {
        type: 'color',
        name: 'backgroundColor',
        value: Lockr.get('5-backgroundColor', '#ffebeb'),
        restart: false,
      },
      {
        type: 'color',
        name: 'color',
        value: Lockr.get('5-color', '#8C00FF'),
        restart: true,
      },
      {
        type: 'color',
        name: 'color2',
        value: Lockr.get('5-color2', '#00FF33'),
        restart: true,
      },
      {
        type: 'range',
        min: 0.50,
        max: 2.00,
        step: 0.1,
        name: 'size',
        value: Lockr.get('5-size', 1),
        restart: true,
      },
      {
        type: 'checkbox',
        name: 'mouseControls', 
        value: Lockr.get('5-mouseControls', true),
        restart: false,
      }, 
    ],
  },
  // {
  //   backgroundEffect: () => {
  //     if(window.THREE) {
  //       return HALO({
  //         ...backgroundStandard,
  //       });
  //     }
  //   },
  //   img: haloImg,
  // },
  {
    name: 'Net',
    backgroundEffect: () => {
      return NET({
        ...backgroundStandard,
        backgroundColor: Lockr.get('6-backgroundColor', '#23153c'),
        color: Lockr.get('6-color', '#ff3f81'),
        points: Lockr.get('6-points', 10),
        maxDistance: Lockr.get('6-maxDistance', 20),
        spacing: Lockr.get('6-spacing', 15),
        showDots: Lockr.get('6-showDots', true),
        mouseControls: Lockr.get('6-mouseControls', true),
      });
    },
    img: netImg,
    options: [
      {
        type: 'color',
        name: 'backgroundColor',
        value: Lockr.get('6-backgroundColor', '#23153c'),
        restart: false,
      },
      {
        type: 'color',
        name: 'color',
        value: Lockr.get('6-color', '#ff3f81'),
        restart: true,
      },
      {
        type: 'range',
        min: 1,
        max: 20,
        step: 1,
        name: 'points',
        value: Lockr.get('6-points', 10),
        restart: true,
      },
      {
        type: 'range',
        min: 10,
        max: 40,
        step: 1,
        name: 'maxDistance',
        value: Lockr.get('6-maxDistance', 20),
        restart: false,
      },
      {
        type: 'range',
        min: 10,
        max: 20,
        step: 1,
        name: 'spacing',
        value: Lockr.get('6-spacing', 15),
        restart: true,
      },
      {
        type: 'checkbox',
        name: 'showDots', 
        value: Lockr.get('6-showDots', true),
        restart: false,
      }, 
      {
        type: 'checkbox',
        name: 'mouseControls', 
        value: Lockr.get('6-mouseControls', true),
        restart: false,
      },
    ],
  },
  {
    name: 'Rings',
    backgroundEffect: () => {
      return RINGS({
        ...backgroundStandard,
        backgroundColor: Lockr.get('7-backgroundColor', '#202428'),
        color: Lockr.get('7-color', '#88ff00'),
        mouseControls: Lockr.get('7-mouseControls', true),
      });
    },
    img: ringsImg,
    options: [
      {
        type: 'color',
        name: 'backgroundColor',
        value: Lockr.get('7-backgroundColor', '#202428'),
        restart: false,
      },
      {
        type: 'color',
        name: 'color',
        value: Lockr.get('7-color', '#88ff00'),
        restart: true,
      },
      {
        type: 'checkbox',
        name: 'mouseControls', 
        value: Lockr.get('7-mouseControls', true),
        restart: false,
      },
    ],
  },
  // {
  //   backgroundEffect: () => {
  //     return TOPOLOGY({
  //       ...backgroundStandard,
  //     });
  //   },
  //   img: topologyImg,
  //   options: [
  //     {
  //       type: 'color',
  //       name: 'backgroundColor',
  //       value: Lockr.get('8-backgroundColor', '#222222'),
  //       restart: false,
  //     },
  //     'backgroundColor', 'color'
  //   ],
  // },
  // {
  //   backgroundEffect: () => {
  //     return TRUNK({
  //       ...backgroundStandard,
  //     });
  //   },
  //   img: trunkImg,
  //   options: ['backgroundColor', 'color', 'spacing', 'chaos'],
  // },
  {
    name: 'Waves',
    backgroundEffect: () => {
      return WAVES({
        ...backgroundStandard,
        color: Lockr.get('8-color', '#202428'),
        shininess: Lockr.get('8-shininess', 30),
        waveHeight: Lockr.get('8-waveHeight', 15),
        waveSpeed: Lockr.get('8-waveSpeed', 1),
        zoom: Lockr.get('8-zoom', 1),
        mouseControls: Lockr.get('8-mouseControls', true),
      });
    },
    img: wavesImg,
    options: [
      {
        type: 'color',
        name: 'color',
        value: Lockr.get('8-color', '#202428'),
        restart: false,
      },
      {
        type: 'range',
        min: 0,
        max: 150,
        step: 1,
        name: 'shininess',
        value: Lockr.get('8-shininess', 30),
        restart: false,
      },
      {
        type: 'range',
        min: 0,
        max: 40,
        step: 1,
        name: 'waveHeight',
        value: Lockr.get('8-waveHeight', 15),
        restart: false,
      },
      {
        type: 'range',
        min: 0,
        max: 2,
        step: 0.50,
        name: 'waveSpeed',
        value: Lockr.get('8-waveSpeed', 1),
        restart: false,
      },
      {
        type: 'range',
        min: 0.70,
        max: 1.80,
        step: 0.10,
        name: 'zoom',
        value: Lockr.get('8-zoom', 1),
        restart: false,
      },
      {
        type: 'checkbox',
        name: 'mouseControls', 
        value: Lockr.get('8-mouseControls', true),
        restart: false,
      },
    ],
  },
];

export default backgroundData;