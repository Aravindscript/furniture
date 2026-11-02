
import React, { useEffect, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight, ArrowUpRight, ShoppingBag, Menu, X,
  Plus, Minus, Trash2, Sparkles, Heart, Star,
  Truck, ShieldCheck 
} from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import "./App.css";
import PremiumExperience from "./components/PremiumExperience";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Aura Luxury Sofa",
    category: "SOFA",
    price: 24999,
    oldPrice: 34999,
    discount: "29% OFF",
    image: `${import.meta.env.BASE_URL}images/products/sofa.png`,
    description: "A beautifully sculpted sofa with premium upholstery, deep cushions and timeless contemporary styling.",
    color: "#d6c5ad",
    tag: "BEST SELLER"
  },
  {
    id: 2,
    name: "Nordic Lounge Chair",
    category: "CHAIR",
    price: 6499,
    oldPrice: 8999,
    discount: "28% OFF",
    image: `${import.meta.env.BASE_URL}images/products/chair.png`,
    description: "An elegant accent chair designed for comfort, character and everyday living.",
    color: "#a98260",
    tag: "POPULAR"
  },
  {
    id: 3,
    name: "Royal Dining Table",
    category: "TABLE",
    price: 18999,
    oldPrice: 25999,
    discount: "27% OFF",
    image: `${import.meta.env.BASE_URL}images/products/table.png`,
    description: "Bring everyone together around a beautifully finished dining table made for memorable moments.",
    color: "#916746",
    tag: "NEW ARRIVAL"
  },
  {
    id: 4,
    name: "Dream King Bed",
    category: "BEDROOM",
    price: 29999,
    oldPrice: 39999,
    discount: "25% OFF",
    image: `${import.meta.env.BASE_URL}images/products/bed.png`,
    description: "Transform your bedroom with a luxurious bed frame combining modern design and lasting comfort.",
    color: "#b8a18b",
    tag: "LUXURY PICK"
  },
  {
    id: 5,
    name: "Nova Coffee Table",
    category: "TABLE",
    price: 5999,
    oldPrice: 7999,
    discount: "25% OFF",
    image: `${import.meta.env.BASE_URL}images/products/coffee-table.png`,
    description: "A minimal statement piece with a warm natural finish for your living room.",
    color: "#a77a50",
    tag: "TRENDING"
  },
  {
    id: 6,
    name: "Elite Wardrobe",
    category: "STORAGE",
    price: 19999,
    oldPrice: 27999,
    discount: "29% OFF",
    image: `${import.meta.env.BASE_URL}images/products/wardrobe.png`,
    description: "Elegant storage with generous space, clean lines and a refined modern finish.",
    color: "#8c674d",
    tag: "SPECIAL OFFER"
  }
];

const money = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

function ThreeDModel() {
  const { scene } = useGLTF(
    `${import.meta.env.BASE_URL}models/sofa.glb`
  );

  return (
    <primitive
      object={scene}
      scale={2.15}
      position={[0, -1.15, 0]}
    />
  );
}

