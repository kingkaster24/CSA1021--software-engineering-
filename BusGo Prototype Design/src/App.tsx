import { useEffect, useMemo, useState } from "react";

type Screen = "home" | "results" | "seats" | "details" | "payment" | "success";
type IconName =
  | "arrow-left" | "arrow-right" | "bus" | "calendar" | "card" | "check"
  | "chevron" | "filter" | "gift" | "home" | "map-pin" | "minus" | "moon"
  | "plus" | "profile" | "share" | "shield" | "sparkle" | "swap" | "ticket"
  | "trips" | "wallet" | "whatsapp" | "wifi";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-left": <><path d="m15 18-6-6 6-6"/><path d="M9 12h10"/></>,
  "arrow-right": <><path d="m9 18 6-6-6-6"/><path d="M5 12h10"/></>,
  bus: <><path d="M5 17h14V6.5C19 4 16 3 12 3S5 4 5 6.5V17Z"/><path d="M5 11h14M8 7h8"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h3"/></>,
  check: <path d="m6 12 4 4 8-9"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  filter: <><path d="M4 7h16M7 12h10M10 17h4"/><circle cx="8" cy="7" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="12" cy="17" r="1"/></>,
  gift: <><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 13h18M7.5 8C5 8 5 4.5 7 4c2-.5 5 4 5 4s3-4.5 5-4c2 .5 2 4-1 4"/></>,
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  "map-pin": <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  minus: <path d="M7 12h10"/>,
  moon: <path d="M20 15.2A8 8 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z"/>,
  plus: <path d="M12 7v10M7 12h10"/>,
  profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  share: <><circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5M8 13l8 5"/></>,
  shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
  sparkle: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/></>,
  swap: <><path d="m7 7 3-3 3 3M10 4v12"/><path d="m17 17-3 3-3-3M14 20V8"/></>,
  ticket: <><path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V6Z"/><path d="M12 8v2M12 14v2"/></>,
  trips: <><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  wallet: <><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H18v4H6a2 2 0 0 0 0 4h15v7H6a2 2 0 0 1-2-2V6.5Z"/><path d="M16 12v4"/></>,
  whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8c.5 4 3 6 6.5 7"/></>,
  wifi: <><path d="M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0"/><circle cx="12" cy="19" r="1"/></>,
};

function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return <svg aria-hidden="true" focusable="false" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Pressable({ children, onClick, className = "", label, disabled = false, pressed, current, expanded }: { children: React.ReactNode; onClick?: () => void; className?: string; label?: string; disabled?: boolean; pressed?: boolean; current?: "page"; expanded?: boolean }) {
  return <button type="button" className={`pressable ${className}`} onClick={onClick} aria-label={label} disabled={disabled} aria-pressed={pressed} aria-current={current} aria-expanded={expanded}>{children}</button>;
}

function Button({ children, onClick, secondary = false, icon }: { children: React.ReactNode; onClick?: () => void; secondary?: boolean; icon?: IconName }) {
  return <Pressable onClick={onClick} className={`primary-button ${secondary ? "secondary-button" : ""}`}>{children}{icon && <Icon name={icon} />}</Pressable>;
}

