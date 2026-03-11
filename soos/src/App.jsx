import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from './storage/commentsSlice';
import './App.css';

// Import images
import productImg from './assets/images/1.png';
import model1 from './assets/images/models/model1.jpg';
import model2 from './assets/images/models/model2.jpg';

const translations = {
  en: {
    home: "Home",
    howTo: "How to use",
    ingredients: "Ingredients",
    reviews: "Reviews",
    shopNow: "Shop Now",
    backToSite: "Back to Site",
    heroTitle: "Natural Glow",
    heroSub: "Reinvented.",
    heroDesc: "Experience the luxury of \"SOS\" hair care. Infused with botanical extracts for a radiant, healthy shine that starts from within.",
    purity: "The Purity",
    nature: "of Nature",
    purityDesc: "Carefully crafted with the finest botanical ingredients, \"SOS\" provides deep nourishment for your hair, restoring its natural strength and luster without harsh chemicals.",
    ritual: "Ritual of",
    beauty: "Beauty",
    ritualDesc: "Transform your hair care routine into a moment of pure indulgence with our simple three-step process.",
    results: "Real",
    glow: "Results",
    shipping: "Shipping",
    info: "Information",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Telephone",
    quantity: "Quantity",
    city: "City (Ville)",
    country: "Country",
    address: "Full Shipping Address",
    placeOrder: "Place the order",
    summary: "Order Summary",
    total: "Total Price",
    success: "Commandé avec Succès",
    successDesc: "Your journey to radiant hair has begun.",
    arArgan: "Organic Argan Oil",
    arArganDesc: "Rich in Vitamin E and essential fatty acids to hydrate and soften.",
    silk: "Silk Proteins",
    silkDesc: "Strengthens the hair shaft and prevents breakage for a smooth finish.",
    aloe: "Aloe Vera Extract",
    aloeDesc: "Soothes the scalp and promotes healthy hair growth from the roots.",
    step1: "Cleansing",
    step1Desc: "Apply to wet hair and massage gently into the scalp to release botanical actives.",
    step2: "Nourishing",
    step2Desc: "Leave for 3-5 minutes to allow silk proteins and argan oil to penetrate deeply.",
    step3: "Revealing",
    step3Desc: "Rinse thoroughly with cool water to seal the cuticles and reveal mirror-like shine."
  },
  fr: {
    home: "Accueil",
    howTo: "Utilisation",
    ingredients: "Ingrédients",
    reviews: "Avis",
    shopNow: "Acheter",
    backToSite: "Retour",
    heroTitle: "Éclat Naturel",
    heroSub: "Réinventé.",
    heroDesc: "Découvrez le luxe des soins capillaires \"SOS\". Infusé d'extraits botaniques pour une brillance éclatante et saine dès l'intérieur.",
    purity: "La Pureté",
    nature: "de la Nature",
    purityDesc: "Soigneusement élaboré avec les meilleurs ingrédients botaniques, \"SOS\" nourrit vos cheveux en profondeur, restaurant leur force et leur éclat.",
    ritual: "Rituel de",
    beauty: "Beauté",
    ritualDesc: "Transformez votre routine capillaire en un moment d'indulgence pure avec notre processus simple en trois étapes.",
    results: "Vrais",
    glow: "Résultats",
    shipping: "Informations",
    info: "de Livraison",
    fullName: "Nom Complet",
    email: "Adresse Email",
    phone: "Téléphone",
    quantity: "Quantité",
    city: "Ville",
    country: "Pays",
    address: "Adresse de Livraison",
    placeOrder: "Passer la commande",
    summary: "Résumé de la Commande",
    total: "Prix Total",
    success: "Commandé avec Succès",
    successDesc: "Votre voyage vers des cheveux éclatants a commencé.",
    arArgan: "Huile d'Argan Bio",
    arArganDesc: "Riche en vitamine E et acides gras essentiels pour hydrater et adoucir.",
    silk: "Protéines de Soie",
    silkDesc: "Renforce la tige capillaire et prévient la casse pour une finition lisse.",
    aloe: "Extrait d'Aloe Vera",
    aloeDesc: "Apaise le cuir chevelu et favorise la croissance saine des cheveux.",
    step1: "Nettoyage",
    step1Desc: "Appliquer sur cheveux mouillés et masser doucement pour libérer les actifs.",
    step2: "Nutrition",
    step2Desc: "Laisser agir 3 à 5 minutes pour permettre aux protéines de soie de pénétrer.",
    step3: "Révélation",
    step3Desc: "Rincer abondamment à l'eau fraîche pour sceller les cuticules."
  },
  ar: {
    home: "الرئيسية",
    howTo: "طريقة الاستخدام",
    ingredients: "المكونات",
    reviews: "التقييمات",
    shopNow: "تسوق الآن",
    backToSite: "العودة للموقع",
    heroTitle: "تألق طبيعي",
    heroSub: "مبتكر",
    heroDesc: "اختبري رفاهية العناية بالشعر مع \"SOS\". غني بالمستخلصات النباتية للحصول على لمعان مشرق وصحي يبدأ من الداخل.",
    purity: "نقاء",
    nature: "الطبيعة",
    purityDesc: "تم تصنيعه بعناية من أفضل المكونات النباتية، يوفر \"SOS\" تغذية عميقة لشعرك، ويعيد له قوته الطبيعية وبريقه.",
    ritual: "طقوس",
    beauty: "الجمال",
    ritualDesc: "حولي روتين العناية بشعرك إلى لحظة من الدلال المطلق من خلال عمليتنا البسيطة المكونة من ثلاث خطوات.",
    results: "نتائج",
    glow: "حقيقية",
    shipping: "معلومات",
    info: "الشحن",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    quantity: "الكمية",
    city: "المدينة",
    country: "البلد",
    address: "عنوان الشحن",
    placeOrder: "إتمام الطلب",
    summary: "ملخص الطلب",
    total: "السعر الإجمالي",
    success: "تم الطلب بنجاح",
    successDesc: "لقد بدأت رحلتك نحو شعر متألق.",
    arArgan: "زيت الأرغان العضوي",
    arArganDesc: "غني بفيتامين E والأحماض الدهنية الأساسية للترطيب والتنعيم.",
    silk: "بروتينات الحرير",
    silkDesc: "يقوي جذع الشعرة ويمنع تكسرها للحصول على ملمس ناعم.",
    aloe: "خلاصة الألوفيرا",
    aloeDesc: "يهدئ فروة الرأس ويعزز نمو الشعر الصحي من الجذور.",
    step1: "التنظيف",
    step1Desc: "يوضع على الشعر المبلل ويدلك بلطف لتحفيز المواد النباتية الفعالة.",
    step2: "التغذية",
    step2Desc: "يترك لمدة 3-5 دقائق للسماح لبروتينات الحرير وزيت الأرغان بالتغلغل بعمق.",
    step3: "الكشف",
    step3Desc: "يشطف جيداً بالماء البارد لإغلاق مسام الشعر والكشف عن لمعان كالمرايا."
  }
};

