"use client"
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'
export default function Gradient() {
  return (
    <ShaderGradientCanvas
    importedFiber={{ ...fiber, ...drei, ...reactSpring }}
    style={{
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
    }}
>
    <ShaderGradient control='query' urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=3&cAzimuthAngle=180&cDistance=2.6&cPolarAngle=90&cameraZoom=1&color1=%23597dff&color2=%2351db78&color3=%234674e1&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=0.8&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=0&uDensity=0.6&uFrequency=5.5&uSpeed=0.4&uStrength=6.9&uTime=0&wireframe=false' />
</ShaderGradientCanvas>
  )}