function Chip({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return <Pressable onClick={onClick} pressed={active} className={`chip ${active ? "active" : ""}`}>{children}</Pressable>;
}

function TopBar({ title, onBack, action }: { title: React.ReactNode; onBack: () => void; action?: React.ReactNode }) {
  return <div className="topbar glass">
    <Pressable className="icon-button" onClick={onBack} label="Go back"><Icon name="arrow-left" /></Pressable>
    <div className="topbar-title">{title}</div>
    {action ?? <div className="icon-spacer" />}
  </div>;
}

const routes = [
  { from: "Chennai", to: "Bengaluru", time: "6h 15m", price: "₹699", icon: "BLR" },
  { from: "Chennai", to: "Pondicherry", time: "3h 20m", price: "₹399", icon: "PNY" },
  { from: "Chennai", to: "Coimbatore", time: "7h 05m", price: "₹749", icon: "CBE" },
];

function BottomNav({ goHome }: { goHome: () => void }) {
  return <nav className="bottom-nav glass" aria-label="Primary navigation">
    {([["home", "Home"], ["trips", "Trips"], ["gift", "Offers"], ["profile", "Profile"]] as [IconName, string][]).map(([icon, label], i) =>
      <Pressable key={label} label={i === 0 ? label : `${label}, unavailable in this prototype`} disabled={i !== 0} current={i === 0 ? "page" : undefined} className={`nav-item ${i === 0 ? "current" : ""}`} onClick={i === 0 ? goHome : undefined}>
        <Icon name={icon} size={20}/><span>{label}</span>
      </Pressable>
    )}
  </nav>;
}

function DesktopNav({ screen, navigate, dark, setDark }: { screen: Screen; navigate: (screen: Screen) => void; dark: boolean; setDark: (dark: boolean) => void }) {
  const items: { screen: Screen; label: string; icon: IconName }[] = [
    { screen: "home", label: "Plan a trip", icon: "home" },
    { screen: "results", label: "Find buses", icon: "bus" },
    { screen: "seats", label: "Select seats", icon: "ticket" },
    { screen: "details", label: "Passenger details", icon: "profile" },
    { screen: "payment", label: "Payment", icon: "card" },
  ];
  const activeScreen = screen === "success" ? "payment" : screen;
  return <aside className="desktop-sidebar" aria-label="BusGo navigation">
    <Pressable className="desktop-logo" onClick={() => navigate("home")} label="BusGo home">
      <span><Icon name="bus" size={22}/></span><b>BusGo</b>
    </Pressable>
    <div className="desktop-nav-label">BOOKING</div>
    <nav className="desktop-nav-list" aria-label="Booking steps">
      {items.map(item => <Pressable key={item.screen} current={activeScreen === item.screen ? "page" : undefined} className={activeScreen === item.screen ? "active" : ""} onClick={() => navigate(item.screen)}>
        <Icon name={item.icon}/><span>{item.label}</span>{activeScreen === item.screen && <i/>}
      </Pressable>)}
    </nav>
    <div className="desktop-sidebar-bottom">
      <Pressable className="theme-control" pressed={dark} onClick={() => setDark(!dark)}><Icon name={dark ? "sparkle" : "moon"}/><span>{dark ? "Light appearance" : "Dark appearance"}</span></Pressable>
      <div className="desktop-user"><div>AK</div><span><b>Arun Kumar</b><small>View profile</small></span><Icon name="chevron" size={16}/></div>
    </div>
  </aside>;
}

function Home({ navigate, dark, setDark }: { navigate: (s: Screen) => void; dark: boolean; setDark: (v: boolean) => void }) {
  const [swapped, setSwapped] = useState(false);
  const [passengers, setPassengers] = useState(1);
  return <section className="screen home-screen" aria-label="BusGo home">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <div className="home-header">
      <div><div className="eyebrow">BUSGO</div><div className="home-title">Hi Arun <span aria-hidden="true">👋</span><br/>Where are you heading?</div></div>
      <Pressable className="avatar" onClick={() => setDark(!dark)} label="Toggle dark mode">{dark ? <Icon name="sparkle"/> : <Icon name="moon"/>}</Pressable>
    </div>

    <div className="search-card">
      <div className="route-fields">
        <div className="route-line"><div className="route-dot origin"/><div><div className="field-label">FROM</div><div className="field-value">{swapped ? "Bengaluru" : "Chennai"}</div><div className="field-sub">Koyambedu, CMBT</div></div></div>
        <div className="route-divider"/>
        <div className="route-line"><div className="route-dot destination"/><div><div className="field-label">TO</div><div className="field-value">{swapped ? "Chennai" : "Bengaluru"}</div><div className="field-sub">All boarding points</div></div></div>
        <Pressable className={`swap-button ${swapped ? "swapped" : ""}`} onClick={() => setSwapped(!swapped)} label="Swap cities"><Icon name="swap"/></Pressable>
      </div>
      <div className="date-label"><Icon name="calendar" size={17}/> Departure date</div>
      <div className="chips"><Chip active>Today <b>12 Oct</b></Chip><Chip>Tomorrow</Chip><Chip><Icon name="calendar" size={15}/> Pick date</Chip></div>
      <div className="passenger-row">
        <div><div className="field-label">PASSENGERS</div><div className="passenger-copy">{passengers} {passengers === 1 ? "adult" : "adults"}</div></div>
        <div className="stepper" aria-label={`${passengers} passengers`}><Pressable label="Remove one passenger" disabled={passengers === 1} onClick={() => setPassengers(Math.max(1, passengers - 1))}><Icon name="minus" size={16}/></Pressable><b aria-live="polite">{passengers}</b><Pressable label="Add one passenger" onClick={() => setPassengers(passengers + 1)}><Icon name="plus" size={16}/></Pressable></div>
      </div>
    </div>
    <Button onClick={() => navigate("results")} icon="arrow-right">Search Buses</Button>

    <div className="section-head"><div><div className="section-title">Popular routes</div><div className="section-sub">Trips loved by travellers</div></div><span>View all</span></div>
    <div className="route-scroll" aria-label="Popular routes">{routes.map((r, i) => <article className="route-card" key={r.to}>
      <div className={`route-art art-${i}`}><Icon name="bus" size={26}/><span>{r.icon}</span></div>
      <div className="route-city">{r.from} <Icon name="arrow-right" size={15}/> {r.to}</div>
      <div className="route-meta"><span>{r.time}</span><b>from {r.price}</b></div>
    </article>)}</div>
    <div className="trust-card"><div className="trust-icon"><Icon name="shield"/></div><div><b>Your journey, protected</b><span>Free cancellation on select buses</span></div><Icon name="chevron" size={18}/></div>
    <BottomNav goHome={() => navigate("home")}/>
  </section>;
}

const buses = [
  { logo: "I", name: "IntrCity SmartBus", type: "A/C Sleeper (2+1)", depart: "21:30", arrive: "03:45", duration: "6h 15m", rating: "4.8", reviews: "1.2k", old: "₹999", price: "₹750", left: "Only 6 seats left", color: "indigo" },
  { logo: "P", name: "Parveen Travels", type: "Volvo Multi-Axle", depart: "22:15", arrive: "05:00", duration: "6h 45m", rating: "4.6", reviews: "843", old: "₹1,099", price: "₹799", left: "Only 3 seats left", color: "cyan" },
  { logo: "R", name: "Royal Travels", type: "A/C Seater / Sleeper", depart: "23:00", arrive: "06:30", duration: "7h 30m", rating: "4.5", reviews: "637", old: "₹899", price: "₹699", left: "9 seats available", color: "violet" },
];

function BusCard({ bus, select }: { bus: typeof buses[number]; select: () => void }) {
  return <article className="bus-card lift" aria-label={`${bus.name}, ${bus.depart} to ${bus.arrive}, ${bus.price} per seat`}>
    <div className="bus-card-head"><div className={`operator-logo ${bus.color}`}>{bus.logo}</div><div className="operator"><b>{bus.name}</b><span>{bus.type}</span></div><div className="rating"><span>★</span> {bus.rating} <small>({bus.reviews})</small></div></div>
    <div className="amenities"><span><Icon name="wifi" size={14}/> Wi-Fi</span><span>AC</span><span>Charging</span></div>
    <div className="timeline"><div><b>{bus.depart}</b><span>Chennai</span></div><div className="timeline-mid"><span>{bus.duration}</span><div><i/><i className="line"/><Icon name="bus" size={16}/><i className="line"/><i/></div><small>Overnight</small></div><div className="align-right"><b>{bus.arrive}</b><span>Bengaluru</span></div></div>
    <div className="bus-footer"><div><span className={bus.left.startsWith("Only") ? "seats-left" : "seats-ok"}>{bus.left}</span><div className="price"><del>{bus.old}</del><b>{bus.price}</b><small>/ seat</small></div></div><Pressable className="select-button" onClick={select}>Select Seats <Icon name="chevron" size={16}/></Pressable></div>
  </article>;
}

function Skeletons() {
  return <div className="skeleton-list" role="status" aria-live="polite"><span className="sr-only">Loading available buses</span>{[1,2,3].map(i => <div className="skeleton-card" aria-hidden="true" key={i}><div className="sk sk-circle"/><div className="sk-lines"><div className="sk wide"/><div className="sk short"/></div><div className="sk sk-pill"/><div className="sk sk-route"/><div className="sk sk-button"/></div>)}</div>;
}

function Results({ navigate }: { navigate: (s: Screen) => void }) {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<string[]>(["AC"]);
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 850); return () => clearTimeout(timer); }, []);
  const toggle = (f: string) => setFilters(v => v.includes(f) ? v.filter(x => x !== f) : [...v, f]);
  return <section className="screen results-screen" aria-label="Search results">
    <TopBar onBack={() => navigate("home")} title={<><b>Chennai → Bengaluru</b><span>12 Oct · 1 passenger</span></>} action={<Pressable className="icon-button" label="Open filters"><Icon name="filter"/></Pressable>}/>
    <div className="filter-scroll">{["AC", "Sleeper", "Seater", "Under ₹800", "Top Rated"].map(f => <Chip key={f} active={filters.includes(f)} onClick={() => toggle(f)}>{f === "Top Rated" && "★ "}{f}</Chip>)}</div>
    <div className="results-summary"><div><b>24 buses</b><span> sorted by recommended</span></div><Pressable>Sort by <Icon name="chevron" size={14}/></Pressable></div>
    {loading ? <Skeletons/> : <div className="bus-list" aria-live="polite">{buses.map(bus => <BusCard key={bus.name} bus={bus} select={() => navigate("seats")}/>)}</div>}
  </section>;
}

