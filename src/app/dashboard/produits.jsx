// Fichier déplacé dans produits/page.jsx

const defaultProducts = [
  {
    id: 1,
    name: 'Burger Classic',
    description: 'Un burger juteux avec fromage, salade et tomate.',
    price: 3500,
    image: '/a2.jpg',
    category: 'Burger',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    description: 'Pizza italienne classique avec sauce tomate et mozzarella.',
    price: 5000,
    image: '/a3.jpg',
    category: 'Pizza',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Hamburger Deluxe',
    description: 'Hamburger avec double steak, fromage cheddar et bacon.',
    price: 4500,
    image: '/a4.jpg',
    category: 'Hamburger',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Sandwich Poulet',
    description: 'Sandwich au pain croustillant avec blanc de poulet grillé.',
    price: 2500,
    image: '/a5.jpg',
    category: 'Sandwich',
    rating: 4.2
  },
  {
    id: 5,
    name: 'Tacos Viande Hachée',
    description: 'Tacos farcis à la viande hachée, fromage et salade.',
    price: 3000,
    image: '/a6.jpg',
    category: 'Tacos',
    rating: 4.4
  },
  {
    id: 6,
    name: 'Hot Dog Classique',
    description: 'Pain moelleux avec saucisse grillée, moutarde et ketchup.',
    price: 2000,
    image: '/a77.jpg',
    category: 'Hot Dog',
    rating: 4.0
  }
];

export default function ProduitsDashboard() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Charger tous les produits existants (blog + admin)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    // Fusion sans doublons (si id déjà présent)
    const merged = [...stored];
    defaultProducts.forEach(p => {
      if (!merged.find(sp => sp.id === p.id)) merged.push(p);
    });
    setProducts(merged);
  }, []);

  // Sauvegarder dans localStorage à chaque ajout/suppression/modification
  const syncProducts = (prods) => {
    setProducts(prods);
    localStorage.setItem("products", JSON.stringify(prods));
  };

  const handleAdd = (product) => {
    const prods = [product, ...products];
    syncProducts(prods);
    setShowModal(false);
    setEditProduct(null);
  };

  const handleEdit = (product) => {
    const prods = products.map(p => p.id === product.id ? product : p);
    syncProducts(prods);
    setShowModal(false);
    setEditProduct(null);
  };

  const handleRemove = (id) => {
    const prods = products.filter(p => p.id !== id);
    syncProducts(prods);
  };

  return (
    <div className="relative px-2 py-10">
      <h1 className="text-2xl font-bold mb-8">Gestion des produits du blog</h1>
      <div className="flex flex-col gap-6">
        {products.length === 0 && <div className="text-gray-400">Aucun produit pour l'instant.</div>}
        {products.map(product => (
          <div
            key={product.id}
            className="flex bg-white rounded-xl shadow p-6 items-center gap-8 hover:shadow-lg transition relative"
          >
            <img src={product.image} alt={product.name} className="w-40 h-32 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-purple-700 mb-1">{product.name}</h3>
              <p className="text-gray-500 mb-2">{product.description}</p>
              <span className="text-purple-600 font-bold">{product.price} FCFA</span>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => { setEditProduct(product); setShowModal(true); }} className="px-4 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">Modifier</button>
              <button onClick={() => handleRemove(product.id)} className="px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => { setEditProduct(null); setShowModal(true); }}
        className="fixed bottom-10 right-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl text-4xl z-50"
        title="Ajouter un produit"
      >+
      </button>
      {showModal && (
        <ProductModal
          onClose={() => { setShowModal(false); setEditProduct(null); }}
          onSave={editProduct ? handleEdit : handleAdd}
          initialProduct={editProduct}
        />
      )}
    </div>
  );
}
