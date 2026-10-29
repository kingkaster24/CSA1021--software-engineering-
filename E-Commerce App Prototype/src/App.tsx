import { useState } from "react";

type Variant = "A" | "B" | "C";
type Screen = "home" | "product" | "cart" | "checkout" | "success" | "profile";

const variantInfo = {
  A: { name: "Minimal Clean", note: "Calm, premium, product-first", accent: "Violet" },
  B: { name: "Bold & Visual", note: "Immersive, expressive, energetic", accent: "Electric" },
  C: { name: "Content-Rich", note: "Efficient, discoverable, deal-led", accent: "Orange" },
};

const products = [
  { name: "Cloud Runner", price: "$148", tint: "lavender", tag: "Bestseller" },
  { name: "Arc Trainer", price: "$126", tint: "peach", tag: "New" },
  { name: "Motion 03", price: "$164", tint: "mint", tag: "-20%" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z"/>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    filter: <><path d="M4 6h16M7 12h10M10 18h4"/></>,
    star: <path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.2 6-.9L12 3Z"/>,
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function Shoe({ small = false }: { small?: boolean }) {
  return <div className={`shoe ${small ? "small" : ""}`}><div className="sole"/><div className="body"/><i/><i/><i/></div>;
}

function Header({ title, back, onBack, cart = 0 }: { title?: string; back?: boolean; onBack?: () => void; cart?: number }) {
  return <header className="header">
    {back ? <button className="iconBtn" onClick={onBack} aria-label="Go back"><Icon name="back"/></button> : <button className="avatar" aria-label="Open profile">AM</button>}
    <div className="headerTitle">{title || <><span>MONO</span> Market</>}</div>
    <button className="iconBtn cartBtn" aria-label="Cart"><Icon name="bag"/>{cart > 0 && <b>{cart}</b>}</button>
  </header>;
}

function Nav({ screen, go }: { screen: Screen; go: (s: Screen) => void }) {
  return <nav className="tabbar">
    {(["home", "search", "heart", "bag", "user"] as const).map((x, i) => {
      const target: Screen = i === 3 ? "cart" : i === 4 ? "profile" : "home";
      const active = screen === target || (screen === "product" && i === 1);
      return <button key={x} className={active ? "active" : ""} onClick={() => go(target)} aria-label={x}><Icon name={x}/>{i === 0 && <span>Shop</span>}</button>;
    })}
  </nav>;
}

function Home({ go, cart }: { go: (s: Screen) => void; cart: number }) {
  return <div className="screen home">
    <Header cart={cart}/>
    <div className="greeting"><p>Good morning, Ava</p><h1>Find your next favorite.</h1></div>
    <button className="search"><Icon name="search"/><span>Search 2,000+ styles</span><kbd>⌘ K</kbd></button>
    <section className="hero" onClick={() => go("product")}>
      <div className="heroCopy"><span className="eyebrow">NEW SEASON · 25% OFF</span><h2>Move like<br/>you mean it.</h2><button className="roundArrow" aria-label="Shop collection"><Icon name="arrow"/></button></div>
      <div className="floatShape"/><Shoe/>
      <div className="pager"><b/> <i/> <i/></div>
    </section>
    <div className="sectionHead"><h3>Shop by category</h3><button>View all</button></div>
    <div className="categories">{["Run","Train","Hike","Daily"].map((x,i)=><button key={x}><span className={`catIcon c${i}`}><Shoe small/></span><b>{x}</b></button>)}</div>
    <div className="sectionHead"><h3>{/* changes by CSS */}<span className="featured">Featured</span><span className="trending">Trending now</span></h3><button>View all</button></div>
    <div className="productRow">{products.map((p,i)=><div className="productCard" key={p.name} role="button" tabIndex={0} onClick={() => go("product")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") go("product") }}><span className="productImg"><em>{p.tag}</em><button className="heartBtn" aria-label="Add to wishlist" onClick={(event) => event.stopPropagation()}><Icon name="heart"/></button><Shoe small/></span><span className="productMeta"><b>{p.name}</b><small>Performance · Unisex</small><strong>{p.price}</strong></span>{i===0 && <span className="rating"><Icon name="star"/>4.9</span>}</div>)}</div>
    <Nav screen="home" go={go}/>
  </div>;
}

function Product({ go, add }: { go: (s: Screen) => void; add: () => void }) {
  const [color, setColor] = useState(0);
  const [size, setSize] = useState("9");
  const [liked, setLiked] = useState(false);
  return <div className="screen product">
    <Header title="Product detail" back onBack={() => go("home")}/>
    <div className={`viewer color${color}`}><span className="pill">360° VIEW · DRAG TO ROTATE</span><Shoe/><button className={`love ${liked ? "liked":""}`} onClick={()=>setLiked(!liked)} aria-label="Wishlist"><Icon name="heart"/></button><div className="viewerDots"><b/><i/><i/><i/></div></div>
    <main className="detail">
      <div className="brand">MONO PERFORMANCE <span><Icon name="star"/> 4.9 (128)</span></div>
      <h1>Cloud Runner 02</h1><div className="price">$148 <del>$184</del></div>
      <p>Weightless cushioning meets responsive energy return. Built for everyday miles.</p>
      <div className="chooser"><b>Color <span>Moon Violet</span></b><div>{["violet","dark","cream","blue"].map((x,i)=><button aria-label={x} className={`${x} ${color===i?"selected":""}`} onClick={()=>setColor(i)} key={x}/>)}</div></div>
      <div className="sizeHead"><b>Select size</b><button>Size guide</button></div>
      <div className="sizes">{["7","8","9","10","11"].map(x=><button className={size===x?"selected":""} onClick={()=>setSize(x)} key={x}>{x}</button>)}</div>
      <div className="delivery"><Icon name="bag"/><span><b>Free delivery by Friday</b><small>Free returns within 30 days</small></span></div>
    </main>
    <div className="stickyCta"><button className="secondary"><Icon name="heart"/></button><button className="primary" onClick={()=>{add();go("cart")}}>Add to cart <span>$148</span></button></div>
  </div>;
}

function Cart({ go, count, setCount }: { go:(s:Screen)=>void; count:number; setCount:(n:number)=>void }) {
  return <div className="screen cart">
    <Header title={`Your cart (${count})`} back onBack={()=>go("product")}/>
    <main>
      <div className="cartItem"><div className="cartPic"><Shoe small/></div><div className="cartCopy"><b>Cloud Runner 02</b><small>Moon Violet · Size 9</small><strong>$148</strong><div className="stepper"><button onClick={()=>setCount(Math.max(1,count-1))}>−</button><span>{count}</span><button onClick={()=>setCount(count+1)}>+</button></div></div><button className="remove" onClick={()=>setCount(0)}>Remove</button></div>
      <div className="benefit"><Icon name="check"/><span><b>You've unlocked free shipping</b><small>Your order ships carbon neutral</small></span></div>
      <div className="promo"><span>Promo code</span><button>Apply</button></div>
      <section className="summary"><h2>Order summary</h2><p><span>Subtotal</span><b>${148*count}.00</b></p><p><span>Shipping</span><b className="success">Free</b></p><p><span>Tax</span><b>$12.58</b></p><hr/><p className="total"><span>Total</span><b>${148*count+12.58}</b></p></section>
    </main>
    <div className="stickyCta"><button className="primary full" onClick={()=>go("checkout")}>Secure checkout <Icon name="arrow"/></button></div>
  </div>;
}

function Checkout({ go }: { go:(s:Screen)=>void }) {
  const [payment,setPayment]=useState("card");
  return <div className="screen checkout">
    <Header title="Checkout" back onBack={()=>go("cart")}/>
    <div className="steps"><b>1</b><i/><b>2</b><i/><b>3</b></div>
    <main>
      <h2>Delivery address</h2><button className="selectCard"><span className="radio active"/><span><b>Ava Morgan</b><small>42 Mercer Street, Apt 4B<br/>New York, NY 10013</small></span><em>Edit</em></button>
      <h2>Payment method</h2>
      <button className="selectCard" onClick={()=>setPayment("card")}><span className={`radio ${payment==="card"?"active":""}`}/><span><b>•••• 4242</b><small>Visa · Expires 08/28</small></span><em>VISA</em></button>
      <button className="selectCard compact" onClick={()=>setPayment("apple")}><span className={`radio ${payment==="apple"?"active":""}`}/><span><b>Pay</b><small>Apple Pay</small></span></button>
      <h2>Order review</h2><div className="review"><div><Shoe small/></div><span><b>Cloud Runner 02</b><small>Moon Violet · Size 9 · Qty 1</small></span><strong>$148</strong></div>
      <div className="checkoutTotal"><span>Total</span><b>$160.58</b></div>
    </main>
    <div className="stickyCta"><button className="primary full" onClick={()=>go("success")}><Icon name="check"/> Place order · $160.58</button></div>
  </div>;
}

function Success({ go }: { go:(s:Screen)=>void }) {
  return <div className="screen successScreen"><div className="confetti">{Array.from({length:18},(_,i)=><i key={i}/>)}</div><div className="successMark"><Icon name="check"/></div><span className="eyebrow">ORDER #M02841</span><h1>You're all set.</h1><p>Your Cloud Runners are getting ready.<br/>We'll notify you when they ship.</p><div className="trackCard"><div className="trackTop"><span><small>ESTIMATED DELIVERY</small><b>Friday, May 24</b></span><Icon name="bag"/></div><div className="trackLine"><b/><i/><i/></div><div className="labels"><b>Confirmed</b><span>Shipped</span><span>Delivered</span></div></div><button className="primary" onClick={()=>go("home")}>Track your order <Icon name="arrow"/></button><button className="textBtn" onClick={()=>go("home")}>Continue shopping</button></div>;
}

function Profile({go}:{go:(s:Screen)=>void}) {
  return <div className="screen profile"><Header title="Your space" back onBack={()=>go("home")}/><main><div className="bigAvatar">AM</div><h1>Ava Morgan</h1><p>Mono member since 2023</p><div className="statRow"><div><b>12</b><span>Orders</span></div><div><b>8</b><span>Wishlist</span></div><div><b>2,480</b><span>Points</span></div></div>{["Orders & tracking","Wishlist","Addresses","Payment methods","Notifications"].map(x=><button className="menu" key={x}><span>{x}</span><Icon name="arrow"/></button>)}</main><Nav screen="profile" go={go}/></div>
}

export default function App() {
  const [variant,setVariant]=useState<Variant>("A");
  const [screen,setScreen]=useState<Screen>("home");
  const [cart,setCart]=useState(0);
  const [rating,setRating]=useState(4);
  const flow: Record<Screen,React.ReactNode> = {
    home:<Home go={setScreen} cart={cart}/>, product:<Product go={setScreen} add={()=>setCart(cart+1)}/>,
    cart:<Cart go={setScreen} count={cart||1} setCount={setCart}/>, checkout:<Checkout go={setScreen}/>,
    success:<Success go={setScreen}/>, profile:<Profile go={setScreen}/>
  };
  return <div className={`app variant${variant}`}>
    <aside className="stakeholder">
      <span className="brandMark">MONO / CONCEPT STUDY</span>
      <h1>One experience.<br/><em>Three directions.</em></h1>
      <p>Explore the same commerce flow through three distinct visual strategies.</p>
      <div className="variantPicker">{(["A","B","C"] as Variant[]).map(v=><button className={variant===v?"active":""} onClick={()=>{setVariant(v);setScreen("home")}} key={v}><b>{v}</b><span>{variantInfo[v].name}<small>{variantInfo[v].note}</small></span><i/></button>)}</div>
      <section className="rationale"><div><span>Direction {variant}</span><b>{variantInfo[variant].name}</b></div><p>{variant==="A"?"A refined editorial system uses restraint and whitespace to elevate the product.":variant==="B"?"An immersive dark canvas creates energy through neon color, depth and oversized product moments.":"A high-utility storefront maximizes discovery with deals, categories and personalized content."}</p><div className="pros"><b>Best for</b><span>{variant==="A"?"Premium positioning · Focus":variant==="B"?"Brand impact · Gen Z":"Conversion · Assortment"}</span></div></section>
      <section className="feedback"><div><span>Stakeholder vote</span><b>{rating}/5</b></div><div className="stars">{[1,2,3,4,5].map(n=><button className={n<=rating?"on":""} onClick={()=>setRating(n)} key={n}><Icon name="star"/></button>)}</div><textarea aria-label="Feedback" placeholder="Add a note for this direction…"/><div className="approve"><button>Request changes</button><button><Icon name="check"/> Approve</button></div></section>
    </aside>
    <main className="stage"><div className="stageTop"><span>INTERACTIVE PROTOTYPE</span><div>{["home","product","cart","checkout","success"].map((s,i)=><button className={screen===s?"active":""} onClick={()=>setScreen(s as Screen)} key={s}>{i+1}</button>)}</div></div><div className="phone"><div className="dynamicIsland"/>{flow[screen]}</div><p className="hint">Click through the flow · Switch directions at any time</p></main>
  </div>;
}
