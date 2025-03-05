export default function ProductsList() {

    const products = [
        { name: 'Mela', price: 0.5 },
        { name: 'Pane', price: 1.2 },
        { name: 'Latte', price: 1.0 },
        { name: 'Pasta', price: 0.7 },
    ]

    return (
        <section>
            <h2>Lista dei prodotti</h2>
            <ul>
                {products.map((p, i) => {
                    return <li key={i}>
                        <span>{p.name}</span>
                        <span>{`${p.price}€`}</span>
                    </li>
                })
                }
            </ul>
        </section>
    )
}