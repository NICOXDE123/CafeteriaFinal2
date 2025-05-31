// frontend/src/pages/MenuTienda.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/styles.css";

// -------------------------------------------------------------
// 1) BANNER INTERACTIVO (HOVER EXPANDIBLE)
// -------------------------------------------------------------
const DISCOUNT_NOTE = (
  <div className="interactive-banner">
    <div className="banner-header">
      <strong>¡Ahorra con nuestras promociones!</strong>
      <span className="banner-icon">▼</span>
    </div>
    <div className="banner-details">
      <ul>
        <li className="combo-note">
          “Dulce Pareja”:
          <ul className="combo-sublist">
            <li>Latte + Cheesecake → 7% de descuento</li>
          </ul>
        </li>
        <li className="combo-note">
          “Desayuno Completo”:
          <ul className="combo-sublist">
            <li>Tostada Francesa + Espresso → Muffin gratis</li>
          </ul>
        </li>
        <li className="combo-note">
          “Energía Extra”:
          <ul className="combo-sublist">
            <li>Cold Brew + Bagel → Brownie gratis</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);

// -------------------------------------------------------------
// 2) LISTA COMPLETA DEL MENÚ
// -------------------------------------------------------------
const MENU_ITEMS = [
  // ----- CAFÉS (1–15) -----
  {
    id: 1,
    category: "Café",
    name: "Espresso",
    description: "Shot intenso para arrancar el día.",
    ingredients: ["Café molido", "Agua caliente"],
    image: "/images/espresso.png",
    basePrice: 2.5,
    sizes: [
      { label: "Single", extra: 0 },
      { label: "Doble", extra: 1.0 },
    ],
    toppings: [{ name: "Shot extra", price: 0.75 }],
  },
  {
    id: 2,
    category: "Café",
    name: "Latte",
    description: "Espresso suave con espuma cremosa.",
    ingredients: ["Espresso", "Leche entera", "Espuma de leche"],
    image: "/images/latte.png",
    basePrice: 3.5,
    sizes: [
      { label: "Pequeño", extra: 0 },
      { label: "Mediano", extra: 0.75 },
      { label: "Grande", extra: 1.25 },
    ],
    toppings: [
      { name: "Vainilla", price: 0.5 },
      { name: "Caramelo", price: 0.75 },
    ],
  },
  {
    id: 3,
    category: "Café",
    name: "Cappuccino",
    description: "Espeso y espumoso, clásico italiano.",
    ingredients: ["Espresso", "Leche", "Espuma"],
    image: "/images/cappuccino.png",
    basePrice: 3.75,
    sizes: [
      { label: "Mediano", extra: 0 },
      { label: "Grande", extra: 1.0 },
    ],
    toppings: [{ name: "Cacao", price: 0.3 }],
  },
  {
    id: 4,
    category: "Café",
    name: "Flat White",
    description: "Más café, menos espuma.",
    ingredients: ["Espresso doble", "Leche al vapor"],
    image: "/images/flat white.png",
    basePrice: 3.8,
    sizes: [
      { label: "Mediano", extra: 0 },
      { label: "Grande", extra: 1.0 },
    ],
    toppings: [{ name: "Canela", price: 0.25 }],
  },
  {
    id: 5,
    category: "Café",
    name: "Mocha",
    description: "Chocolate y café, combinación perfecta.",
    ingredients: ["Espresso", "Leche", "Chocolate"],
    image: "/images/mocha.png",
    basePrice: 4.5,
    sizes: [
      { label: "Pequeño", extra: 0 },
      { label: "Grande", extra: 1.5 },
    ],
    toppings: [{ name: "Crema batida", price: 0.5 }],
  },
  {
    id: 6,
    category: "Café",
    name: "Frappe",
    description: "Frío, espumoso y muy refrescante.",
    ingredients: ["Café frío", "Leche", "Hielo", "Crema"],
    image: "/images/frappe.png",
    basePrice: 4.0,
    sizes: [
      { label: "Mediano", extra: 0 },
      { label: "Grande", extra: 1.0 },
    ],
    toppings: [{ name: "Chocolate chips", price: 0.5 }],
  },
  {
    id: 7,
    category: "Café",
    name: "Cold Brew",
    description: "Café infusionado en frío por 12 horas.",
    ingredients: ["Café molido", "Agua fría"],
    image: "/images/cold brew.png",
    basePrice: 3.0,
    sizes: [
      { label: "Regular", extra: 0 },
      { label: "Grande", extra: 0.8 },
    ],
    toppings: [{ name: "Miel", price: 0.5 }],
  },
  {
    id: 8,
    category: "Café",
    name: "Macchiato",
    description: "Un toque de leche sobre tu espresso.",
    ingredients: ["Espresso", "Pizca de espuma"],
    image: "/images/macchiato.png",
    basePrice: 3.2,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [{ name: "Toronja", price: 0.3 }],
  },
  {
    id: 9,
    category: "Café",
    name: "Affogato",
    description: "Helado de vainilla + shot de espresso.",
    ingredients: ["Helado de vainilla", "Espresso"],
    image: "/images/affogato.png",
    basePrice: 5.0,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [{ name: "Nueces", price: 0.75 }],
  },
  {
    id: 10,
    category: "Café",
    name: "Matcha Latte",
    description: "Té verde matcha con leche cremosa.",
    ingredients: ["Matcha en polvo", "Leche"],
    image: "/images/matcha latte.png",
    basePrice: 4.0,
    sizes: [
      { label: "Pequeño", extra: 0 },
      { label: "Grande", extra: 1.0 },
    ],
    toppings: [{ name: "Miel", price: 0.5 }],
  },
  {
    id: 11,
    category: "Café",
    name: "Chai Latte",
    description: "Especias aromáticas con leche caliente.",
    ingredients: ["Chai en polvo", "Leche"],
    image: "/images/chai latte.png",
    basePrice: 4.2,
    sizes: [
      { label: "Pequeño", extra: 0 },
      { label: "Grande", extra: 1.0 },
    ],
    toppings: [{ name: "Canela extra", price: 0.3 }],
  },
  {
    id: 12,
    category: "Café",
    name: "Turkish Coffee",
    description: "Intenso, con poso y aroma oriental.",
    ingredients: ["Café molido fino", "Azúcar (opcional)"],
    image: "/images/turkish coffee.png",
    basePrice: 3.5,
    sizes: [{ label: "Pequeño", extra: 0 }],
    toppings: [{ name: "Cardamomo", price: 0.4 }],
  },
  {
    id: 13,
    category: "Café",
    name: "Irish Coffee",
    description: "Café + whisky + crema.",
    ingredients: ["Café caliente", "Whisky", "Crema"],
    image: "/images/irish coffee.png",
    basePrice: 6.0,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [{ name: "Crema batida", price: 0.5 }],
  },
  {
    id: 14,
    category: "Café",
    name: "Cortado",
    description: "Mitad espresso, mitad leche.",
    ingredients: ["Espresso", "Leche calientita"],
    image: "/images/cortado.png",
    basePrice: 3.0,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [],
  },
  {
    id: 15,
    category: "Café",
    name: "Nitro Cold Brew",
    description: "Café infusionado con nitrógeno.",
    ingredients: ["Cold Brew", "Nitrógeno"],
    image: "/images/nitro cold brew.png",
    basePrice: 5.5,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [],
  },

  // ----- POSTRES (16–23) -----
  {
    id: 16,
    category: "Postre",
    name: "Cheesecake",
    description: "Queso crema y base de galleta.",
    ingredients: ["Queso crema", "Galleta", "Azúcar"],
    image: "/images/cheesecake.png",
    basePrice: 4.0,
    sizes: [{ label: "Porción", extra: 0 }],
    toppings: [{ name: "Fruta fresca", price: 1.0 }],
  },
  {
    id: 17,
    category: "Postre",
    name: "Brownie",
    description: "Chocolate belga, tierno y crujiente.",
    ingredients: ["Chocolate", "Harina", "Huevo", "Azúcar"],
    image: "/images/brownie.png",
    basePrice: 3.0,
    sizes: [{ label: "Unidad", extra: 0 }],
    toppings: [{ name: "Helado vainilla", price: 1.0 }],
  },
  {
    id: 18,
    category: "Postre",
    name: "Tarta de Manzana",
    description: "Manzana especiada y hojaldre crujiente.",
    ingredients: ["Manzana", "Hojaldre", "Canela", "Azúcar"],
    image: "/images/tarta de manzana.png",
    basePrice: 4.5,
    sizes: [{ label: "Porción", extra: 0 }],
    toppings: [],
  },
  {
    id: 19,
    category: "Postre",
    name: "Macaron",
    description: "Delicado y colorido dulce francés.",
    ingredients: ["Harina de almendra", "Clara de huevo", "Azúcar"],
    image: "/images/macaron.png",
    basePrice: 2.0,
    sizes: [{ label: "Unidad", extra: 0 }],
    toppings: [],
  },
  {
    id: 20,
    category: "Postre",
    name: "Cupcake",
    description: "Esponjoso con glaseado cremoso.",
    ingredients: ["Harina", "Azúcar", "Huevo", "Mantequilla"],
    image: "/images/cupcake.png",
    basePrice: 2.5,
    sizes: [{ label: "Unidad", extra: 0 }],
    toppings: [],
  },
  {
    id: 21,
    category: "Postre",
    name: "Tiramisú",
    description: "Café y queso mascarpone.",
    ingredients: ["Mascarpone", "Café", "Bizcocho", "Cacao"],
    image: "/images/tiramisu.png",
    basePrice: 5.0,
    sizes: [{ label: "Porción", extra: 0 }],
    toppings: [],
  },
  {
    id: 22,
    category: "Postre",
    name: "Donut",
    description: "Aros fritos y glaseado dulce.",
    ingredients: ["Harina", "Azúcar", "Aceite", "Glaseado"],
    image: "/images/donut.png",
    basePrice: 1.5,
    sizes: [{ label: "Unidad", extra: 0 }],
    toppings: [],
  },
  {
    id: 23,
    category: "Postre",
    name: "Panna Cotta",
    description: "Crema suave con coulis de frutos.",
    ingredients: ["Crema", "Leche", "Gelatina", "Frutos rojos"],
    image: "/images/panna cotta.png",
    basePrice: 4.0,
    sizes: [{ label: "Porción", extra: 0 }],
    toppings: [],
  },

  // ----- DESAYUNOS (24–29) -----
  {
    id: 24,
    category: "Desayuno",
    name: "Tostada Francesa",
    description: "Clásica con jarabe de arce.",
    ingredients: ["Pan brioche", "Huevo", "Leche", "Azúcar"],
    image: "/images/tostada francesa.png",
    basePrice: 5.5,
    sizes: [{ label: "2 rebanadas", extra: 0 }],
    toppings: [{ name: "Frutas mixtas", price: 1.0 }],
  },
  {
    id: 25,
    category: "Desayuno",
    name: "Bagel con Queso Crema",
    description: "Fresco y recién horneado.",
    ingredients: ["Bagel", "Queso crema", "Salmón ahumado (opcional)"],
    image: "/images/bagel con queso.png",
    basePrice: 4.0,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [{ name: "Salmón ahumado", price: 1.5 }],
  },
  {
    id: 26,
    category: "Desayuno",
    name: "Muffin de Arándanos",
    description: "Suave y jugoso, con arándanos.",
    ingredients: ["Harina", "Arándanos", "Leche", "Huevo"],
    image: "/images/muffin de arandanos.png",
    basePrice: 3.5,
    sizes: [{ label: "Unidad", extra: 0 }],
    toppings: [],
  },
  {
    id: 27,
    category: "Desayuno",
    name: "Omelette",
    description: "Huevos batidos con vegetales.",
    ingredients: ["Huevo", "Vegetales mixtos", "Aceite"],
    image: "/images/omelette.png",
    basePrice: 6.0,
    sizes: [{ label: "Individual", extra: 0 }],
    toppings: [{ name: "Queso extra", price: 0.5 }],
  },
  {
    id: 28,
    category: "Desayuno",
    name: "Waffles",
    description: "Crujientes con frutas y miel.",
    ingredients: ["Harina", "Huevo", "Leche", "Azúcar"],
    image: "/images/waffles.png",
    basePrice: 5.0,
    sizes: [{ label: "2 piezas", extra: 0 }],
    toppings: [{ name: "Jarabe de arce", price: 0.5 }],
  },
  {
    id: 29,
    category: "Desayuno",
    name: "Parfait de Yogur",
    description: "Capas de yogur, frutos y granola.",
    ingredients: ["Yogur", "Frutos mixtos", "Granola"],
    image: "/images/parfait.png",
    basePrice: 4.5,
    sizes: [{ label: "Unidad", extra: 0 }],
    toppings: [],
  },

  // ----- COMIDA LIGERA (30–33) -----
  {
    id: 30,
    category: "Comida Ligera",
    name: "Ensalada César",
    description: "Lechuga, parmesano y aderezo.",
    ingredients: ["Lechuga", "Croutons", "Parmesano", "Aderezo"],
    image: "/images/ensalada cesar.png",
    basePrice: 6.5,
    sizes: [{ label: "Individual", extra: 0 }],
    toppings: [{ name: "Pechuga de pollo", price: 2.0 }],
  },
  {
    id: 31,
    category: "Comida Ligera",
    name: "Sándwich Caprese",
    description: "Tomate, mozzarella y albahaca.",
    ingredients: ["Pan ciabatta", "Tomate", "Mozzarella", "Albahaca"],
    image: "/images/sandwich caprese.png",
    basePrice: 7.0,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [{ name: "Pesto extra", price: 0.75 }],
  },
  {
    id: 32,
    category: "Comida Ligera",
    name: "Wrap de Pollo",
    description: "Tortilla rellena de pollo y veggies.",
    ingredients: ["Tortilla", "Pechuga de pollo", "Vegetales mixtos"],
    image: "/images/wrap de pollo.png",
    basePrice: 7.5,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [],
  },
  {
    id: 33,
    category: "Comida Ligera",
    name: "Panini de Jamón",
    description: "Crujiente con queso derretido.",
    ingredients: ["Pan para panini", "Jamón", "Queso"],
    image: "/images/panini de jamon.png",
    basePrice: 6.0,
    sizes: [{ label: "Único", extra: 0 }],
    toppings: [],
  },
];

