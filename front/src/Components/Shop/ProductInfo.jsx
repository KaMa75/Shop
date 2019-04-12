import React from 'react';

const ProductInfo = (props) => {
    const data = props.data;
    if(!data.name) {
        return null;
    };
    return (
        <div>
            <section>
                <h2>{ `${data.name} ${data.manufacturer.name}` }</h2>
                <p>
                    { `Produkt ${data.available ? 'dostępny' : 'niedostępny'}` }
                </p>            
            </section>
            <section>
                <div className="column">
                    <ul>
                        <li>
                            <div className="label">
                                Producent:
                            </div>
                            <div className="data">
                                { data.manufacturer.name }
                            </div>
                        </li>
                        <li>
                            <div className="label">
                                Model:
                            </div>
                            <div className="data">
                                { data.model }
                            </div>
                        </li>
                        <li>
                            <div className="label">
                                Typ:
                            </div>
                            <div className="data">
                                { data.type.name }
                            </div>
                        </li>
                        <li>
                            <div className="label">
                                Kolor:
                            </div>
                            <div className="data">
                                { data.color }
                            </div>
                        </li>
                        <li>
                            <div className="label">
                                Materiał:
                            </div>
                            <div className="data">
                                { data.material.name }
                            </div>
                        </li>
                        <li>
                            <div className="label">
                                Przeznaczenie:
                            </div>
                            <div className="data">
                                { data.destiny.name }
                            </div>
                        </li>
                        <li>
                            <div className="label">
                                Rozmiar:
                            </div>
                            <div className="data">
                                { data.size }
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="column">
                    <h2>
                        { `${data.price.toFixed(2)} zł` }
                    </h2>
                    <button
                        onClick={ props.addToBasket(data._id) }
                    >
                        Dodaj do koszyka
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductInfo;
