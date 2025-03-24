import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    removeOneFromCart,
    removeAllFromCart,
    addOneToCart,
    clearCart,
  } = useCart();

  return (
    <div>
      <h2>Your cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookId}>
                {item.title} ({item.quantity}): ${item.price.toFixed(2)}/each =
                ${(item.quantity * item.price).toFixed(2)}{' '}
                <button
                  onClick={() => addOneToCart(item.bookId)}
                  style={{
                    fontSize: '0.8em',
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f8f8f8',
                    color: '#333',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginLeft: '5px',
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e0e0e0')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#f8f8f8')
                  }
                >
                  Add One
                </button>
                <button
                  onClick={() => removeOneFromCart(item.bookId)}
                  style={{
                    fontSize: '0.8em',
                    padding: '4px 8px',
                    border: '1px solid #d43f3a',
                    backgroundColor: '#d9534f',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginLeft: '5px',
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#c9302c')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#d9534f')
                  }
                >
                  Remove One
                </button>
                <button
                  onClick={() => removeAllFromCart(item.bookId)}
                  style={{
                    fontSize: '0.8em',
                    padding: '4px 8px',
                    border: '1px solid #8a3c38',
                    backgroundColor: '#a94442',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginLeft: '5px',
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#8a3c38')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#a94442')
                  }
                >
                  Remove All
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Calculate total price */}
      <h3>
        Total: $
        {cart
          .reduce((total, item) => total + item.quantity * item.price, 0)
          .toFixed(2)}
      </h3>

      <button>Checkout</button>
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
