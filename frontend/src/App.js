import React, { useState, useEffect } from 'react';
import './App.css';

// Icons Component
const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M17 17h.01M9 17h.01" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    duration: 'All',
    equipment: 'All',
    difficulty: 'All'
  });

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToastMessage(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleFollow = () => {
    setHasFollowed(true);
    showToastMessage('Thank you for following @kehv_dev! 🎉');
    setTimeout(() => {
      window.open('https://instagram.com/kehv_dev', '_blank');
    }, 1500);
  };

  const products = [
    {
      id: 1,
      name: "Premium Adjustable Dumbbells",
      price: 299.99,
      image: "https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg",
      rating: 4.8,
      category: "equipment"
    },
    {
      id: 2,
      name: "Whey Protein Isolate",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1693996046744-d7d7434bc777",
      rating: 4.9,
      category: "supplements"
    },
    {
      id: 3,
      name: "Premium Tank Top",
      price: 29.99,
      image: "https://images.pexels.com/photos/32695887/pexels-photo-32695887.jpeg",
      rating: 4.7,
      category: "apparel"
    },
    {
      id: 4,
      name: "Professional Spin Bike",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f",
      rating: 4.9,
      category: "equipment"
    },
    {
      id: 5,
      name: "Pre-Workout Powder",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1701428178884-bc82b7037f6f",
      rating: 4.6,
      category: "supplements"
    },
    {
      id: 6,
      name: "Athletic Workout Set",
      price: 59.99,
      image: "https://images.pexels.com/photos/32633150/pexels-photo-32633150.png",
      rating: 4.8,
      category: "apparel"
    }
  ];

  const workouts = [
    {
      id: 1,
      title: "HIIT Cardio Blast",
      trainer: "Sarah Johnson",
      duration: "30 min",
      difficulty: "Intermediate",
      equipment: "None",
      type: "Cardio",
      image: "https://images.pexels.com/photos/32695899/pexels-photo-32695899.jpeg",
      description: "High-intensity interval training to burn maximum calories"
    },
    {
      id: 2,
      title: "Strength Building",
      trainer: "Mike Davis",
      duration: "45 min",
      difficulty: "Advanced",
      equipment: "Full Gym",
      type: "Strength",
      image: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg",
      description: "Build lean muscle with progressive overload techniques"
    },
    {
      id: 3,
      title: "Flexibility Flow",
      trainer: "Emma Wilson",
      duration: "20 min",
      difficulty: "Beginner",
      equipment: "Basic",
      type: "Flexibility",
      image: "https://images.unsplash.com/photo-1611251951013-a036c64d09c9",
      description: "Improve mobility and reduce muscle tension"
    },
    {
      id: 4,
      title: "Battle Rope Training",
      trainer: "John Smith",
      duration: "25 min",
      difficulty: "Advanced",
      equipment: "Basic",
      type: "Strength",
      image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
      description: "Full-body workout with functional movements"
    }
  ];

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29.99,
      features: [
        'Gym Access (6 AM - 10 PM)',
        'Basic Equipment Usage',
        'Locker Room Access',
        'Free WiFi',
        'Monthly Fitness Assessment'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49.99,
      features: [
        'All Basic Features',
        '24/7 Gym Access',
        'Group Classes Included',
        'Nutrition Consultation',
        'Personal Training (2 sessions/month)',
        'Supplement Discounts'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 79.99,
      features: [
        'All Premium Features',
        'Unlimited Personal Training',
        'Custom Meal Plans',
        'Priority Equipment Access',
        'Massage Therapy (1 session/month)',
        'Guest Passes (5/month)'
      ]
    }
  ];

  const filteredWorkouts = workouts.filter(workout => {
    return (filters.type === 'All' || workout.type === filters.type) &&
           (filters.duration === 'All' || 
            (filters.duration === '15-30 min' && parseInt(workout.duration) <= 30) ||
            (filters.duration === '30-45 min' && parseInt(workout.duration) > 30 && parseInt(workout.duration) <= 45) ||
            (filters.duration === '45+ min' && parseInt(workout.duration) > 45)) &&
           (filters.equipment === 'All' || workout.equipment === filters.equipment) &&
           (filters.difficulty === 'All' || workout.difficulty === filters.difficulty);
  });

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1526506118085-60ce8714f8c5')`,
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            GET STRONG
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              GET CONFIDENT
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Hey! I'm Keshav, and I'll help you build the body you've always wanted. No BS, just real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentPage('membership')}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-full hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Join Membership
            </button>
            <button 
              onClick={() => setCurrentPage('workouts')}
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Explore Workouts
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center text-white mb-16">
            What Do You Want to <span className="text-red-400">Train Today?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Equipment', image: 'https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df', desc: 'Quality gear that lasts' },
              { name: 'Supplements', image: 'https://images.pexels.com/photos/15120890/pexels-photo-15120890.jpeg', desc: 'Fuel your progress' },
              { name: 'Apparel', image: 'https://images.unsplash.com/photo-1611251951013-a036c64d09c9', desc: 'Look good, feel great' },
              { name: 'Training', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b', desc: 'Personal guidance' }
            ].map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-900/20 hover:to-orange-900/20 transition-all duration-500 transform hover:scale-105">
                <div 
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-300">{category.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center text-white mb-16">
            People Love <span className="text-red-400">These</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:from-red-900/10 hover:to-orange-900/10 transition-all duration-500 transform hover:scale-105 shadow-2xl">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < Math.floor(product.rating)} />
                    ))}
                    <span className="text-gray-400 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-400">${product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center text-white mb-16">
            Ready to <span className="text-red-400">Get Serious?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Personal Training', price: '$75/session', image: 'https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1', desc: 'One-on-one coaching' },
              { name: 'Group Classes', price: '$25/class', image: 'https://images.pexels.com/photos/31585478/pexels-photo-31585478.jpeg', desc: 'Train with community' },
              { name: 'Online Programs', price: '$29/month', image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg', desc: 'Workout anywhere' }
            ].map((program, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:from-red-900/10 hover:to-orange-900/10 transition-all duration-500 transform hover:scale-105 shadow-2xl">
                <div className="relative overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{program.name}</h3>
                  <p className="text-gray-400 mb-4">{program.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-400">{program.price}</span>
                    <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-black/70">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center text-white mb-16">
            Why Choose <span className="text-red-400">Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🚀', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: '💯', title: 'Money Back', desc: '30-day guarantee' },
              { icon: '🏆', title: 'Expert Support', desc: '24/7 assistance' },
              { icon: '🔒', title: 'Secure Payment', desc: 'SSL protected' }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center text-white mb-16">
            Join Our <span className="text-red-400">Community</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Follow us on Instagram</h3>
              <p className="text-gray-400 text-lg mb-8">
                Get daily fitness inspiration, workout tips, and connect with our amazing community of fitness enthusiasts.
              </p>
              <button 
                onClick={() => setShowInstagramModal(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg rounded-full hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow @kehv_dev
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1598012268972-217e6036c419" 
                alt="Community" 
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <img 
                src="https://images.pexels.com/photos/32695899/pexels-photo-32695899.jpeg" 
                alt="Workout Group" 
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Stay Updated with Latest <span className="text-red-400">Fitness Tips</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get exclusive workout routines, nutrition tips, and special offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderMembership = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-white mb-6">
            Choose Your <span className="text-red-400">Membership</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Unlock your potential with our premium membership plans designed to transform your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {membershipPlans.map((plan) => (
            <div key={plan.id} className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 ${plan.popular ? 'ring-4 ring-red-500 scale-105 transform' : ''} hover:scale-105 transition-all duration-300 shadow-2xl`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-5xl font-black text-red-400 mb-2">
                  ${plan.price}
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowPaymentModal(true);
                }}
                className={`w-full py-4 font-bold text-lg rounded-full transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700' 
                    : 'border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white'
                }`}
              >
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-6">
            All memberships include access to our world-class facilities and expert guidance
          </p>
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="flex items-center text-green-400">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Money Back Guarantee
            </div>
            <div className="flex items-center text-green-400">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel Anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkouts = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-white mb-6">
            Workout <span className="text-red-400">Library</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Access hundreds of professional workouts designed by expert trainers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 rounded-2xl p-6 mb-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
            </select>
            <select 
              value={filters.duration}
              onChange={(e) => setFilters({...filters, duration: e.target.value})}
              className="px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            >
              <option value="All">All Durations</option>
              <option value="15-30 min">15-30 min</option>
              <option value="30-45 min">30-45 min</option>
              <option value="45+ min">45+ min</option>
            </select>
            <select 
              value={filters.equipment}
              onChange={(e) => setFilters({...filters, equipment: e.target.value})}
              className="px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            >
              <option value="All">All Equipment</option>
              <option value="None">No Equipment</option>
              <option value="Basic">Basic Equipment</option>
              <option value="Full Gym">Full Gym</option>
            </select>
            <select 
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              className="px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:from-red-900/10 hover:to-orange-900/10 transition-all duration-500 transform hover:scale-105 shadow-2xl">
              <div className="relative overflow-hidden">
                <img 
                  src={workout.image} 
                  alt={workout.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {workout.duration}
                </div>
                <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm">
                  {workout.difficulty}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{workout.title}</h3>
                <p className="text-gray-400 mb-3">{workout.description}</p>
                <div className="flex items-center mb-4">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${workout.trainer}&background=ef4444&color=ffffff`}
                    alt={workout.trainer}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <span className="text-gray-300">{workout.trainer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{workout.equipment}</span>
                  <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300">
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-black text-white cursor-pointer hover:text-red-400 transition-colors"
            >
              KESHAV <span className="text-red-400">FITNESS</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`font-medium transition-colors ${currentPage === 'home' ? 'text-red-400' : 'text-white hover:text-red-400'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('membership')}
                className={`font-medium transition-colors ${currentPage === 'membership' ? 'text-red-400' : 'text-white hover:text-red-400'}`}
              >
                Membership
              </button>
              <button 
                onClick={() => setCurrentPage('workouts')}
                className={`font-medium transition-colors ${currentPage === 'workouts' ? 'text-red-400' : 'text-white hover:text-red-400'}`}
              >
                Workouts
              </button>
              <button 
                onClick={() => setShowContactForm(true)}
                className="text-white hover:text-red-400 font-medium transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowCart(true)}
                className="relative text-white hover:text-red-400 transition-colors"
              >
                <CartIcon />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-red-400 font-medium transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('membership'); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-red-400 font-medium transition-colors"
              >
                Membership
              </button>
              <button 
                onClick={() => { setCurrentPage('workouts'); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-red-400 font-medium transition-colors"
              >
                Workouts
              </button>
              <button 
                onClick={() => { setShowContactForm(true); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-red-400 font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'membership' && renderMembership()}
        {currentPage === 'workouts' && renderWorkouts()}
      </div>

      {/* Footer */}
      <footer className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-black text-white mb-4">
                KESHAV <span className="text-red-400">FITNESS</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Transform your body, transform your life. Join the fitness revolution today.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => window.open('https://instagram.com/kehv_dev', '_blank')}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-red-400 transition-colors">Home</button></li>
                <li><button onClick={() => setCurrentPage('membership')} className="text-gray-400 hover:text-red-400 transition-colors">Membership</button></li>
                <li><button onClick={() => setCurrentPage('workouts')} className="text-gray-400 hover:text-red-400 transition-colors">Workouts</button></li>
                <li><button onClick={() => setShowContactForm(true)} className="text-gray-400 hover:text-red-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personal Training</li>
                <li>Group Classes</li>
                <li>Nutrition Coaching</li>
                <li>Online Programs</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>Keshav Fitness Arena</p>
                <p>Lagma Main Road, Near DPS School</p>
                <p>Bihar, India – 843323</p>
                <p>📞 +91 9XXXXXXXXX</p>
                <p>📧 contact@bhaiyajiikeshav.com</p>
                <p>⏰ Mon-Sat: 5 AM - 10 PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Keshav Fitness Arena. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Instagram Modal */}
      {showInstagramModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowInstagramModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </button>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Follow @kehv_dev</h3>
              <p className="text-gray-400 mb-6">
                Join our fitness community and get daily motivation, workout tips, and behind-the-scenes content!
              </p>
              <button 
                onClick={handleFollow}
                disabled={hasFollowed}
                className={`w-full py-3 font-bold text-lg rounded-full transition-all duration-300 ${
                  hasFollowed 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transform hover:scale-105'
                }`}
              >
                {hasFollowed ? '✓ Following' : 'Follow Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Complete Payment</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{selectedPlan.name} Plan</span>
                      <span className="text-white">${selectedPlan.price}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Setup Fee</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-white">Total</span>
                        <span className="text-lg font-bold text-red-400">${selectedPlan.price}/month</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowPaymentModal(false);
                      showToastMessage('Payment successful! Welcome to Keshav Fitness Arena! 🎉');
                    }}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300"
                  >
                    Complete Payment
                  </button>
                  <div className="flex items-center justify-center mt-4 space-x-4 text-gray-400 text-sm">
                    <span>🔒 Secured by SSL</span>
                    <span>💳 All cards accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </button>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none">
                  <option>General Inquiry</option>
                  <option>Membership Question</option>
                  <option>Technical Support</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none resize-none"></textarea>
              </div>
              <button 
                onClick={() => {
                  setShowContactForm(false);
                  showToastMessage('Message sent successfully! We\'ll get back to you soon. 📧');
                }}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full relative max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </button>
            <h3 className="text-2xl font-bold text-white mb-6">Shopping Cart</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-700/50 rounded-lg p-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-red-400 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-500"
                      >
                        -
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-white">Total:</span>
                    <span className="text-lg font-bold text-red-400">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg shadow-2xl z-50 transform transition-all duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;