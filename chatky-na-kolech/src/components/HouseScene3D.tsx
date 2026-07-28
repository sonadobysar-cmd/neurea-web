"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { Suspense, useMemo } from "react";
import type { FacadeId, LoftId, RoofId } from "@/data/configurator";
import * as THREE from "three";

export type House3DProps = {
  length: number;
  width: number;
  roof: RoofId;
  facade: FacadeId;
  loft: LoftId;
  hasBathroom: boolean;
  hasKitchen: boolean;
  activeHotspot?: string | null;
  onHotspot?: (id: string) => void;
};

const FACADE: Record<FacadeId, { wood: string; dark: string; metal: string }> = {
  smrk: { wood: "#C9A87A", dark: "#A88858", metal: "#3A3E42" },
  thermo: { wood: "#5A3E2C", dark: "#3E2A1E", metal: "#2A2E32" },
  modrin: { wood: "#B89562", dark: "#967848", metal: "#3A3E42" },
  plech: { wood: "#3A3E42", dark: "#2A2E32", metal: "#3A3E42" },
  half: { wood: "#C9A87A", dark: "#A88858", metal: "#2C3036" },
};

function Hotspot({
  position,
  id,
  label,
  active,
  onClick,
}: {
  position: [number, number, number];
  id: string;
  label: string;
  active?: boolean;
  onClick?: (id: string) => void;
}) {
  return (
    <Html position={position} center zIndexRange={[40, 0]}>
      <button
        type="button"
        className={`pin3d${active ? " is-active" : ""}`}
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(id);
        }}
      >
        <span />
      </button>
    </Html>
  );
}

function WindowPane({
  position,
  size,
  glow,
}: {
  position: [number, number, number];
  size: [number, number];
  glow: string;
}) {
  const [w, h] = size;
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[w + 0.06, h + 0.06, 0.06]} />
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[w, h, 0.02]} />
        <meshPhysicalMaterial
          color={glow}
          roughness={0.15}
          metalness={0.05}
          transmission={0.35}
          thickness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[0.02, h * 0.92, 0.01]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
    </group>
  );
}

function FlatRoof({ length, depth, wallH }: { length: number; depth: number; wallH: number }) {
  return (
    <group position={[0, wallH, 0]}>
      <mesh position={[0, 0.08, 0]} castShadow>
        <boxGeometry args={[length + 0.2, 0.14, depth + 0.2]} />
        <meshStandardMaterial color="#2C3036" roughness={0.55} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[length + 0.22, 0.04, depth + 0.22]} />
        <meshStandardMaterial color="#1A1E22" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}

function AFrameRoof({ length, depth, wallH }: { length: number; depth: number; wallH: number }) {
  const peak = 0.85;
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-depth / 2 - 0.12, 0);
    s.lineTo(0, peak);
    s.lineTo(depth / 2 + 0.12, 0);
    s.closePath();
    return s;
  }, [depth]);

  return (
    <group position={[0, wallH, 0]}>
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-(length + 0.2) / 2, 0, 0]}
        castShadow
      >
        <extrudeGeometry args={[shape, { depth: length + 0.2, bevelEnabled: false }]} />
        <meshStandardMaterial
          color="#2C3036"
          roughness={0.5}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, peak + 0.02, 0]}>
        <boxGeometry args={[length + 0.22, 0.05, 0.08]} />
        <meshStandardMaterial color="#15181C" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}

