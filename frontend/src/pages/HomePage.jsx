import { useContext, useEffect, useState } from "react";
import { getProducts, searchProducts } from "../services/productService";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import { getCategories } from "../services/productService";
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useUser } from "../Context/UserContext";
import { LoginModal } from "../components/LoginModal";
import { format } from "date-fns";
import { WhatsappButton } from "../components/WhatsappButton";


export const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]); // Contiene los productos de la página actual.
    const [currentPage, setCurrentPage] = useState(1); // Guarda en qué página estoy.
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Categorías seleccionadas (filtrado)
    const [showLoginModal, setShowLoginModal] = useState(false);


    const [dateRange, setDateRange] = useState([ // dateRange: guarda el rango seleccionado (inicio/fin). El componente espera un array con objetos que tengan startDate, endDate y key.
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection" // string que identifica el rango
        }
    ]);
    // Estado para mostrar-ocultar el calendario al hacer click en el botón
    const [showCalendar, setShowCalendar] = useState(false);

    const productsPerPage = 4;
    const { setDetail } = useContext(Context);

    // Estados de búsqueda
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Estado para el feedback interactivo
    const [suggestions, setSuggestions] = useState([]);

    // Estado para distinguir cuándo no se encontraron resultados
    const [noResults, setNoResults] = useState(false);

    // Estado para los favoritos del usuario logueado:
    const { user, userFavorites, toggleFavorite } = useUser();
    // const { userFavorites, toggleFavorite } = useUser();

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

    // Función toggleCategory para alternar selección:
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

    // Función para buscar productos
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setSuggestions([]); // luego del click en buscar se limpian las sugerencias, asi no muestra siempre el mensaje “No se encontraron productos”
            return;
        }
        try {
            const start = dateRange[0].startDate;
            const end = dateRange[0].endDate;

            const results = await searchProducts(searchQuery, start, end);
            setSearchResults(results);
            setSuggestions([]); //oculta dropdown
        } catch (error) {
            console.error("Error en búsqueda", error);
        }
    };

    // Función para obtener sugerencias
    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            setNoResults(false); // no mostrar nada si está vacío
            return;
        }
        try {
            const results = await searchProducts(query); // se reutiliza la función de productService
            if (results.length > 0) {
                setSuggestions(results);
                //setSuggestions(results.slice(0, 5)); // se hace un slice para mostrar las 5 primeras sugerencias
                setNoResults(false);
            } else {
                setSuggestions([]);
                setNoResults(true); // ahora sí mostrar el mensaje
            }
        } catch (error) {
            console.error("Error obteniendo sugerencias", error);
        }
    };

    // Función para manejar los favoritos
    const handleFavoriteClick = (product) => {
        if (!user) {
            setShowLoginModal(true); // abrir modal de login si no hay usuario
            return;
        }
        toggleFavorite(product); // si hay usuario logueado, continuar normalmente
    };

    return (
        <>
            <div className="app-container">

                {/* Sección buscador */}
                <section id="search" className="main-content">
                    <div className="search-title">
                        <h2>Descubre tu próximo look</h2>
                        <p>Encuentra tu look perfecto por tipo de prenda, accesorio o calzado</p>
                    </div>
                    <div className="search-actions">
                        <div className="search-input">
                            <input
                                type="text"
                                name="form"
                                id="searchInput"
                                placeholder="¿Qué estás buscando?"
                                value={searchQuery}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchQuery(value);
                                    fetchSuggestions(value); // Aca se obtienen las sugerencias en tiempo real
                                }}
                            />
                            {/* Dropdown que muestra las sugerencias */}
                            {suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((product) => (
                                        <li
                                            key={product.id}
                                            onClick={() => {
                                                setSearchQuery(product.name); // completa el input
                                                setSuggestions([]);
                                                setNoResults(false); // oculta mensaje al elegir una sugerencia
                                            }}
                                        >
                                            {product.name}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Si no hay sugerencias pero el usuario escribió algo */}
                            {/* Mensaje "no se encontraron" */}
                            {noResults && (
                                <ul className="suggestions-list">
                                    <li className="no-results">No se encontraron productos</li>
                                </ul>
                            )}
                        </div>

                        <div className="date-picker-wrapper">
                            {/* Inputs que muestran el rango de fecha seleccionado y alterna el calendario */}

                            <input
                                type="text"
                                readOnly
                                placeholder="Agregar fecha inicio"
                                value={dateRange[0].startDate ? format(dateRange[0].startDate, "dd/MM/yyyy") : ""}
                                onClick={() => setShowCalendar(prev => !prev)}
                            />

                            <input
                                type="text"
                                readOnly
                                placeholder="Agregar fecha fin"
                                value={dateRange[0].endDate ? format(dateRange[0].endDate, "dd/MM/yyyy") : ""}
                                onClick={() => setShowCalendar(prev => !prev)}
                            />

                            {/* Calendario visible solo cuando showCalendar es true */}
                            {showCalendar && (
                                <DateRange
                                    ranges={dateRange}
                                    onChange={item => setDateRange([item.selection])}
                                    editableDateInputs={false} // para apagar el input que viene con el calendario y usar los propios
                                    moveRangeOnFirstSelection={false}
                                    locale={es}
                                // direction="horizontal" // esto hace que el calendario aparezca en línea
                                />
                            )}
                        </div>
                        <button className="primary-button search-button" onClick={handleSearch}>Buscar</button>
                    </div>
                </section>

                <div className="mainHome">

                    {/* Sección resultados de búsqueda */}
                    {searchResults.length > 0 && (
                        <section id="search-results">
                            <div className="search-results-title">
                                <h3>Resultados de la búsqueda:</h3>
                                <p className="results-count">
                                    Mostrando {searchResults.length} {searchResults.length === 1 ? "producto" : "productos"}
                                </p>
                            </div>
                            <ul id="products-grid">
                                {searchResults.map((product) => (
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
                        </section>
                    )}

                    {/* Sección filtros de productos */}
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

                    <section id="recommendationsSection">
                        <h1>¡Nuestros preferidos!</h1>
                        <p className="results-count"> Mostrando {products.length} producto(s){selectedCategories.length > 0 ? " filtrado(s)" : ""}</p>

                        {/* Productos */}
                        <ul id="products-grid">
                            {paginatedProducts.map((product) => (
                                <li className="product-description" key={product.id}>
                                    <button className="like-button" onClick={() => handleFavoriteClick(product)}>
                                        {userFavorites.some((p) => p.id === product.id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
                                    </button>

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
                </div>

                {/* Botón Whatsapp */}
                <WhatsappButton />

                {/* Modal Inicio de sesión y Registro*/}
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)} />
            </div>
        </>
    );
};