const seatRows = Array.from({ length: 8 }, (_, r) => ["A", "B", "C", "D"].map((letter, c) => ({ id: `${letter}${r + 1}`, state: (r === 1 && c === 0) || (r === 4 && c === 2) ? "ladies" : (r === 0 && c === 2) || (r === 2 && c === 1) || (r === 5 && c > 1) ? "booked" : "available" })));

function Seats({ navigate }: { navigate: (s: Screen) => void }) {
  const [selected, setSelected] = useState(["A1"]);
  const tap = (id: string, state: string) => state !== "booked" && setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  return <section className="screen seats-screen" aria-label="Seat selection">
    <TopBar onBack={() => navigate("results")} title={<><b>Select your seats</b><span>IntrCity SmartBus</span></>}/>
    <div className="mini-trip"><div><b>21:30</b><span>Chennai</span></div><div><span>6h 15m</span><div className="mini-line"><i/><Icon name="bus" size={16}/><i/></div><small>12 Oct</small></div><div className="align-right"><b>03:45</b><span>Bengaluru</span></div></div>
    <div className="seat-legend"><span><i className="available"/>Available</span><span><i className="selected"/>Selected</span><span><i className="booked"/>Booked</span><span><i className="ladies"/>Ladies</span></div>
    <div className="bus-shell">
      <div className="driver-row"><span>FRONT</span><div className="steering">◉</div></div>
      <div className="seat-map" aria-label="Bus seat map">{seatRows.map((row, ri) => <div className="seat-row" key={ri}>{row.map((seat, si) => <div key={seat.id} className={si === 2 ? "aisle-seat" : ""}><Pressable label={`Seat ${seat.id}, ${selected.includes(seat.id) ? "selected" : seat.state}`} pressed={selected.includes(seat.id)} disabled={seat.state === "booked"} className={`seat ${selected.includes(seat.id) ? "selected" : seat.state}`} onClick={() => tap(seat.id, seat.state)}><span aria-hidden="true">{seat.id}</span><i/></Pressable></div>)}</div>)}</div>
    </div>
    <div className="seat-tip"><Icon name="sparkle" size={17}/><span>Tip: Front seats offer a smoother ride</span></div>
    <div className="selection-sheet glass" aria-live="polite"><div className="sheet-handle" aria-hidden="true"/><div className="selected-head"><div><span>SELECTED SEATS</span><div className="seat-chips">{selected.length ? selected.map(s => <b key={s}>{s}</b>) : <em>Tap a seat to select</em>}</div></div><div className="fare"><span>Total fare</span><b>₹{selected.length * 750}</b><small>incl. taxes</small></div></div><Button onClick={() => selected.length && navigate("details")} icon="arrow-right">Continue</Button></div>
  </section>;
}

