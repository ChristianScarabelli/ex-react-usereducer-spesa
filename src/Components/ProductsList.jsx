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

    // Funzione per aggiungere un prodotto al carrello
    // accetta il prodotto mappato, restituisce il prodotto aggiunto e l'array con tutti i prodotti aggiunti
    // e aggiungo la propiretà quantity al prodotto
    const addToCart = (productIndex) => {
        const product = products[productIndex] // Prendo il prodotto usando l'indice
        if (addedProducts.some(p => p.index === productIndex)) return    // se il prodotto è già presente nel carrello interrompo
        const newProduct = { ...product, quantity: 1, index: productIndex }
        setAddedProducts([newProduct, ...addedProducts])
    }

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
                            </div>
                        ))}
                    </div>
                ) : (
                    <h4>Il carrello è vuoto</h4>
                )}
            </div>
        </section>
    )
}