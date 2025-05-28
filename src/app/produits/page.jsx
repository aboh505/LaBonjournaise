// app/dashboard/products/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductPage from '../components/ProductPage/ProductPage';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <> 
    <ProductPage/>
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Produits</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <Image src={product.image} alt={product.name} width={400} height={300} className="rounded" />
            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-purple-600 mt-1">{product.price} CFA</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
