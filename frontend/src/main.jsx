import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  ChevronDown,
  Info,
  Menu,
  Package,
  PauseCircle,
  PlayCircle,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { boxes, motorcycles, money } from "./catalog";
import "./style.css";
const API = "/api";
const productsFallback = boxes;
const bikesFallback = motorcycles;
function Logo() {
  return (
    <a className="brand" href="/" aria-label="MOTOCARE Startseite">
      <span className="brand-mark">
        <span />
      </span>
      MOTO<span>CARE</span>
    </a>
  );
}
function MotorcycleArt() {
  return (
    <img
      className="bike-visual bike-photo"
      src="/images/yamaha-r1.jpg"
      alt="Schwarze Yamaha R1 mit eingeschalteten Scheinwerfern"
      fetchPriority="high"
    />
  );
}
function App() {
  const [page, setPage] = useState("home"),
    [selectedBike, setSelectedBike] = useState(null),
    [allBikes, setAllBikes] = useState(bikesFallback),
    [allBoxes, setAllBoxes] = useState(productsFallback),
    [filter, setFilter] = useState("ALL"),
    [selectedBox, setSelectedBox] = useState(null),
    [interval, setInterval] = useState("MONTHLY"),
    [cartOpen, setCartOpen] = useState(false),
    [menuOpen, setMenuOpen] = useState(false),
    [email, setEmail] = useState("demo@motocare.ch"),
    [subs, setSubs] = useState([]),
    [status, setStatus] = useState(""),
    [loading, setLoading] = useState(false),
    [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    Promise.allSettled([
      fetch(API + "/motorcycles")
        .then(check)
        .then((r) => r.json()),
      fetch(API + "/boxes")
        .then(check)
        .then((r) => r.json()),
    ]).then(([b, p]) => {
      if (b.status === "fulfilled") {
        setAllBikes(b.value);
      }
      if (p.status === "fulfilled") setAllBoxes(p.value);
    });
  }, []);
  const activeBike = selectedBike
    ? allBikes.find((b) => b.id === Number(selectedBike))
    : null;
  const visibleBoxes = allBoxes.filter(
    (b) => filter === "ALL" || b.type === filter,
  );
  async function refreshSubs() {
    try {
      let r = await fetch(
        API + "/subscriptions?email=" + encodeURIComponent(email),
      );
      if (!r.ok) throw Error();
      setSubs(await r.json());
    } catch {
      setSubs([]);
      setStatus("Abos konnten nicht geladen werden. Bitte versuche es erneut.");
    }
  }
  function go(p) {
    setPage(p);
    setMenuOpen(false);
    setCartOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (p === "dashboard") refreshSubs();
  }
  async function subscribe() {
    if (!selectedBox || !selectedBike) {
      setStatus("Bitte zuerst ein Motorrad auswählen.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const r = await fetch(API + "/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          motorcycleId: Number(selectedBike),
          boxId: selectedBox.id,
          interval,
        }),
      });
      const json = await r.json();
      if (!r.ok)
        throw Error(json.message || "Abo konnte nicht angelegt werden.");
      setCartOpen(false);
      setSelectedBox(null);
      setStatus("Dein Demo-Abo wurde gespeichert.");
      go("dashboard");
      await refreshSubs();
    } catch (e) {
      setStatus(e.message);
    } finally {
      setLoading(false);
    }
  }
  async function updateSub(id, next) {
    try {
      let r = await fetch(API + "/subscriptions/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!r.ok) throw Error("Änderung fehlgeschlagen");
      await refreshSubs();
      setStatus("Abo-Status aktualisiert.");
    } catch (e) {
      setStatus(e.message);
    }
  }
  async function deleteSub(id) {
    if (!window.confirm("Dieses Demo-Abo wirklich löschen?")) return;
    try {
      let r = await fetch(API + "/subscriptions/" + id, { method: "DELETE" });
      if (!r.ok) throw Error();
      await refreshSubs();
      setStatus("Demo-Abo gelöscht.");
    } catch {
      setStatus("Löschen fehlgeschlagen.");
    }
  }
  return (
    <div className="app" id="home">
      <header className="header">
        <Logo />
        <nav className={menuOpen ? "nav open" : "nav"}>
          {[
            ["home", "Start"],
            ["boxes", "Die Boxen"],
            ["how", "So funktionierts"],
            ["dashboard", "Mein Abo"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={page === key ? "active" : ""}
              onClick={() => go(key)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="bike-chip"
            onClick={() => setShowInfo(true)}
            aria-label="Motorrad ausw�hlen"
          >
            <Bike size={17} />
            {activeBike
              ? activeBike.brand + " " + activeBike.model
              : "Mein Motorrad"}
            <ChevronDown size={14} />
          </button>
          <button
            className="bag"
            onClick={() => setCartOpen(true)}
            aria-label="Auswahl ansehen"
          >
            <ShoppingBag size={20} />
            {selectedBox && <span className="bag-dot" />}
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Men�"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {page === "home" && (
        <main>
          <section className="hero">
            <div className="hero-copy">
              <h1>
                DEIN BIKE.
                <br />
                <em>DEINE PFLEGE.</em>
              </h1>
              <p>
                Pflegebox auswählen, Motorrad hinterlegen und dein Demo-Abo
                verwalten.
              </p>
              <div className="hero-ctas">
                <button className="btn primary" onClick={() => go("boxes")}>
                  Boxen entdecken <ArrowUpRight size={19} />
                </button>
                <button className="text-link" onClick={() => go("how")}>
                  So funktioniert’s <ArrowRight size={18} />
                </button>
              </div>
              <small className="hero-demo">
                Schulprojekt · Keine Zahlung, kein Versand.
              </small>
            </div>
            <div className="hero-art">
              <MotorcycleArt />
            </div>
          </section>
          <div className="ticker" aria-hidden="true">
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <div className="ticker-group" key={copy}>
                  {["MOTOCARE", "CLEAN IT", "RIDE IT", "MAINTAIN IT", "REPEAT"].map((label) => (
                    <span key={label}>{label}<b>✳</b></span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <section className="section-feature">
            <div className="section-top">
              <h2>Die Boxen</h2>
              <p>Inhalte und Beispielpreise im Überblick.</p>
            </div>
            <div className="cards">
              {allBoxes.map((b) => (
                <ProductCard
                  key={b.id}
                  b={b}
                  onClick={() => {
                    setSelectedBox(b);
                    setCartOpen(true);
                  }}
                />
              ))}
            </div>
          </section>
        </main>
      )}
      {page === "boxes" && (
        <main className="page-main">
          <div className="page-intro">
            <h1>Die Boxen</h1>
            <p>Wähle eine Box und prüfe ihre Inhalte.</p>
          </div>
          <div className="filter-row">
            <div className="filter-buttons">
              {[
                ["ALL", "Alle Boxen"],
                ["WASH", "Wash"],
                ["SERVICE", "Service"],
                ["WINTER", "Winter"],
                ["MYSTERY", "Mystery"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  className={filter === v ? "chosen" : ""}
                  onClick={() => setFilter(v)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="cards listing">
            {visibleBoxes.map((b, i) => (
              <ProductCard
                key={b.id}
                b={b}
                index={i}
                onClick={() => {
                  setSelectedBox(b);
                  setCartOpen(true);
                }}
              />
            ))}
          </div>
          <div className="disclaimer">
            <Info size={21} />
            <div>
              <strong>Servicebox</strong>
              <p>
                Die Servicebox ist gesperrt, solange die Freigaben für Öl und
                Filter fehlen.
              </p>
            </div>
          </div>
        </main>
      )}
      {page === "how" && (
        <main className="page-main how">
          <h1>So funktioniert’s</h1>
          <ol className="how-steps">
            <li>
              <h2>Motorrad auswählen</h2>
              <p>Marke, Modell und Baujahr hinterlegen.</p>
            </li>
            <li>
              <h2>Box zusammenstellen</h2>
              <p>
                Inhalte prüfen, Rhythmus wählen und eine Demo-E-Mail angeben.
              </p>
            </li>
            <li>
              <h2>Abo verwalten</h2>
              <p>
                Unter „Mein Abo“ kannst du dein Abo pausieren, fortsetzen oder
                löschen.
              </p>
            </li>
          </ol>
          <button className="btn primary" onClick={() => go("boxes")}>
            Box auswählen <ArrowRight size={18} />
          </button>
        </main>
      )}
      {page === "dashboard" && (
        <main className="page-main dashboard">
          <h1>Mein Abo</h1>
          <p className="dash-lead">
            Lade deine Demo-Abos mit der verwendeten E-Mail-Adresse.
          </p>
          <div className="dash-panel">
            <div className="dash-head">
              <h3>Deine Abonnements</h3>
              <button className="btn mini" onClick={() => go("boxes")}>
                Neue Box <Plus size={16} />
              </button>
            </div>
            <label className="email-label">
              Demo-E-Mail{" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="refresh-btn" onClick={refreshSubs}>
              <RefreshCw size={16} /> Abos laden
            </button>
            {subs.length === 0 ? (
              <div className="empty">
                <Package size={44} />
                <h4>Noch kein Abo</h4>
                <p>Lade deine Abos oder wähle eine Box aus.</p>
                <button className="btn primary" onClick={() => go("boxes")}>
                  Box auswählen <ArrowUpRight />
                </button>
              </div>
            ) : (
              <div className="sub-list">
                {subs.map((s) => (
                  <div key={s.id} className="sub-row">
                    <div className="sub-symbol">
                      <Package />
                    </div>
                    <div>
                      <strong>{s.boxName || "MOTOCARE Box"}</strong>
                      <small>
                        {s.motorcycleName || "Motorrad"} ·{" "}
                        {s.interval === "MONTHLY"
                          ? "Monatlich"
                          : s.interval === "QUARTERLY"
                            ? "Quartalsweise"
                            : "Nach Bedarf"}
                      </small>
                    </div>
                    <span
                      className={"status " + String(s.status).toLowerCase()}
                    >
                      {s.status === "ACTIVE"
                        ? "Aktiv"
                        : s.status === "PAUSED"
                          ? "Pausiert"
                          : s.status}
                    </span>
                    <div className="sub-actions">
                      {s.status === "ACTIVE" ? (
                        <button
                          onClick={() => updateSub(s.id, "PAUSED")}
                          title="Pausieren"
                        >
                          <PauseCircle />
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSub(s.id, "ACTIVE")}
                          title="Aktivieren"
                        >
                          <PlayCircle />
                        </button>
                      )}
                      <button onClick={() => deleteSub(s.id)} title="Löschen">
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}
      <footer className="footer">
        <Logo />
        <p>
          Schulprojekt · Keine Zahlung, kein Versand. Nur Testdaten verwenden.
        </p>
      </footer>
      {status && (
        <div className="toast" role="status">
          {status}
          <button onClick={() => setStatus("")} aria-label="Schliessen">
            <X size={16} />
          </button>
        </div>
      )}
      {showInfo && (
        <div
          className="overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowInfo(false);
          }}
        >
          <div className="modal-bike">
            <button
              className="close"
              onClick={() => setShowInfo(false)}
              aria-label="Schliessen"
            >
              <X />
            </button>
            <h2>Dein Motorrad</h2>
            <p>Wähle Marke, Modell und Baujahr.</p>
            <label>
              Dein Motorrad
              <select
                value={selectedBike || ""}
                onChange={(e) => setSelectedBike(e.target.value)}
              >
                <option value="">Motorrad auswählen</option>
                {allBikes.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brand} {b.model} ({b.year})
                  </option>
                ))}
              </select>
            </label>
            <button
              className="btn primary full"
              onClick={() => setShowInfo(false)}
              disabled={!selectedBike}
            >
              Auswahl speichern <Check size={17} />
            </button>
          </div>
        </div>
      )}
      {cartOpen && (
        <div
          className="overlay drawer-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCartOpen(false);
          }}
        >
          <aside className="drawer">
            <div className="drawer-head">
              <span>Boxdetails</span>
              <button
                aria-label="Schliessen"
                onClick={() => setCartOpen(false)}
              >
                <X />
              </button>
            </div>
            {selectedBox ? (
              <>
                <div className={"drawer-product " + selectedBox.accent}>
                  <ProductIllustration type={selectedBox.type} />
                </div>
                <div className="drawer-body">
                  <h2>{selectedBox.name}</h2>
                  <p>{selectedBox.details}</p>
                  <div className="drawer-price">
                    {money(selectedBox.price)}{" "}
                    <small>
                      / {selectedBox.interval.toLowerCase()} · Beispielpreis
                    </small>
                  </div>
                  <div className="contents-title">Inhalt</div>
                  {selectedBox.items.map((item) => (
                    <div className="content-item" key={item}>
                      <Check size={17} />
                      {item}
                    </div>
                  ))}
                  <label className="drawer-label">
                    Dein Motorrad
                    <select
                      value={selectedBike || ""}
                      onChange={(e) => setSelectedBike(e.target.value)}
                    >
                      <option value="">Bitte wählen</option>
                      {allBikes.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.brand} {b.model} ({b.year})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="drawer-label">
                    Rhythmus
                    <select
                      value={interval}
                      onChange={(e) => setInterval(e.target.value)}
                    >
                      <option value="MONTHLY">Monatlich</option>
                      <option value="QUARTERLY">Alle 3 Monate</option>
                      <option value="ON_DEMAND">Nach Bedarf</option>
                    </select>
                  </label>
                  <label className="drawer-label">
                    Demo-E-Mail
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  {selectedBox.type === "SERVICE" && (
                    <div className="service-block">
                      <ShieldCheck size={21} /> Noch keine verifizierten
                      Öl-/Filter-Freigaben: Demo-Abo für diese Box deaktiviert.
                    </div>
                  )}
                  <button
                    className="btn primary full"
                    disabled={
                      loading ||
                      !selectedBike ||
                      selectedBox.type === "SERVICE" ||
                      !email.includes("@")
                    }
                    onClick={subscribe}
                  >
                    {loading ? "Speichern …" : "Demo-Abo anlegen"}{" "}
                    <ArrowUpRight size={20} />
                  </button>
                  <small className="demo-fine">
                    Demo ohne echten Checkout, Zahlungsabwicklung oder Versand.
                  </small>
                </div>
              </>
            ) : (
              <div className="empty drawer-empty">
                <ShoppingBag size={42} />
                <h3>Keine Box ausgewählt</h3>
                <p>Entdecke die verfügbaren Pflegeboxen.</p>
                <button className="btn primary" onClick={() => go("boxes")}>
                  Boxen ansehen <ArrowRight />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
function check(r) {
  if (!r.ok) throw Error("API unavailable");
  return r;
}
function ProductCard({ b, onClick }) {
  return (
    <article className="product-card">
      <div className={"product-visual " + b.accent}>
        <div className="product-meta">
          {b.type === "SERVICE" ? <span>Nicht verfügbar</span> : null}
        </div>
        <ProductIllustration type={b.type} />
        <div className="product-visual-bottom">
          <span>Details ansehen</span>
          <button onClick={onClick} aria-label={b.name + " ansehen"}>
            <ArrowUpRight size={22} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <div>
          <h3>{b.name}</h3>
          <p>{b.subtitle}</p>
        </div>
        <div className="product-price">
          {money(b.price)}
          <small>pro Box · Beispielpreis</small>
        </div>
      </div>
    </article>
  );
}
function ProductIllustration({ type }) {
  return (
    <div
      className={"product-set type-" + type.toLowerCase()}
      aria-hidden="true"
    >
      <div className="item item-one">
        <div className="item-label">
          MC
          <small>
            {type === "WASH"
              ? "MOTO WASH"
              : type === "SERVICE"
                ? "ENGINE CARE"
                : type === "WINTER"
                  ? "PROTECT"
                  : "RIDER ESSENTIAL"}
          </small>
        </div>
      </div>
      <div className="item item-two">
        <div className="item-label">
          MC
          <small>
            {type === "WASH"
              ? "CHAIN CLEAN"
              : type === "SERVICE"
                ? "FILTER KIT"
                : type === "WINTER"
                  ? "STORAGE"
                  : "THE EXTRAS"}
          </small>
        </div>
      </div>
      <div className="item item-three">
        <div className="item-label">
          MOTO
          <br />
          CARE<small>ESSENTIALS</small>
        </div>
      </div>
      <div className="product-ground" />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
