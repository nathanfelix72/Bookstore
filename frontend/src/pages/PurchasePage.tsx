import { useNavigate, useParams } from 'react-router-dom';
import Welcome from '../components/Welcome';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const existingItem = cart.find(
      (item: CartItem) => item.bookId === Number(bookId)
    );

    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      quantity: existingItem ? existingItem.quantity + 1 : 1,
      price: Number(price),
    };

    setQuantity(quantity);
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Welcome />
      <h2>
        Purchase {title} for {price}?
      </h2>
      <div>
        <button onClick={handleAddToCart}>Yes, add to cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default PurchasePage;
