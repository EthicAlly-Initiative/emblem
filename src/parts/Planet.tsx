import clsx from "clsx";
import { useRef, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import useEmblemContext from "../useEmblemContext";

// @ts-expect-error - Vite asset handling
import baseTexture from "./planetMap.svg";

function CameraInitialSettings() {
	const { isSpinning, isReady, setIsReady } = useEmblemContext();
	const controls = useRef<OrbitControlsImpl | null>(null);

	useEffect(() => {
		if (!controls.current) return;
		// Sets the initial rotation of the camera to match the OG map
		controls.current.setPolarAngle(1.2);
		controls.current.setAzimuthalAngle(1.12);
		setIsReady(true);
	}, [controls.current]);

	return (
		<OrbitControls
			ref={controls}
			enablePan={false}
			enableZoom={false}
			autoRotate={(isReady && isSpinning) || false}
			autoRotateSpeed={isReady ? -0.75 : 0}
			enableDamping={isReady}
		/>
	);
}

function WorldRenderWorld() {
	const texture = useTexture(baseTexture);

	return (
		<mesh>
			<sphereGeometry args={[6.1, 32, 32]} />
			<meshBasicMaterial
				color="#fff"
				map={texture}
				transparent={true}
				alphaTest={0.8}
			/>
		</mesh>
	);
}

export default function Planet() {
	const { animationStage, isReady } = useEmblemContext();

	return (
		<Canvas
			className={clsx(
				"eai-emblem__world",
				isReady && "eai-emblem__world--ready",
				animationStage && "eai-emblem__world--animated",
				animationStage == "loading" && "eai-emblem__world--loading",
				animationStage == "final" && "eai-emblem__world--final"
			)}
			camera={{
				position: [0, 0, 84],
				fov: 10,
			}}
			gl={{ preserveDrawingBuffer: true }}
		>
			<CameraInitialSettings />
			<WorldRenderWorld />
		</Canvas>
	);
}
