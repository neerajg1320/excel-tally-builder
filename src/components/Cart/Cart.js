import './cart.css';
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem } from "../../redux/cart/cartActions";

const Cart = () => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log("store", state);

  const onAdd = () => {
    dispatch((addItem()));
  }

  const onRemove = () => {
    dispatch((deleteItem()));
  }

  return (
      <div className="cart">
        <h2>Number of items in Cart: {state.numOfItems}</h2>
        <button className="green" onClick={onAdd}>
          Add Item to Cart
        </button>
        <button className="red" onClick={onRemove}>
          Remove Item from Cart
        </button>
      </div>
  );
};

export default Cart;