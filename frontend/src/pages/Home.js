import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../asset/styles/index.css"

const Home = () => {
    const navigate = useNavigate();
    const [categorys, setCategorys] = useState();
    const [items, setItems] = useState();

    useEffect(() => {

        fetch("http://localhost:8000/api/1.0/menu", {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then((response) => response.json())
            .then(data => {
                setCategorys(data.category)
                setItems(data.items);
            })
    }, [])

    function handleClick(e) {
        const tabs = document.querySelectorAll('a');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        e.target.classList.add("active");
    }

    return (
        <div className="home">
            <div className="home-header">
                <label>Menu</label>
                <div className="header-logut"></div>
            </div>
            <ul>
                <a href="#每日推薦" onClick={handleClick}>每日推薦</a>
                {categorys && categorys.map(category => {
                    return(
                        <a href={'#'+category} onClick={handleClick}>{category}</a>
                    )
                })}
            </ul>
            <div className="home-menu">
                <div id="每日推薦" className="home-menu-recommend">
                    <div className="home-menu-recommend-title home-menu-title">每日推薦</div>
                    <div className="home-menu-item">
                        <span>美味派：煎餃+中冰奶</span>
                        <span className="home-menu-item-price">$40</span>
                    </div>
                    <div className="home-menu-item">
                        <span>行動派：起司蛋餅+中冰紅</span>
                        <span className="home-menu-item-price">$45</span>
                    </div>
                </div>
                <div className="home-menu-origin">
                    {categorys && categorys.map(((category, i) => {
                        return (
                            <>
                                <div id={category} key={i} className="home-menu-origin-title home-menu-title">{category}</div>
                                {items && items[category].map(item => {
                                    return (
                                        <div key={item.id} className="home-menu-item"
                                            onClick={() =>
                                                navigate(`item?id=${item.id}`,
                                                    { state: { data: item } }
                                                )}>
                                            <span>{item.name}</span>
                                            <span className="home-menu-item-price">${item.price}</span>
                                        </div>
                                    )
                                })}
                            </>
                        )
                    }))}
                </div>
            </div>
        </div>
    )
}

export default Home