function BarrelRoof({ length, depth, wallH }: { length: number; depth: number; wallH: number }) {
  // Approximate barrel with scaled half-cylinder
  const radius = depth / 2 + 0.1;
  return (
    <group position={[0, wallH, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry
          args={[radius, radius, length + 0.18, 32, 1, false, 0, Math.PI]}
        />
        <meshStandardMaterial
          color="#2C3036"
          roughness={0.5}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function RoofMesh({
  type,
  length,
  depth,
  wallH,
}: {
  type: RoofId;
  length: number;
  depth: number;
  wallH: number;
}) {
  if (type === "plocha") return <FlatRoof length={length} depth={depth} wallH={wallH} />;
  if (type === "kulata") return <BarrelRoof length={length} depth={depth} wallH={wallH} />;
  return <AFrameRoof length={length} depth={depth} wallH={wallH} />;
}

function TinyHouse({
  length,
  width,
  roof,
  facade,
  loft,
  hasBathroom,
  hasKitchen,
  activeHotspot,
  onHotspot,
}: House3DProps) {
  const L = length * 0.55;
  const D = width * 0.55;
  const hasLoft = loft !== "none";
  const H = hasLoft ? 2.35 : 1.95;
  const colors = FACADE[facade];
  const wallColor = facade === "plech" ? colors.metal : colors.wood;
  const twin = loft === "two";

  const winY = H * 0.55;
  const winZ = D / 2 + 0.02;
  const doorW = 0.55;
  const doorH = H * 0.72;
  const doorX = -L * 0.32;

  const cladXs = useMemo(() => {
    const count = facade === "plech" ? 18 : 12;
    return Array.from({ length: count - 1 }, (_, i) => -L / 2 + ((i + 1) / count) * L);
  }, [L, facade]);

  return (
    <group position={[0, 0.28, 0]}>
      <mesh position={[0, -0.08, 0]} castShadow>
        <boxGeometry args={[L + 0.35, 0.1, D + 0.15]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[-L / 2 - 0.35, -0.06, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.18]} />
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.5} />
      </mesh>

      {[
        [-L * 0.28, -D * 0.42],
        [-L * 0.28, D * 0.42],
        [L * 0.28, -D * 0.42],
        [L * 0.28, D * 0.42],
      ].map(([x, z], i) => (
        <group key={i} position={[x, -0.32, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.16, 24]} />
            <meshStandardMaterial color="#111" roughness={0.85} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.12, 0.12, 0.18, 16]} />
            <meshStandardMaterial color="#555" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {facade === "half" ? (
        <group>
          <RoundedBox
            args={[L / 2, H, D]}
            radius={0.02}
            position={[-L / 4, H / 2, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={colors.wood}
              roughness={0.72}
              metalness={0.05}
            />
          </RoundedBox>
          <RoundedBox
            args={[L / 2, H, D]}
            radius={0.02}
            position={[L / 4, H / 2, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={colors.metal}
              roughness={0.4}
              metalness={0.6}
            />
          </RoundedBox>
        </group>
      ) : (
        <RoundedBox
          args={[L, H, D]}
          radius={0.025}
          position={[0, H / 2, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={wallColor}
            roughness={facade === "plech" ? 0.45 : 0.72}
            metalness={facade === "plech" ? 0.55 : 0.05}
          />
        </RoundedBox>
      )}

      {cladXs.map((x) => (
        <mesh key={x} position={[x, H / 2, D / 2 + 0.002]}>
          <boxGeometry args={[0.012, H * 0.98, 0.004]} />
          <meshStandardMaterial color="#1a120c" transparent opacity={0.16} />
        </mesh>
      ))}

      {facade !== "plech" && (
        <mesh position={[doorX + doorW * 0.15, H * 0.42, D / 2 + 0.015]} castShadow>
          <boxGeometry args={[doorW + 0.9, H * 0.82, 0.03]} />
          <meshStandardMaterial color={colors.dark} roughness={0.65} />
        </mesh>
      )}

      <mesh position={[doorX, doorH / 2 + 0.02, D / 2 + 0.04]} castShadow>
        <boxGeometry args={[doorW, doorH, 0.05]} />
        <meshStandardMaterial color="#111" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[doorX, doorH * 0.62, D / 2 + 0.07]}>
        <boxGeometry args={[doorW * 0.72, doorH * 0.38, 0.02]} />
        <meshPhysicalMaterial
          color="#F5E6C4"
          roughness={0.2}
          transmission={0.4}
          thickness={0.15}
          transparent
          opacity={0.85}
        />
      </mesh>

      <WindowPane
        position={[L * 0.12, winY, winZ]}
        size={[0.7, 0.75]}
        glow={hasKitchen ? "#FFE9C4" : "#EFE4CC"}
      />
      <WindowPane
        position={[L * 0.35, winY, winZ]}
        size={[0.55, 0.75]}
        glow={hasBathroom ? "#D6E8F4" : "#E8DFD0"}
      />

      <group rotation={[0, Math.PI / 2, 0]}>
        <WindowPane position={[0, winY, L / 2 + 0.02]} size={[0.5, 0.65]} glow="#F0E6D0" />
      </group>

      {hasLoft && (
        <group>
          <WindowPane
            position={[twin ? -0.35 : 0, H - 0.35, winZ]}
            size={[0.4, 0.28]}
            glow="#FFE9C4"
          />
          {twin && (
            <WindowPane
              position={[0.35, H - 0.35, winZ]}
              size={[0.4, 0.28]}
              glow="#FFE9C4"
            />
          )}
        </group>
      )}

      <RoofMesh type={roof} length={L} depth={D} wallH={H} />

      <Hotspot
        position={[0, H + (roof === "plocha" ? 0.35 : roof === "kulata" ? 0.75 : 0.95), 0]}
        id="roof"
        label="Střecha"
        active={activeHotspot === "roof"}
        onClick={onHotspot}
      />
      <Hotspot
        position={[L * 0.35, H * 0.5, D / 2 + 0.3]}
        id="facade"
        label="Fasáda"
        active={activeHotspot === "facade"}
        onClick={onHotspot}
      />
      <Hotspot
        position={[L * 0.12, winY, D / 2 + 0.35]}
        id="window"
        label="Okna"
        active={activeHotspot === "window"}
        onClick={onHotspot}
      />
      <Hotspot
        position={[doorX, doorH * 0.55, D / 2 + 0.35]}
        id="door"
        label="Vstup"
        active={activeHotspot === "door"}
        onClick={onHotspot}
      />
      <Hotspot
        position={[0, -0.15, D / 2 + 0.5]}
        id="size"
        label="Rozměry"
        active={activeHotspot === "size"}
        onClick={onHotspot}
      />
    </group>
  );
}

function Scene(props: House3DProps) {
  return (
    <>
      <color attach="background" args={["#f0efec"]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-4, 4, -2]} intensity={0.35} color="#ffe8c8" />
      <Environment preset="city" environmentIntensity={0.35} />
      <TinyHouse {...props} />
      <ContactShadows position={[0, -0.02, 0]} opacity={0.45} scale={18} blur={2.4} far={8} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#e8e6e1" roughness={1} />
      </mesh>
      <OrbitControls
        makeDefault
        enablePan={false}
        minPolarAngle={0.6}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={5}
        maxDistance={14}
        target={[0, 1.1, 0]}
      />
    </>
  );
}

export function HouseScene3D(props: House3DProps) {
  return (
    <div className="house3d">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [5.2, 2.8, 5.8], fov: 38, near: 0.1, far: 80 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <Scene {...props} />
        </Suspense>
      </Canvas>
      <div className="house3d-hint" aria-hidden="true">
        <span>Tažením otočíte model</span>
        <span>Klikněte na body pro konfiguraci</span>
      </div>
    </div>
  );
}