function App() {
  const [view, setView] = useState('landing');
  const [lang, setLang] = useState('en'); // 'en', 'fr', 'ar'
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    phone: '',
    ville: '',
    country: '',
    address: '',
    quantity: 1
  });
  const [newComment, setNewComment] = useState({ content: '', stars: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  const t = translations[lang];

  const toggleLanguage = () => {
    const langs = ['en', 'ar', 'fr'];
    const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Show WhatsApp button when user scrolls to 60% of page
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      setShowWhatsApp(scrolled / total > 0.6);

      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view, lang]);

  const handleOrderCompletion = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setView('landing');
      setOrderData({ name: '', email: '', phone: '', ville: '', country: '', address: '', quantity: 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  };

  const SHEETS_API = 'https://script.google.com/macros/s/AKfycbyd_J8l3y254bBBSYWLgN_UBxTCKulmvbQqlPJnMsFmS2pLsuKTyL_f6ZT8eO8mUJOx/exec';

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const params = new URLSearchParams({
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        ville: orderData.ville,
        country: orderData.country,
        address: orderData.address,
        quantity: orderData.quantity,
        totalPrice: orderData.quantity * 25
      });
      await fetch(`${SHEETS_API}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });
      setShowCommentModal(true);
    } catch (err) {
      console.error('Erreur envoi commande:', err);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitComment = () => {
    if (newComment.content.trim()) {
      dispatch(addComment({
        author: orderData.name || 'Anonymous',
        role: 'Verified Customer',
        content: newComment.content,
        stars: newComment.stars
      }));
    }
    setShowCommentModal(false);
    setNewComment({ content: '', stars: 5 });
    handleOrderCompletion();
  };

  const handleSkipComment = () => {
    setShowCommentModal(false);
    handleOrderCompletion();
  };

  const handleGoHome = (e) => {
    if (e) e.preventDefault();
    setView('landing');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app ${lang === 'ar' ? 'rtl' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navbar - Persistent */}
      <nav className={`navbar ${isScrolled || view === 'checkout' ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="container nav-content">
          <div className="nav-links left hidden lg:flex">
            <a href="#" onClick={handleGoHome}>{t.home}</a>
            {view === 'landing' && <a href="#how-to">{t.howTo}</a>}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className={`line ${mobileMenuOpen ? 'active' : ''}`}></div>
              <div className={`line ${mobileMenuOpen ? 'active' : ''}`}></div>
              <div className={`line ${mobileMenuOpen ? 'active' : ''}`}></div>
            </button>
          </div>

          <div className="brand-logo" onClick={handleGoHome} style={{ cursor: 'pointer' }}>SOS</div>

          <div className="nav-links right hidden lg:flex">
            {view === 'landing' ? (
              <>
                <a href="#ingredients">{t.ingredients}</a>
                <a href="#testimonials">{t.reviews}</a>
                <div className="lang-toggle" onClick={toggleLanguage}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                  </svg>
                  <span>{lang.toUpperCase()}</span>
                </div>
                <button className="nav-btn" onClick={() => setView('checkout')}>{t.shopNow}</button>
              </>
            ) : (
              <button className="nav-btn" onClick={() => setView('landing')}>{t.backToSite}</button>
            )}
          </div>

          {/* Mobile Shop Now Button (Visible only on mobile navbar) */}
          <div className="lg:hidden">
            <button className="nav-btn-mobile" onClick={() => setView('checkout')}>
              {t.shopNow}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <a href="#" onClick={handleGoHome}>{t.home}</a>
            {view === 'landing' ? (
              <>
                <a href="#how-to" onClick={() => setMobileMenuOpen(false)}>{t.howTo}</a>
                <a href="#ingredients" onClick={() => setMobileMenuOpen(false)}>{t.ingredients}</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>{t.reviews}</a>
                <div className="mobile-lang-switch">
                  <span>Language:</span>
                  <div className="lang-toggle" onClick={toggleLanguage}>
                    <span>{lang.toUpperCase()}</span>
                  </div>
                </div>
                <button className="btn btn-primary w-full" onClick={() => { setView('checkout'); setMobileMenuOpen(false); }}>
                  {t.shopNow}
                </button>
              </>
            ) : (
              <button className="btn btn-primary w-full" onClick={() => { setView('landing'); setMobileMenuOpen(false); }}>
                {t.backToSite}
              </button>
            )}
          </div>
        </div>
      </nav>

      {view === 'landing' ? (
        <>
          {/* Hero Section */}
          <header className="hero">
            <div className="hero-bg-text">SOS</div>
            <div className="container hero-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="hero-content">
                <h1 className="hero-title reveal">
                  {t.heroTitle} <br />
                  <span>{t.heroSub}</span>
                </h1>
                <p className="hero-subtitle reveal">
                  {t.heroDesc}
                </p>
                <div className="hero-actions reveal">
                  <button className="btn btn-primary" onClick={() => setView('checkout')}>{t.shopNow}</button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="model-wrapper reveal">
                  <img src={model1} alt="Natural Beauty" className="hero-model" />
                </div>
                <div className="product-wrapper reveal">
                  <img src={productImg} alt="SOS Product" className="hero-product" />
                </div>
              </div>
            </div>
          </header>

          <main>
            {/* Product Description & Ingredients */}
            <section id="ingredients" className="section ingredients-section">
              <div className="container">
                <div className="ingredients-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="ingredients-info reveal">
                    <h2 className="section-title">{t.purity} <br /><span>{t.nature}</span></h2>
                    <p className="section-subtitle">
                      {t.purityDesc}
                    </p>

                    <div className="ingredient-list">
                      <div className="ingredient-item">
                        <h3>{t.arArgan}</h3>
                        <p>{t.arArganDesc}</p>
                      </div>
                      <div className="ingredient-item">
                        <h3>{t.silk}</h3>
                        <p>{t.silkDesc}</p>
                      </div>
                      <div className="ingredient-item">
                        <h3>{t.aloe}</h3>
                        <p>{t.aloeDesc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ingredients-visual reveal">
                    <div className="ingredients-model-card">
                      <img src={model2} alt="Skincare Model" className="ingredients-model" />
                      <div className="floating-badge">100% Organic</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use Section */}
            <section id="how-to" className="section how-to-section">
              <div className="container">
                <div className="text-center reveal">
                  <h2 className="section-title text-5xl md:text-6xl lg:text-8xl">{t.ritual} <span>{t.beauty}</span></h2>
                  <p className="section-subtitle centered text-xl md:text-2xl">{t.ritualDesc}</p>
                </div>

                <div className="steps-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="step-card reveal">
                    <div className="step-number">01</div>
                    <h3>{t.step1}</h3>
                    <p>{t.step1Desc}</p>
                  </div>
                  <div className="step-card reveal">
                    <div className="step-number">02</div>
                    <h3>{t.step2}</h3>
                    <p>{t.step2Desc}</p>
                  </div>
                  <div className="step-card reveal">
                    <div className="step-number">03</div>
                    <h3>{t.step3}</h3>
                    <p>{t.step3Desc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="section testimonials-section">
              <div className="container">
                <div className="text-center reveal mb-12">
                  <h2 className="section-title text-4xl md:text-5xl lg:text-7xl">{t.results} <span>{t.glow}</span></h2>
                </div>
                <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {comments.slice(-4).reverse().map((comment) => (
                    <div key={comment.id} className="testimonial-card-simple reveal">
                      <div className="testimonial-header">
                        <div className="user-avatar">{getInitial(comment.author)}</div>
                        <div className="testimonial-author">
                          <strong>{comment.author}</strong>
                          <span>{comment.role}</span>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <div className="stars">{'★'.repeat(comment.stars)}{'☆'.repeat(5 - comment.stars)}</div>
                        <p>"{comment.content}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        /* Checkout Page View */
        <div className="checkout-page section">
          <div className="container">
            <div className="checkout-grid reveal active">
              <div className="checkout-form-container">
                <h2 className="section-title">{t.shipping} <span>{t.info}</span></h2>
                <p className="section-subtitle">Complete your details to enjoy the SOS experience.</p>

                <form onSubmit={handlePlaceOrder} className="premium-order-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.fullName}</label>
                      <input
                        type="text"
                        required
                        value={orderData.name}
                        onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                        placeholder="Sarah Johnson"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.email}</label>
                      <input
                        type="email"
                        required
                        value={orderData.email}
                        onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                        placeholder="sarah@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.phone}</label>
                      <input
                        type="tel"
                        required
                        value={orderData.phone}
                        onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                        placeholder="+212 600 000 000"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.quantity}</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={orderData.quantity}
                        onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.city}</label>
                      <input
                        type="text"
                        required
                        value={orderData.ville}
                        onChange={(e) => setOrderData({ ...orderData, ville: e.target.value })}
                        placeholder="Casablanca"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.country}</label>
                      <input
                        type="text"
                        required
                        value={orderData.country}
                        onChange={(e) => setOrderData({ ...orderData, country: e.target.value })}
                        placeholder="Morocco"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t.address}</label>
                    <textarea
                      required
                      value={orderData.address}
                      onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                      placeholder="Street name, Building No, Apartment..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? 'Envoi en cours...' : t.placeOrder}
                  </button>
                </form>
              </div>

              <div className="order-summary-container">
                <div className="order-summary-card">
                  <h3>{t.summary}</h3>
                  <div className="summary-item">
                    <span>Product</span>
                    <span>SOS Hair Care (400g)</span>
                  </div>
                  <div className="summary-item">
                    <span>Quantity</span>
                    <span>{orderData.quantity}</span>
                  </div>
                  <div className="summary-item divider"></div>
                  <div className="summary-item total">
                    <span>{t.total}</span>
                    <span>{orderData.quantity * 25} USD</span>
                  </div>
                  <div className="summary-footer">
                    <p>Free Express Shipping Included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal - Appears after order placement */}
      {showCommentModal && (
        <div className="modal-overlay">
          <div className="modal-content reveal active">
            <h2 className="modal-title">Share Your Thoughts</h2>
            <p className="modal-subtitle">Would you like to leave a comment about your experience?</p>
            <div className="comment-form">
              <div className="form-group">
                <label>Rating</label>
                <select
                  value={newComment.stars}
                  onChange={(e) => setNewComment({ ...newComment, stars: parseInt(e.target.value) })}
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  placeholder="Write your review here..."
                ></textarea>
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={handleSubmitComment}>Add Comment</button>
                <button className="btn" onClick={handleSkipComment}>Skip</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="checkmark-wrapper">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h2>{t.success}</h2>
            <p>{t.successDesc}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-section">
        <div className="container footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 pb-16">
          <div className="footer-brand">
            <div className="brand-logo" onClick={handleGoHome} style={{ cursor: 'pointer' }}>SOS</div>
            <p className="text-base opacity-70">Elevating personal care through the power of nature and science.</p>
          </div>
          <div className="footer-links">
            <h4 className="text-lg font-bold mb-6 text-gold">{t.home}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-gold transition-colors" onClick={handleGoHome}>{t.home}</a></li>
              <li><a href="#ingredients" className="hover:text-gold transition-colors">{t.ingredients}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" onClick={(e) => { e.preventDefault(); setView('checkout'); }}>Shop All</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="footer-newsletter">
            <h4 className="text-lg font-bold mb-6 text-gold">Join the Glow</h4>
            <div className="newsletter-form flex mt-4">
              <input type="email" placeholder="Your Email Address" className="bg-transparent border border-white/10 p-4 text-base flex-1" />
              <button className="bg-gold text-dark px-8 uppercase font-bold text-sm tracking-widest">Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; 2026 SOS beauty. All rights reserved.</p>
            <div className="social-links">
              <span>Instagram</span>
              <span>Pinterest</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/212717781253"
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-fab ${showWhatsApp ? 'whatsapp-fab--visible' : ''}`}
        aria-label="Contact via WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="whatsapp-fab__tooltip">Contactez-nous</span>
      </a>
    </div>
  );
}

export default App;
