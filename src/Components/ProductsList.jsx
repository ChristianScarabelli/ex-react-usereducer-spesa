import { useReducer } from "react";

// Reducer 
function cartReducer(state, action) {
    const productIndex = action.payload;

    switch (action.type) {
        case 'ADD_ITEM': {
            const existingProduct = state.find((p) => p.index === productIndex);
            if (existingProduct) {
                return state.map((p) =>
                    p.index === productIndex ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...state, { ...products[productIndex], quantity: 1, index: productIndex }];
        }
        case 'REMOVE_ITEM':
            return state.filter((p) => p.index !== productIndex);
        case 'UPDATE_QUANTITY':
            return state.map((p) =>
                p.index === productIndex ? { ...p, quantity: Math.max(1, Math.floor(Number(action.quantity))) } : p
            );
        default:
            return state;
    }
}

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];

export default function ProductsList() {

    const [addedProducts, dispatch] = useReducer(cartReducer, []);

    const addToCart = (productIndex) => dispatch({ type: 'ADD_ITEM', payload: productIndex });
    const removeFromCart = (productIndex) => dispatch({ type: 'REMOVE_ITEM', payload: productIndex });
    const updateProductQuantity = (productIndex, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: productIndex, quantity });

    const totalToPay = addedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2);

    return (
        <section>
            <h2>Lista dei prodotti</h2>
            <ul>
                {products.map((p, i) => (
                    <li key={i}>
                        <span>{p.name}</span>
                        <span>{`${p.price}€`}</span>
                        <button onClick={() => addToCart(i)}>Add to cart</button>
                    </li>
                ))}
            </ul>

            <div>
                {addedProducts.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <h3>Prodotti nel Carrello</h3>
                        {addedProducts.map((p) => (
                            <div key={p.index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <span>{p.name}</span>
                                <span>{`${p.price}€`}</span>
                                <span>Quantità:
                                    <input
                                        type="number"
                                        value={p.quantity}
                                        onChange={(e) => updateProductQuantity(p.index, e.target.value)}
                                    />
                                </span>
                                <button onClick={() => removeFromCart(p.index)}>Rimuovi dal carrello</button>
                            </div>
                        ))}
                        <strong>Totale da pagare: {totalToPay} €</strong>
                    </div>
                ) : (
                    <h4>Il carrello è vuoto</h4>
                )}
            </div>
        </section>
    );
}
