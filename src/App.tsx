import React, { useState } from 'react';
import { ShoppingCart, Mail, Phone, MapPin, Github, Linkedin, Store, Package, CreditCard, Minus, Plus, Home, MessageCircle, Instagram, Book, Image, Video, Box } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'ebooks' | 'photos' | 'videos' | 'physical';
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Digital Marketing Guide 2024",
    description: "Complete guide for digital marketing success in 2024",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "ebooks"
  },
  {
    id: 2,
    name: "Web Development Mastery",
    description: "Learn modern web development from scratch",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "ebooks"
  },
  {
    id: 3,
    name: "Premium Stock Photo Bundle",
    description: "High-quality stock photos for commercial use",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "photos"
  },
  {
    id: 4,
    name: "Nature Photography Collection",
    description: "Beautiful nature shots in high resolution",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "photos"
  },
  {
    id: 5,
    name: "Video Editing Course",
    description: "Master video editing with professional techniques",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "videos"
  },
  {
    id: 6,
    name: "Stock Footage Bundle",
    description: "Premium 4K stock footage for your projects",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1492115264205-1c23c1f0cc4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "videos"
  },
  {
    id: 7,
    name: "Custom Printed T-Shirt",
    description: "High-quality cotton t-shirt with your design",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "physical"
  },
  {
    id: 8,
    name: "Designer Coffee Mug",
    description: "Ceramic mug with artistic designs",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "physical"
  }
];

const categoryIcons = {
  ebooks: <Book className="h-6 w-6" />,
  photos: <Image className="h-6 w-6" />,
  videos: <Video className="h-6 w-6" />,
  physical: <Box className="h-6 w-6" />
};

const categoryNames = {
  ebooks: "E-Books",
  photos: "Photos",
  videos: "Videos",
  physical: "Physical Products"
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(currentCart => {
      return currentCart
        .map(item => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const whatsappLink = "https://wa.me/1234567890";
  const instagramLink = "https://instagram.com/your_store";

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const categories = ['ebooks', 'photos', 'videos', 'physical'] as const;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Digital Store</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveSection('home')}
                className={`px-3 py-2 rounded-md flex items-center ${activeSection === 'home' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </button>
              <button
                onClick={() => {
                  setActiveSection('products');
                  setSelectedCategory(null);
                }}
                className={`px-3 py-2 rounded-md ${activeSection === 'products' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`px-3 py-2 rounded-md ${activeSection === 'contact' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
              >
                Contact
              </button>
              <button
                onClick={() => setActiveSection('cart')}
                className="relative px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'home' && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Digital Store</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your one-stop destination for premium digital products and educational resources.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-white text-lg font-semibold">{product.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why Choose Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Products</h3>
                  <p className="text-gray-600">Carefully curated digital resources for your success</p>
                </div>
                <div className="p-4">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
                  <p className="text-gray-600">Multiple payment options for your convenience</p>
                </div>
                <div className="p-4">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Always here to help you with your questions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'products' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Products</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    selectedCategory === null
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-indigo-50'
                  }`}
                >
                  <Store className="h-5 w-5" />
                  <span>All Products</span>
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-indigo-50'
                    }`}
                  >
                    {categoryIcons[category]}
                    <span>{categoryNames[category]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {categoryIcons[product.category]}
                      <span className="text-sm font-medium text-gray-500">{categoryNames[product.category]}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-gray-600">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-600" />
                <span>contact@digitalstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <span>123 Digital Street, Tech City</span>
              </div>
              <div className="flex items-center space-x-4 mt-6">
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'cart' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty</p>
            ) : (
              <div>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={`cart-${item.product.id}`} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">{item.product.name}</h3>
                          <p className="text-gray-600">${item.product.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 text-gray-500 hover:text-red-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 text-gray-500 hover:text-green-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center">
                      <Package className="h-5 w-5 mr-2" />
                      Pay with WorldCoin
                    </button>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay with PayPal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Chat Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
        {showChatOptions && (
          <>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center"
              title="Message on Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </>
        )}
        <button
          onClick={() => setShowChatOptions(!showChatOptions)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="Chat with us"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default App;