function Loader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="loader-logo"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        STYLE'S<span>.</span>
        <small>F U R N I T U R E</small>
      </motion.div>

      <div className="loader-line">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <p>DESIGNED FOR BETTER LIVING</p>
    </motion.div>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="product-modal"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={21} />
          </button>

          <div className="modal-image">
            <img src={product.image} alt={product.name} />
            <span className="sale-tag">{product.discount}</span>
          </div>

          <div className="modal-info">
            <span className="eyebrow">{product.category} COLLECTION</span>
            <h2>{product.name}</h2>

            <div className="rating">
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <span>Customer favourite</span>
            </div>

            <p>{product.description}</p>

            <div className="modal-prices">
              <strong>{money(product.price)}</strong>
              <del>{money(product.oldPrice)}</del>
              <span>{product.discount}</span>
            </div>

            <div className="quantity-row">
              <span>Quantity</span>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={14} />
                </button>
                <strong>{quantity}</strong>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              className="add-cart-button"
              onClick={() => onAdd(product, quantity)}
            >
              Add to Cart — {money(product.price * quantity)}
              <ShoppingBag size={18} />
            </button>

            <div className="modal-benefits">
              <span><Truck size={15} /> Free delivery</span>
              <span><ShieldCheck size={15} /> Quality assured</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [liked, setLiked] = useState([]);

  const mainRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true
    });

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-left").forEach((element) => {
        gsap.fromTo(element,
          { x: -90, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray(".reveal-right").forEach((element) => {
        gsap.fromTo(element,
          { x: 90, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray(".reveal-up").forEach((element) => {
        gsap.fromTo(element,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray(".split-title").forEach((element) => {
        const original = element.textContent;
        element.innerHTML = "";

        [...original].forEach((letter) => {
          const span = document.createElement("span");
          span.textContent = letter === " " ? "\u00a0" : letter;
          span.className = "letter";
          element.appendChild(span);
        });

        gsap.fromTo(
          element.querySelectorAll(".letter"),
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.035,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true
            }
          }
        );
      });

      gsap.to(".hero-content", {
        y: 100,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, mainRef);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ctx.revert();
    };
  }, [loading]);

  function addToCart(product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { ...product, quantity }];
    });

    setSelected(null);
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(""), 2500);
  }

  function updateQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const toggleLike = (id) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Loader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <main ref={mainRef} className="site">

          {/* HEADER */}
          <header className="navbar">
            <a href="#home" className="brand">
              STYLE'S<span>.</span>
              <small>FURNITURE</small>
            </a>

            <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
              <a href="#collection" onClick={() => setMobileMenu(false)}>COLLECTION</a>
              <a href="#about" onClick={() => setMobileMenu(false)}>OUR STORY</a>
            </nav>

            <div className="nav-actions">
              <button
                className="cart-button"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag size={19} />
                <span>CART ({cartCount})</span>
              </button>

              <button
                className="mobile-menu"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <X /> : <Menu />}
              </button>
            </div>
          </header>

          {/* HERO VIDEO */}
          <section className="hero" id="home">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={`${import.meta.env.BASE_URL}images/backgrounds/living-room.jpg`}
            >
              <source
                src={`${import.meta.env.BASE_URL}videos/hero.mp4`}
                type="video/mp4"
              />
            </video>

            <div className="hero-overlay" />

            <div className="hero-content">
              <span className="hero-kicker">
                <Sparkles size={15} /> THE DIWALI COLLECTION 2026
              </span>

              <h1>
                Make room for
                <br />
                <em>beautiful living.</em>
              </h1>

              <p>
                Furniture that tells your story.
                Designed for comfort, made for life.
              </p>

              <div className="hero-sale">
                <strong>UP TO 50% OFF</strong>
                <span>DIWALI MEGA SALE</span>
              </div>

              <a href="#collection" className="hero-cta">
                EXPLORE COLLECTION <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="hero-bottom">
              <span>CRAFTED FOR YOUR HOME</span>
              <span>01 — 05</span>
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </section>

          {/* BRAND STRIP */}
          <section className="brand-strip">
            <span>TIMELESS DESIGN</span>
            <span>✳</span>
            <span>EVERYDAY COMFORT</span>
            <span>✳</span>
            <span>QUALITY CRAFTSMANSHIP</span>
            <span>✳</span>
            <span>MADE FOR LIVING</span>
          </section>

        
          <section className="intro-section section-padding">
            <div className="intro-left reveal-left">
              <span className="eyebrow">A HOME. A FEELING. A LIFESTYLE.</span>
              <h2 className="split-title">
                Spaces that feel like .
              </h2>
            </div>

            <div className="intro-right reveal-right">
              <p>
                Your home deserves more than furniture.
                It deserves pieces that bring comfort,
                personality and beauty into every moment.
              </p>
              <a href="#about" className="text-link">
                DISCOVER OUR STORY <ArrowUpRight size={16} />
              </a>
            </div>
          </section>

