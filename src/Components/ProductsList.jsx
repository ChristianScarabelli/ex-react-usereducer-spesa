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
        if (addedProducts.some((p) => p.index === productIndex)) return; // Se esiste già non lo aggiungo
        const newProduct = { ...products[productIndex], quantity: 1, index: productIndex }  // aggiungo la propiretà quantity al prodotto
        setAddedProducts([newProduct, ...addedProducts])
    }

    // Funzione per aggiornare la quantità dei prodotti nel carrello
    const updateProductQuantity = (productIndex) => {
        setAddedProducts((prevProducts) =>
            prevProducts.map((p) =>
                p.index === productIndex ? { ...p, quantity: p.quantity + 1 } : p
            )
        );
    };

    // Funzione wrapper per il click del bottone
    const handleClick = (productIndex) => {
        // Prodotto esistente se combaciano gli indici
        const exists = addedProducts.some((p) => p.index === productIndex);

        // se esiste aggiorno la quantità, altrimenti lo aggiungo
        if (exists) {
            updateProductQuantity(productIndex);
        } else {
            addToCart(productIndex);
        }
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
                            <button onClick={() => handleClick(i)}>Add to cart</button>
                        </li>
                    })
                    }
                </ul>
            </div>
            <div>
                {addedProducts.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <h3>Prodotti nel Carrello</h3>
                        {addedProducts.map((p) => (
                            <div key={p.index} style={{ display: 'flex', gap: '10px' }}>
                                <span>{p.name}</span>
                                <span>{`${p.price}€`}</span>
                                <span>Quantità: {p.quantity}</span>
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