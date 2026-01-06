"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ModelCanvasProps {
    services: string[];
    colors: {
        primary: string;
        secondary: string;
        accent1: string;
        accent2: string;
    };
    showCentralCore?: boolean;
}

function ServiceNode({
    position,
    name,
    index,
    colors,
}: {
    position: [number, number, number];
    name: string;
    index: number;
    colors: ModelCanvasProps["colors"];
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const originalY = useRef(position[1]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y =
                originalY.current + Math.sin(state.clock.elapsedTime * 0.8 + index * 0.5) * 0.15;
        }
    });

    const nodeColor = index % 2 === 0 ? colors.accent1 : colors.accent2;

    return (
        <group position={position}>
            {/* Node sphere with glow */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.12, 24, 24]} />
                <meshStandardMaterial
                    color={nodeColor}
                    emissive={nodeColor}
                    emissiveIntensity={0.6}
                />
            </mesh>
            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial
                    color={nodeColor}
                    emissive={nodeColor}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.3}
                />
            </mesh>
            {/* HTML label */}
            <Html
                position={[0, 0.4, 0]}
                center
                style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                {name}
            </Html>
        </group>
    );
}

function ConnectionLine({
    start,
    end,
    index,
    colors,
}: {
    start: THREE.Vector3;
    end: THREE.Vector3;
    index: number;
    colors: ModelCanvasProps["colors"];
}) {
    const lineRef = useRef<THREE.Line>(null);

    const points = useMemo(() => {
        const curve = new THREE.QuadraticBezierCurve3(
            start,
            new THREE.Vector3(
                (start.x + end.x) / 2,
                (start.y + end.y) / 2 + 0.3,
                (start.z + end.z) / 2
            ),
            end
        );
        return curve.getPoints(20);
    }, [start, end]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return geo;
    }, [points]);

    useFrame((state) => {
        if (lineRef.current) {
            const material = lineRef.current.material as THREE.LineBasicMaterial;
            material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.2;
        }
    });

    const lineColor = index % 2 === 0 ? colors.primary : colors.secondary;

    return (
        <line ref={lineRef} geometry={geometry}>
            <lineBasicMaterial color={lineColor} transparent opacity={0.6} />
        </line>
    );
}

function StarTopology({
    services,
    colors,
}: {
    services: string[];
    colors: ModelCanvasProps["colors"];
}) {
    const groupRef = useRef<THREE.Group>(null);

    const nodePositions = useMemo(() => {
        const positions: [number, number, number][] = [];
        const radius = 2.2;
        const angleStep = (2 * Math.PI) / services.length;

        services.forEach((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.65;
            const z = Math.sin(angle * 2) * 0.4;
            positions.push([x, y, z]);
        });

        return positions;
    }, [services]);

    const center = useMemo(() => new THREE.Vector3(0, 0, 0), []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Service nodes */}
            {services.map((service, index) => (
                <ServiceNode
                    key={service}
                    position={nodePositions[index]}
                    name={service}
                    index={index}
                    colors={colors}
                />
            ))}

            {/* Connection lines from center to nodes */}
            {nodePositions.map((pos, index) => (
                <ConnectionLine
                    key={`line-${index}`}
                    start={center}
                    end={new THREE.Vector3(...pos)}
                    index={index}
                    colors={colors}
                />
            ))}
        </group>
    );
}

function Scene({
    services,
    colors,
}: {
    services: string[];
    colors: ModelCanvasProps["colors"];
}) {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color={colors.primary} />
            <pointLight position={[0, 5, 5]} intensity={0.6} color={colors.accent1} />

            {/* Star topology with nodes only (no central core) */}
            <StarTopology services={services} colors={colors} />

            {/* Interactive controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
            />
        </>
    );
}

export default function ModelCanvas({ services, colors, showCentralCore = true }: ModelCanvasProps) {
    return (
        <div className="absolute inset-0">
            <Suspense
                fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                }
            >
                <Canvas
                    camera={{ position: [0, 0, 5.5], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: "transparent" }}
                >
                    <Scene services={services} colors={colors} />
                </Canvas>
            </Suspense>
        </div>
    );
}