// -------------------------------------------------------------
// 3) COMPONENTE PRINCIPAL: MenuTienda
// -------------------------------------------------------------
export default function MenuTienda() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [total, setTotal] = useState(0);

  // Recalcular total cada vez que cambia el carrito
  useEffect(() => {
    const suma = cart.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(suma);
  }, [cart]);

  // Añadir al carrito
  const addToCart = (item, opts) => {
    const { size, toppings, qty } = opts;
    const priceSize = item.basePrice + size.extra;
    const priceTops = toppings.reduce((sum, t) => sum + t.price, 0);
    const unitPrice = priceSize + priceTops;
    const subtotal = unitPrice * qty;

    setCart((prev) => [
      ...prev,
      {
        key: Date.now(),
        name: item.name,
        size: size.label,
        toppings: toppings.map((t) => t.name),
        qty,
        unitPrice,
        subtotal,
      },
    ]);
  };

  // Actualizar cantidad en carrito
  const updateQty = (key, delta) =>
    setCart((prev) =>
      prev
        .map((it) =>
          it.key === key
            ? { ...it, qty: it.qty + delta, subtotal: it.unitPrice * (it.qty + delta) }
            : it
        )
        .filter((it) => it.qty > 0)
    );

  // Ir a la página de pago
  const handleCheckout = () => {
    setModalOpen(false);
    navigate("/pagar");
  };

  return (
    <div className="menu-tienda-container">
      {/* ─────────────────────────────────────────────────────────────────────
          3.A) BANNER DE DESCUENTOS FIJADO A LA DERECHA
         ───────────────────────────────────────────────────────────────────── */}
      <div
        className="banner-fixed"
        style={{
          position: "fixed",
          right: "1rem",
          top: "20%",
          width: "240px",
          backgroundColor: "#f9f4ef",
          borderLeft: "4px solid var(--color-primary)",
          padding: "12px 20px",
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflowY: "auto",
          maxHeight: "60vh",
        }}
      >
        {DISCOUNT_NOTE}
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          3.B) NAVBAR ÚNICO
         ───────────────────────────────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="logo">☕ Café Aroma</div>
        <ul className="nav-list">
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/tiendafisica">Tienda Física</NavLink>
          </li>
        </ul>
        <button className="ordenar-btn" onClick={() => setModalOpen(true)}>
          Carrito ({cart.length}) — ${total.toFixed(2)}
        </button>
      </nav>

      {/* ─────────────────────────────────────────────────────────────────────
          3.C) CONTENIDO PRINCIPAL
             Primero Postres, luego Café (como pidió)
         ───────────────────────────────────────────────────────────────────── */}
      <main
        className="contenedor"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      >
        <section className="categoria-productos">
          <h3 className="categoria-title">Postres</h3>
          <div className="productos-grid">
            {MENU_ITEMS.filter((i) => i.category === "Postre").map((item) => (
              <ProductCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>

        <section className="categoria-productos">
          <h3 className="categoria-title">Café</h3>
          <div className="productos-grid">
            {MENU_ITEMS.filter((i) => i.category === "Café").map((item) => (
              <ProductCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>

        <section className="categoria-productos">
          <h3 className="categoria-title">Desayunos</h3>
          <div className="productos-grid">
            {MENU_ITEMS.filter((i) => i.category === "Desayuno").map((item) => (
              <ProductCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>

        <section className="categoria-productos">
          <h3 className="categoria-title">Comida Ligera</h3>
          <div className="productos-grid">
            {MENU_ITEMS.filter((i) => i.category === "Comida Ligera").map((item) => (
              <ProductCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────
          3.D) MODAL DEL CARRITO
         ───────────────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Tu Carrito</h3>
            {cart.length === 0 ? (
              <p>No has agregado nada todavía.</p>
            ) : (
              <ul>
                {cart.map((it) => (
                  <li key={it.key} style={{ marginBottom: "0.75rem" }}>
                    <strong>{it.name}</strong> ({it.size})
                    <br />
                    Toppings: {it.toppings.join(", ") || "Ninguno"}
                    <br />
                    <button
                      onClick={() => updateQty(it.key, -1)}
                      style={{ marginRight: "0.25rem" }}
                    >
                      −
                    </button>
                    {it.qty}
                    <button
                      onClick={() => updateQty(it.key, 1)}
                      style={{ marginLeft: "0.25rem" }}
                    >
                      +
                    </button>{" "}
                    = ${it.subtotal.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
            <p className="total-note">Total ${total.toFixed(2)}</p>
            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)}>Cerrar</button>
              <button onClick={handleCheckout}>Pagar</button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          3.E) FOOTER
         ───────────────────────────────────────────────────────────────────── */}
      <footer>
        <p>© 2025 Café Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// 4) COMPONENTE AUXILIAR: ProductCard
// -------------------------------------------------------------
function ProductCard({ item, onAdd }) {
  const [size, setSize] = useState(item.sizes[0]);
  const [toppings, setToppings] = useState([]);
  const [qty, setQty] = useState(1);

  // Alterna (agrega/quita) un topping
  const toggleTopping = (tog) =>
    setToppings((prev) =>
      prev.includes(tog) ? prev.filter((x) => x !== tog) : [...prev, tog]
    );

  // Calcula precios dinámicos
  const base = item.basePrice + size.extra;
  const tops = toppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = base + tops;

  return (
    <div className="producto-card">
      {/* Imagen */}
      <img className="icon-anim" src={item.image} alt={item.name} />

      {/* Título y descripción */}
      <h4>{item.name}</h4>
      <p className="item-desc">{item.description}</p>
      {Array.isArray(item.ingredients) && item.ingredients.length > 0 && (
        <p className="item-ing">
          <strong>Ingredientes:</strong> {item.ingredients.join(", ")}
        </p>
      )}

      {/* Formulario de opciones (size, toppings, cantidad) */}
      <div className="formulario">
        {/* Tamaño */}
        <label>Tamaño:</label>
        <select
          value={size.label}
          onChange={(e) =>
            setSize(item.sizes.find((s) => s.label === e.target.value))
          }
        >
          {item.sizes.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label} {s.extra > 0 && `(+$${s.extra.toFixed(2)})`}
            </option>
          ))}
        </select>

        {/* Toppings (si existen) */}
        {Array.isArray(item.toppings) && item.toppings.length > 0 && (
          <>
            <label>Toppings:</label>
            {item.toppings.map((t) => (
              <div key={t.name} className="topping-option">
                <input
                  type="checkbox"
                  id={`${item.id}-${t.name}`}
                  checked={toppings.includes(t)}
                  onChange={() => toggleTopping(t)}
                />
                <label htmlFor={`${item.id}-${t.name}`}>
                  {t.name} (+${t.price.toFixed(2)})
                </label>
              </div>
            ))}
          </>
        )}

        {/* Cantidad */}
        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Math.max(1, +e.target.value))}
        />

        {/* Precio unidad */}
        <p className="total-note">
          <strong>Precio unidad:</strong> ${unitPrice.toFixed(2)}
        </p>

        {/* Botón “Añadir al Carrito” */}
        <button
          className="ordenar-btn"
          onClick={() => onAdd(item, { size, toppings, qty })}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}
