import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { ProgressBar } from 'react-bootstrap';

function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    removeOneFromCart,
    removeAllFromCart,
    addOneToCart,
    clearCart,
  } = useCart();

  const free_shipping_threshold = 50;
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const progress = Math.min((total / free_shipping_threshold) * 100, 100);
  const amountRemaining = free_shipping_threshold - total;

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

      <h3>
        Total: $
        {cart
          .reduce((total, item) => total + item.quantity * item.price, 0)
          .toFixed(2)}
      </h3>

      {total > 0 && (
        <div className="mt-3">
          <h6>Free Shipping Progress</h6>
          <ProgressBar
            now={progress}
            variant={progress === 100 ? 'success' : 'primary'}
            animated
            striped
          />
          <p className="mt-2">
            {progress === 100
              ? '✅ You unlocked free shipping!'
              : `Spend $${amountRemaining.toFixed(2)} more for free shipping!`}
          </p>
        </div>
      )}

      <button className="btn btn-primary">Checkout</button>
      <button className="btn btn-danger" onClick={clearCart}>
        Clear Cart
      </button>
      <button className="btn btn-secondary" onClick={() => navigate('/books')}>
        Continue Browsing
      </button>
    </div>
  );
}

export default CartPage;
