
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


const Chamaleon = () => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models-3d/Chameleon.glb')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        actions["Idle"].fadeIn(0.5).play()
        return () => actions["Idle"].fadeOut(0.5).stop()
    }, [actions]
    )
    return (

        <group ref={group} dispose={null}>
            <group name="Scene">
                <group name="Armature" position={[0, 1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.5}>
                    <skinnedMesh
                        name="HeadChamaleon"
                        geometry={nodes.HeadChamaleon.geometry}
                        material={materials['Camaleon.001']}
                        skeleton={nodes.HeadChamaleon.skeleton}
                    />
                    <primitive object={nodes.Bone} />
                </group>
            </group>
        </group>
    )
}

export default Chamaleon