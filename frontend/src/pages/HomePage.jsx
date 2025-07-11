import { useContext, useEffect, useState } from "react";
import { NavBarComponent } from "../components/navBarComponent";
import { FooterComponent } from "../components/FooterComponent";
import { getProducts } from "../services/productService";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import { getCategories } from "../services/productService";

export const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]); // Contiene los productos de la página actual.
    const [currentPage, setCurrentPage] = useState(1); // Guarda en qué página estoy.
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Categorías seleccionadas (filtrado)

    const productsPerPage = 4;
    const { setDetail } = useContext(Context);

    // Se cargan las categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await getCategories();
                setCategories(cats);
            } catch (error) {
                console.error("Error cargando categorías", error);
            }
        };
        fetchCategories();
    }, []);

    //Para cargar productos (y filtrar si hay categorías seleccionadas)
    useEffect(() => {
        const showProducts = async () => {
            const allProducts = await getProducts();
            const filtered = selectedCategories.length > 0
                ? allProducts.filter((p) => p.category && selectedCategories.includes(p.category.id))
                : allProducts;

            const shuffled = getRandomProducts(filtered);
            setProducts(shuffled);
            setPaginatedProducts(getPageProducts(shuffled, 1));
            setCurrentPage(1);
        };
        showProducts();
    }, [selectedCategories]);
    /*  useEffect(() => {
         const showProducts = async () => {
             const allProducts = await getProducts();
             const shuffled = getRandomProducts(allProducts);
             setProducts(shuffled);
             setPaginatedProducts(getPageProducts(shuffled, 1));
         };
         showProducts();
     }, []); */

    // Función toggleCategory para alternar selección::
    const toggleCategory = (categoryId) => {
        setCurrentPage(1);
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter((id) => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
    };

    const removeFilter = (categoryId) => {
        setSelectedCategories((prevSelected) => prevSelected.filter((id) => id !== categoryId));
    };

    const getRandomProducts = (array) => {
        return [...array].sort(() => 0.5 - Math.random());
    };

    // Función para obtener los productos de cada página
    const getPageProducts = (productsArray, page) => {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        return productsArray.slice(start, end);
    };

    const totalPages = Math.ceil(products.length / productsPerPage); //Esto nos da cuántas páginas debería tener 

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        setPaginatedProducts(getPageProducts(products, page));
    };

    // Funciones para moverme entre páginas
    const goToNextPage = () => goToPage(currentPage + 1);
    const goToPrevPage = () => goToPage(currentPage - 1);
    const goToFirstPage = () => goToPage(1);

    const showProductDetail = (product) => {
        setDetail([product]);
        localStorage.setItem("selectedProduct", JSON.stringify(product));
    };



    return (
        <>
            <NavBarComponent />
            <main className="mainHome">
                <section id="search">
                    <input type="text" name="form" id="searchInput" placeholder="¿Qué estás buscando?" />
                </section>

                <section id="categoriesSection">
                    <h1>Filtrar por tipo de producto</h1>
                    <div id="categoriesGrid">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className={`category-card ${selectedCategories.includes(cat.id) ? "active" : ""}`}
                                onClick={() => toggleCategory(cat.id)}>
                                {/* <i className="ri-price-tag-3-line"></i> */}
                                <img src={cat.imageUrl} alt={cat.name} className="category-image" />
                                <div className="category-description">
                                    <p>{cat.description}</p>
                                </div>
                                <div className="category-title">
                                    <p>{cat.name}</p>
                                </div>
                               
                            </div>
                        ))}
                    </div>

                    {selectedCategories.length > 0 && (
                        <div className="filter-results">
                            <p className="filter-results-title">Estás filtrando por:</p>
                            <div className="filter-results-list">
                                {selectedCategories.map((catId) => {
                                    const cat = categories.find((c) => c.id === catId);
                                    return (
                                        <div key={catId} className="filter-results-pills">
                                            <p>{cat?.name}</p>
                                            <i className="ri-close-line" onClick={() => removeFilter(catId)}></i>
                                        </div>
                                    );
                                })}
                                <button className="filter-button" onClick={clearAllFilters}>Quitar filtros</button>
                            </div>
                        </div>
                    )}
                </section>

                {/* <section id="categoriesSection">
                    <h1>Buscar por tipo de producto</h1>
                    <div id="categoriesGrid">
                        <div>
                            <img src="/assets/img/category-clothing.png" alt="Categoría vestimenta" className="categoryImage" />
                        </div>
                        <div>
                            <img src="/assets/img/category-accessories.png" alt="Categoría accesorios" className="categoryImage" />
                        </div>
                        <div>
                            <img src="/assets/img/category-shoes.png" alt="Categoría calzado" className="categoryImage" />
                        </div>
                    </div>
                </section> */}

                <section id="recommendationsSection">
                    <h1>¡Nuestros preferidos!</h1>
                    <p className="results-count"> Mostrando {products.length} producto(s){selectedCategories.length > 0 ? " filtrado(s)" : ""}</p>

                    <ul id="products-grid">
                        {paginatedProducts.map((product) => (
                            <li className="product-description" key={product.id}>
                                <img
                                    src={product.images.length > 0 ? product.images[0].imageUrl : 'URL_DE_IMAGEN_POR_DEFECTO'}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">$ {product.price}</p>
                                </div>
                                <Link to="/detail">
                                    <button className="primary-button" onClick={() => showProductDetail(product)}>Ver producto</button>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="pagination-controls">
                        <button onClick={goToFirstPage} disabled={currentPage === 1}>« Inicio</button>
                        <button onClick={goToPrevPage} disabled={currentPage === 1}>‹ Anterior</button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Siguiente ›</button>
                    </div>
                </section>
            </main>
            <FooterComponent />
        </>
    );
};