function Progress({ active }: { active: number }) {
  return <div className="progress">{["Seats", "Details", "Payment"].map((s, i) => <div className={i <= active ? "done" : ""} key={s}><i>{i < active ? <Icon name="check" size={12}/> : i + 1}</i><span>{s}</span>{i < 2 && <b/>}</div>)}</div>;
}

function Field({ label, value, icon, type = "text", autoComplete }: { label: string; value: string; icon?: IconName; type?: React.HTMLInputTypeAttribute; autoComplete?: string }) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return <label className="form-field" htmlFor={id}>{icon && <Icon name={icon}/>}<div><span>{label}</span><input id={id} type={type} autoComplete={autoComplete} defaultValue={value}/></div></label>;
}

function Details({ navigate }: { navigate: (s: Screen) => void }) {
  const [gender, setGender] = useState("Male");
  const [whatsapp, setWhatsapp] = useState(true);
  const [fareOpen, setFareOpen] = useState(false);
  return <section className="screen details-screen" aria-label="Passenger details">
    <TopBar onBack={() => navigate("seats")} title="Passenger details"/>
    <Progress active={1}/>
    <div className="content-pad">
      <div className="form-section"><div className="section-title">Who’s travelling?</div><div className="section-sub">Seat A1 · Primary passenger</div>
        <Field label="FULL NAME" value="Arun Kumar" autoComplete="name"/>
        <div className="two-col"><Field label="AGE" value="28" type="number"/><fieldset className="gender-wrap"><legend>GENDER</legend><div>{["Male", "Female"].map(g => <Pressable key={g} pressed={gender === g} className={gender === g ? "active" : ""} onClick={() => setGender(g)}>{g}</Pressable>)}</div></fieldset></div>
      </div>
      <div className="form-section"><div className="section-title small">Contact details</div><div className="section-sub">Your ticket will be sent here</div><Field label="MOBILE NUMBER" value="+91 98765 43210" type="tel"/><Field label="EMAIL ADDRESS" value="arun.k@email.com" type="email"/></div>
      <Pressable className="whatsapp-row" pressed={whatsapp} onClick={() => setWhatsapp(!whatsapp)}><div className="whatsapp-icon"><Icon name="whatsapp"/></div><div><b>Send ticket on WhatsApp</b><span>Get trip updates and ticket instantly</span></div><div className={`toggle ${whatsapp ? "on" : ""}`} aria-hidden="true"><i/></div></Pressable>
      <div className="fare-breakdown"><Pressable className="fare-title" expanded={fareOpen} label={`${fareOpen ? "Hide" : "Show"} fare breakdown`} onClick={() => setFareOpen(!fareOpen)}><div><Icon name="ticket"/><b>Fare breakdown</b></div><div><b>₹750</b><Icon name="chevron" className={fareOpen ? "rotate" : ""}/></div></Pressable>{fareOpen && <div className="fare-lines"><span>Base fare <b>₹699</b></span><span>Taxes & fees <b>₹51</b></span><span className="fare-total">Total <b>₹750</b></span></div>}</div>
    </div>
    <div className="sticky-action glass"><div><span>TOTAL</span><b>₹750</b></div><Button onClick={() => navigate("payment")} icon="arrow-right">Proceed to Pay</Button></div>
  </section>;
}

