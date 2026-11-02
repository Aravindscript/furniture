
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  X,
  Sofa,
  Armchair,
  Lamp,
  ArrowRight,
} from "lucide-react";
import "./PremiumExperience.css";

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;

function SofaModel() {
  const { scene } = useGLTF(`${BASE}models/sofa.glb`);

  return (
    <Center>
      <primitive object={scene} scale={2.15} />
    </Center>
  );
}

function ModelLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.35, 24, 24]} />
      <meshStandardMaterial color="#c8a66a" wireframe />
    </mesh>
  );
}

const hotspotProducts = [
  {
    id: 1,
    name: "Aura Luxury Sofa",
    price: "₹24,999",
    description: "A statement sofa designed for modern luxury living.",
    icon: Sofa,
    position: { left: "49%", top: "58%" },
  },
  {
    id: 2,
    name: "Nordic Lounge Chair",
    price: "₹6,499",
    description: "A comfortable accent chair with timeless styling.",
    icon: Armchair,
    position: { left: "76%", top: "67%" },
  },
  {
    id: 3,
    name: "Nova Coffee Table",
    price: "₹5,999",
    description: "A minimal coffee table that completes your living room.",
    icon: Lamp,
    position: { left: "57%", top: "82%" },
  },
];

export default function PremiumExperience() {
  const storyRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [roomPosition, setRoomPosition] = useState(50);
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(5.5);
  const controlsRef = useRef(null);

useEffect(() => {
  if (controlsRef.current) {
    controlsRef.current.object.position.set(0, 1.2, zoom);
    controlsRef.current.update();
  }
}, [zoom]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".story-panel").forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 75, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".architect-line",
        { strokeDashoffset: 900 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".premium-hero",
            start: "top 80%",
          },
        }
      );

      gsap.to(".premium-glow", {
        opacity: 0.85,
        scale: 1.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  const changeZoom = (amount) => {
    setZoom((current) => Math.min(8, Math.max(3, current + amount)));
  };

  return (
    <div className="premium-experience" ref={storyRef}>

      {/* ARCHITECTURAL SVG HERO */}

      <section className="premium-hero">
        <div className="premium-glow" />

        <svg
          className="architect-background"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            className="architect-line"
            d="M80 100 H450 V250 H700 V100 H1100 V550 H850 V400 H450 V600 H80 Z"
          />
          <path
            className="architect-line second-line"
            d="M160 160 H390 V310 H780 V160 H1030 V490 H780 V350 H390 V530 H160 Z"
          />
          <circle className="architect-circle" cx="600" cy="350" r="230" />
        </svg>

        <div className="premium-hero-content story-panel">
          <span className="premium-eyebrow">THE ART OF LIVING</span>
          <h2>
            Experience Furniture
            <br />
            <span>Beyond Ordinary.</span>
          </h2>
          <p>
            Discover timeless furniture through immersive design,
            interactive details and modern craftsmanship.
          </p>
          <a href="#sofa-viewer" className="premium-cta">
            EXPLORE THE EXPERIENCE <ArrowRight size={17} />
          </a>
        </div>

        <div className="premium-hero-bottom">
          <span>DESIGNED FOR YOUR SPACE</span>
          <span>01 — 04</span>
        </div>
      </section>

      {/* 360 DEGREE SOFA VIEWER */}

      <section className="viewer-section" id="sofa-viewer">
        <div className="premium-section-heading story-panel">
          <span className="premium-eyebrow">INTERACTIVE COLLECTION</span>
          <h2>See Every <span>Angle.</span></h2>
          <p>Drag to rotate. Explore the furniture from every direction.</p>
        </div>

        <div className="viewer-layout">
          <div className="sofa-viewer">
            <div className="viewer-top-label">
              <span>360° PRODUCT VIEW</span>
              <span>01 / AURA SOFA</span>
            </div>

            <div className="viewer-glow" />

            <Canvas
              camera={{ position: [0, 1.2, zoom], fov: 38 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={1.5} />
              <directionalLight
                position={[4, 6, 5]}
                intensity={2.5}
              />
              <spotLight
                position={[-4, 5, -3]}
                intensity={2}
                angle={0.5}
                penumbra={1}
              />

              <Suspense fallback={<ModelLoader />}>
                <SofaModel />
                <Environment preset="apartment" />
              </Suspense>

             <OrbitControls
  ref={controlsRef}
  enablePan={false}
  enableZoom={false}
  minPolarAngle={Math.PI / 3}
  maxPolarAngle={Math.PI / 2}
  autoRotate={autoRotate}
  autoRotateSpeed={1.1}
  enableDamping
  dampingFactor={0.06}
/>
            </Canvas>

            <div className="viewer-controls">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle auto rotate"
              >
                <RotateCw size={17} />
                {autoRotate ? "PAUSE ROTATION" : "AUTO ROTATE"}
              </button>

              <button onClick={() => changeZoom(-0.5)} title="Zoom out">
                <ZoomOut size={17} />
              </button>

              <button onClick={() => changeZoom(0.5)} title="Zoom in">
                <ZoomIn size={17} />
              </button>
            </div>
          </div>

          <div className="viewer-info story-panel">
            <span className="premium-eyebrow">THE SIGNATURE PIECE</span>
            <h3>Aura Luxury Sofa</h3>
            <p>
              Comfort meets contemporary craftsmanship. Designed to
              transform your living room into a statement of elegance.
            </p>

            <div className="viewer-price">₹24,999</div>

            <div className="viewer-specs">
              <div><span>DESIGN</span><strong>Contemporary</strong></div>
              <div><span>STYLE</span><strong>Luxury Minimal</strong></div>
              <div><span>VIEW</span><strong>360° Interactive</strong></div>
            </div>

            <p className="viewer-hint">
              <RotateCw size={15} /> Drag the model to explore every angle
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER ROOM TRANSFORMATION */}

      <section className="room-section">
        <div className="premium-section-heading story-panel">
          <span className="premium-eyebrow">TRANSFORM YOUR SPACE</span>
          <h2>From Empty to <span>Extraordinary.</span></h2>
          <p>Move the slider to reveal the transformation.</p>
        </div>

        <div
          className="room-comparison story-panel"
          style={{
            "--room-position": `${roomPosition}%`,
            backgroundImage: `url("${BASE}images/rooms/empty-room.jpeg")`,
          }}
        >
          <div
            className="room-after"
            style={{
              backgroundImage: `url("${BASE}images/rooms/furnished-room.jpeg")`,
            }}
          />

          <div className="room-label room-label-before">BEFORE</div>
          <div className="room-label room-label-after">AFTER</div>

          <div className="room-divider">
            <span>↔</span>
          </div>

          <input
            className="room-range"
            type="range"
            min="0"
            max="100"
            value={roomPosition}
            onChange={(event) => setRoomPosition(Number(event.target.value))}
            aria-label="Compare empty and furnished room"
          />
        </div>

        <div className="room-caption">
          <span>EMPTY SPACE</span>
          <span>YOUR DREAM LIVING ROOM</span>
        </div>
      </section>

      {/* CINEMATIC SCROLL STORY */}

      <section className="cinematic-section">
        <div className="cinematic-background"  style={{
    backgroundImage: `url("${BASE}images/rooms/living-room.jpg")`,
  }}/>

        <div className="cinematic-content story-panel">
          <span className="premium-eyebrow">CRAFTED WITH PURPOSE</span>
          <h2>
            Every Detail.
            <br />
            Every Curve.
            <br />
            <span>Every Moment.</span>
          </h2>
          <p>
            Furniture is not just what fills a room. It is what makes
            a space feel like yours.
          </p>
          <a href="#furniture-hotspots" className="premium-cta">
            DISCOVER THE DETAILS <ArrowRight size={17} />
          </a>
        </div>

        <div className="cinematic-number">02 / THE EXPERIENCE</div>
      </section>

      {/* CLICKABLE FURNITURE HOTSPOTS */}

      <section className="hotspot-section" id="furniture-hotspots">
        <div className="premium-section-heading story-panel">
          <span className="premium-eyebrow">EXPLORE THE ROOM</span>
          <h2>Every Piece Has <span>A Story.</span></h2>
          <p>Tap the glowing points to discover the furniture.</p>
        </div>

        <div className="hotspot-room story-panel">
          <img
            src={`${BASE}images/rooms/living-room.jpg`}
            alt="Luxury furnished living room"
          />

          {hotspotProducts.map((product) => {
            const Icon = product.icon;

            return (
              <button
                key={product.id}
                className={`furniture-hotspot ${
                  activeHotspot?.id === product.id ? "active" : ""
                }`}
                style={product.position}
                onClick={() =>
                  setActiveHotspot(
                    activeHotspot?.id === product.id ? null : product
                  )
                }
                aria-label={`View ${product.name}`}
              >
                <span className="hotspot-pulse" />
                <span className="hotspot-plus">+</span>
              </button>
            );
          })}

          {activeHotspot && (
            <div className="hotspot-card">
              <button
                className="hotspot-close"
                onClick={() => setActiveHotspot(null)}
                aria-label="Close product details"
              >
                <X size={17} />
              </button>

              <div className="hotspot-product-icon">
                {React.createElement(activeHotspot.icon, { size: 22 })}
              </div>

              <span className="premium-eyebrow">DISCOVER THIS PIECE</span>
              <h3>{activeHotspot.name}</h3>
              <p>{activeHotspot.description}</p>
              <strong>{activeHotspot.price}</strong>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

useGLTF.preload(`${BASE}models/sofa.glb`);
