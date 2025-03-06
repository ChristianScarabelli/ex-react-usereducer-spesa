import { useState } from "react"

export default function ProductsList() {
    // Stato per i prodotti aggiunti al carrello
    const [addedProducts, setAddedProducts] = useState([])

    const products = [
        { name: 'Mela', price: 0.5 },
        { name: 'Pane', price: 1.2 },
        { name: 'Latte', price: 1.0 },
        { name: 'Pasta', price: 0.7 },
    ]

    // Funzione per aggiungere un prodotto al carrello (se non è già presente)
    // accetta l'indice del prodotto mappato, restituisce il prodotto aggiunto e l'array con tutti i prodotti aggiunti
    const addToCart = (productIndex) => {
        if (addedProducts.some((p) => p.index === productIndex)) {
            updateProductQuantity(productIndex, 1); // Incrementa la quantità se il prodotto esiste già
            return;
        }
        const newProduct = { ...products[productIndex], quantity: 1, index: productIndex }; // aggiungo la propiretà quantity al prodotto
        setAddedProducts([newProduct, ...addedProducts]);
    }

    // Funzione per aggiornare la quantità dei prodotti nel carrello
    const updateProductQuantity = (productIndex, quantity) => {
        const parsedQuantity = Math.max(1, Math.floor(Number(quantity))); // Converti in numero intero e minimo 1
        setAddedProducts((prevProducts) =>
            prevProducts.map((p) =>
                p.index === productIndex ? { ...p, quantity: parsedQuantity } : p
            )
        );
    }

    // Funzione per rimuovere un prodotto dal carrello
    const removeFromCart = (productIndex) => {
        setAddedProducts((prevProducts) =>
            prevProducts.filter((p) => p.index !== productIndex)
        );
    }

    // Variabile del prezzo totale dei prodotti nel carrello
    const totalToPay = addedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0)


    return (
        <section>
            <div>
                <h2>Lista dei prodotti</h2>
                <ul>
                    {products.map((p, i) => {
                        return <li key={i}>
                            <span>{p.name}</span>
                            <span>{`${p.price}€`}</span>
                            <button onClick={() => addToCart(i)}>Add to cart</button>
                        </li>
                    })}
                </ul>
            </div>
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
    )
}