const paymentMethods = [
  { id: "upi", mark: "UPI", title: "UPI", sub: "Google Pay, PhonePe, Paytm" },
  { id: "card", mark: "▰", title: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
  { id: "bank", mark: "⌂", title: "Net Banking", sub: "All major banks" },
  { id: "wallet", mark: "W", title: "Wallet", sub: "Amazon Pay, MobiKwik" },
];

function Payment({ navigate }: { navigate: (s: Screen) => void }) {
  const [method, setMethod] = useState("upi");
  const [promo, setPromo] = useState(false);
  const [sliding, setSliding] = useState(false);
  const pay = () => { setSliding(true); setTimeout(() => navigate("success"), 550); };
  return <section className="screen payment-screen" aria-label="Payment">
    <TopBar onBack={() => navigate("details")} title="Payment"/>
    <Progress active={2}/>
    <div className="content-pad">
      <div className="order-card"><div className="order-icon"><Icon name="bus"/></div><div><span>CHENNAI → BENGALURU</span><b>IntrCity SmartBus</b><small>12 Oct · 21:30 · Seat A1</small></div><div><span>TOTAL</span><b>₹750</b></div></div>
      <div className="section-title small">Choose payment method</div>
      <fieldset className="payment-list"><legend className="sr-only">Payment method</legend>{paymentMethods.map(p => <Pressable key={p.id} pressed={method === p.id} className={`payment-tile ${method === p.id ? "active" : ""}`} onClick={() => setMethod(p.id)}><div className={`payment-logo ${p.id}`}>{p.mark}</div><div><b>{p.title}</b><span>{p.sub}</span></div><i aria-hidden="true">{method === p.id && <Icon name="check" size={13}/>}</i></Pressable>)}</fieldset>
      <div className={`promo-card ${promo ? "applied" : ""}`}><Icon name={promo ? "check" : "gift"}/><div><span>{promo ? "BUSGO100 applied" : "Have a promo code?"}</span><b>{promo ? "You saved ₹100" : "Enter code"}</b></div><Pressable onClick={() => setPromo(!promo)}>{promo ? "Remove" : "Apply"}</Pressable></div>
      <div className="secure-copy"><Icon name="shield" size={16}/> 100% secure payments · Your data is encrypted</div>
    </div>
    <div className="pay-sheet glass"><div className="pay-total"><span>Total payable</span><div><del>{promo && "₹750"}</del><b>₹{promo ? "650" : "750"}</b></div></div><Pressable className={`slide-pay ${sliding ? "complete" : ""}`} onClick={pay}><div className="slider-knob"><Icon name={sliding ? "check" : "arrow-right"}/></div><span>{sliding ? "Payment secure" : `Slide to pay ₹${promo ? "650" : "750"}`}</span><div className="slide-arrows">›››</div></Pressable></div>
  </section>;
}

function QRCode() {
  const cells = useMemo(() => Array.from({length: 81}, (_, i) => ((i * 7 + i % 4 + Math.floor(i / 9)) % 3) !== 0), []);
  return <div className="qr" role="img" aria-label="Booking ticket QR code">{cells.map((on, i) => <i aria-hidden="true" key={i} className={on ? "on" : ""}/>)}</div>;
}

function Success({ navigate }: { navigate: (s: Screen) => void }) {
  return <section className="screen success-screen" aria-label="Booking confirmed" role="status">
    <div className="confetti" aria-hidden="true">{Array.from({length: 18}, (_, i) => <i key={i} style={{"--i": i} as React.CSSProperties}/>)}</div>
    <div className="success-head"><div className="success-check"><Icon name="check" size={38}/><span/></div><div className="success-title">You’re all set!</div><div className="success-sub">Your trip to Bengaluru is confirmed</div></div>
    <div className="ticket-card">
      <div className="ticket-top"><div className="ticket-brand"><div><Icon name="bus" size={18}/></div><b>BusGo</b></div><div className="confirmed"><Icon name="check" size={13}/> CONFIRMED</div></div>
      <div className="ticket-route"><div><span>CHENNAI</span><b>21:30</b><small>12 Oct 2025</small></div><div className="ticket-journey"><span>6h 15m</span><div><i/><Icon name="bus"/><i/></div><small>Overnight</small></div><div className="align-right"><span>BENGALURU</span><b>03:45</b><small>13 Oct 2025</small></div></div>
      <div className="ticket-dash"><i/><i/></div>
      <div className="ticket-info"><div><span>PASSENGER</span><b>Arun Kumar</b></div><div><span>SEAT</span><b>A1</b></div><div><span>BOOKING ID</span><b>BG8X24</b></div></div>
      <div className="ticket-dash"><i/><i/></div>
      <div className="ticket-bottom"><QRCode/><div><span>BOARDING POINT</span><b>Koyambedu, CMBT</b><small>Report by 21:00 · Platform 7</small><div className="operator-note"><Icon name="bus" size={15}/> IntrCity SmartBus · KA 01 AB 2345</div></div></div>
    </div>
    <div className="success-actions"><Button secondary icon="wallet">Add to Wallet</Button><Pressable className="share-button"><Icon name="share"/> Share</Pressable></div>
    <Pressable className="back-home" onClick={() => navigate("home")}><Icon name="home" size={18}/> Back to Home</Pressable>
    <div className="success-note"><Icon name="shield" size={15}/> Ticket sent to WhatsApp and email</div>
  </section>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [dark, setDark] = useState(false);
  const navigate = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <main className={dark ? "dark" : ""} id="main-content">
    <DesktopNav screen={screen} navigate={navigate} dark={dark} setDark={setDark}/>
    <div className="app-frame">
      {screen === "home" && <Home navigate={navigate} dark={dark} setDark={setDark}/>}
      {screen === "results" && <Results navigate={navigate}/>}
      {screen === "seats" && <Seats navigate={navigate}/>}
      {screen === "details" && <Details navigate={navigate}/>}
      {screen === "payment" && <Payment navigate={navigate}/>}
      {screen === "success" && <Success navigate={navigate}/>}
    </div>
  </main>;
}