<PremiumExperience />

          {/* PRODUCT SHOWCASE */}
          <section className="showcase-section" id="collection">
            <div className="section-heading reveal-up">
              <div>
                <span className="eyebrow">CURATED FOR YOUR HOME</span>
                <h2 className="split-title">The furniture edit.</h2>
              </div>
              <span className="heading-number">01 / COLLECTION</span>
            </div>

            <div className="product-grid">
              {products.map((product, index) => (
                <motion.article
                  key={product.id}
                  className={`product-card ${index % 2 === 0 ? "reveal-left" : "reveal-right"}`}
                  whileHover={{ y: -9 }}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    className="product-image"
                    onClick={() => setSelected(product)}
                  >
                    <div className="product-glow" />
                    <img src={product.image} alt={product.name} />

                    <span className="product-tag">{product.tag}</span>
                    <span className="product-discount">{product.discount}</span>

                    <button
                      className={`wishlist ${liked.includes(product.id) ? "liked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                    >
                      <Heart size={18} fill={liked.includes(product.id) ? "currentColor" : "none"} />
                    </button>

                    <button
                      className="quick-view"
                      onClick={() => setSelected(product)}
                    >
                      QUICK VIEW <ArrowUpRight size={15} />
                    </button>
                  </div>

                  <div className="product-details">
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="product-price">
                      <strong>{money(product.price)}</strong>
                      <del>{money(product.oldPrice)}</del>
                    </div>
                    <button
                      className="product-add"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART <Plus size={16} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* DIWALI SALE BANNER */}
          <section className="diwali-banner">
            <div className="diwali-glow" />
            <div className="diwali-content reveal-left">
              <span className="eyebrow">A FESTIVE CELEBRATION</span>
              <h2>
                This Diwali,
                <br />
                <em>bring home happiness.</em>
              </h2>
              <p>
                Celebrate new beginnings with beautiful
                furniture and exclusive festive offers.
              </p>
              <a href="#collection" className="gold-button">
                SHOP THE SALE <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="diwali-art reveal-right">
              <div className="diwali-circle" />
              <div className="diya">🪔</div>
              <span>LIGHT UP<br />YOUR HOME</span>
              <strong>50%</strong>
              <small>OFF</small>
            </div>
          </section>

          {/* 3D SHOWCASE */}
         

          {/* ABOUT */}
          <section className="about-section section-padding" id="about">
            <div className="about-image reveal-left">
              <img
                src={`${import.meta.env.BASE_URL}images/backgrounds/showroom.jpg`}
                alt="Style's Furniture showroom"
              />
              <span>DESIGNED WITH PURPOSE.</span>
            </div>

            <div className="about-copy reveal-right">
              <span className="eyebrow">THE STYLE'S PHILOSOPHY</span>
              <h2 className="split-title">
                Beautiful design.
                <br />
                Meaningful living.
              </h2>
              <p>
                At STYLE'S FURNITURE, we believe that
                great furniture transforms the way
                people experience their homes.
              </p>
              <p>
                From thoughtful materials to timeless
                silhouettes, every piece is selected
                to make your everyday spaces special.
              </p>

              <div className="about-stats">
                <div><strong>01</strong><span>DESIGN FIRST</span></div>
                <div><strong>02</strong><span>QUALITY ALWAYS</span></div>
                <div><strong>03</strong><span>MADE FOR YOU</span></div>
              </div>
            </div>
          </section>

          {/* BENEFITS */}
          <section className="benefits">
            <div className="benefit reveal-up">
              <Truck size={28} />
              <h3>Careful Delivery</h3>
              <p>Furniture delivered with care to your doorstep.</p>
            </div>
            <div className="benefit reveal-up">
              <ShieldCheck size={28} />
              <h3>Quality Promise</h3>
              <p>Thoughtfully selected materials and finishes.</p>
            </div>
            <div className="benefit reveal-up">
              <Heart size={28} />
              <h3>Made for Living</h3>
              <p>Beautiful pieces designed for everyday comfort.</p>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer" id="contact">
            <div className="footer-main">
              <div className="footer-brand">
                <a href="#home">STYLE'S<span>.</span></a>
                <p>
                  Design your space.
                  <br />
                  Define your style.
                </p>
                <div className="socials">
                 <a href="#contact" aria-label="Instagram">
  <FaInstagram />
</a>
                 <a href="#contact" aria-label="Facebook">
  <FaFacebookF />
</a>
                </div>
              </div>

              <div className="footer-links">
                <h4>EXPLORE</h4>
                <a href="#home">Home</a>
                <a href="#collection">Collection</a>
                <a href="#about">Our Story</a>
              </div>

              <div className="footer-links">
                <h4>CONTACT</h4>
                <a href="mailto:hello@stylesfurniture.com">Email Us</a>
                <a href="#contact">Customer Support</a>
                <a href="#contact">Visit Our Store</a>
              </div>

              <div className="footer-note">
                <span>THE DIWALI EDIT 2026</span>
                <h3>Make every corner count.</h3>
                <a href="#collection">SHOP NOW <ArrowUpRight size={15} /></a>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© 2026 STYLE'S FURNITURE. ALL RIGHTS RESERVED.</span>
              <span>CRAFTED FOR BEAUTIFUL LIVING.</span>
            </div>
          </footer>

          {/* PRODUCT MODAL */}
          {selected && (
            <ProductModal
              key={selected.id}
              product={selected}
              onClose={() => setSelected(null)}
              onAdd={addToCart}
            />
          )}

          {/* CART DRAWER */}
          <AnimatePresence>
            {cartOpen && (
              <motion.div
                className="cart-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCartOpen(false)}
              >
                <motion.aside
                  className="cart-drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.35 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="cart-header">
                    <div>
                      <span className="eyebrow">YOUR SELECTION</span>
                      <h2>Shopping Bag ({cartCount})</h2>
                    </div>
                    <button onClick={() => setCartOpen(false)}>
                      <X />
                    </button>
                  </div>

                  <div className="cart-items">
                    {cart.length === 0 ? (
                      <div className="empty-cart">
                        <ShoppingBag size={40} />
                        <h3>Your bag is waiting.</h3>
                        <p>Discover something beautiful for your home.</p>
                        <button onClick={() => setCartOpen(false)}>
                          EXPLORE COLLECTION
                        </button>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                          <img src={item.image} alt={item.name} />
                          <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <strong>{money(item.price)}</strong>
                            <div className="cart-quantity">
                              <button onClick={() => updateQuantity(item.id, -1)}>
                                <Minus size={13} />
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)}>
                                <Plus size={13} />
                              </button>
                              <button
                                className="remove-item"
                                onClick={() => setCart((c) => c.filter((p) => p.id !== item.id))}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="cart-bottom">
                      <div className="cart-total">
                        <span>Subtotal</span>
                        <strong>{money(cartTotal)}</strong>
                      </div>
                      <button
                        className="checkout-button"
                        onClick={() => alert("Demo checkout — no real payment has been made.")}
                      >
                        PROCEED TO CHECKOUT <ArrowRight size={17} />
                      </button>
                      <p>Checkout is a demo. No real payment is processed.</p>
                    </div>
                  )}
                </motion.aside>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TOAST */}
          <AnimatePresence>
            {toast && (
              <motion.div
                className="toast"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
              >
                <span>✓</span> {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
    </>
  );
}

export default App;

