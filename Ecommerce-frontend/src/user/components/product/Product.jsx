import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './Product.css'
import '../../styles/global-ui.css'
import ReactPaginate from 'react-paginate';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
export const Product = ({ cart, setCart }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;
  const pageCount = Math.ceil(data.length / productsPerPage);
  const CART_KEY = "cart"
  const API_URL = "http://localhost:8080"

  const loadCartFromLocalStorage = useCallback(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);


  useEffect(() => {
    loadCartFromLocalStorage();
  }, [loadCartFromLocalStorage]);

  // Sử dụng useMemo để tính toán giá trị của filteredProducts
  const filteredProducts = useMemo(() => {
    return selectedTab === 'All'
      ? data
      : data.filter((product) => product.category === selectedTab);
  }, [data, selectedTab]); // Truyền vào mảng phụ thuộc là data và selectedTab

  // Sử dụng useMemo để tính toán giá trị của currentProducts
  const currentProducts = useMemo(() => {
    return filteredProducts.slice(
      currentPage * productsPerPage,
      (currentPage + 1) * productsPerPage
    );
  }, [filteredProducts, currentPage, productsPerPage]); // Truyền vào mảng phụ thuộc là filteredProducts, currentPage và productsPerPage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/getAllProducts`);
        const products = response.data;
        setData(products);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  // image:
  const getImageUrl = (thumbnail) => {
    if (thumbnail.startsWith('http')) {
      // If the image is an absolute URL, return it as is
      return thumbnail;
    } else {
      // If the image is a relative path, prepend the API URL
      return `${API_URL}/api/FileUpload/files/${thumbnail}`;
    }
  }

  
  const layoutLg = useMemo(() => {
    return currentProducts.map((product, index) => ({
      i: product.id.toString(),
      x: index % 5,
      y: Math.floor(index / 5),
      w: 1,
      h: 1,
    }));
  }, [currentProducts]);
  
  const layoutMd = useMemo(() => {
    return currentProducts.map((product, index) => ({
      i: product.id.toString(),
      x: index % 4,
      y: Math.floor(index / 4),
      w: 1,
      h: 1,
    }));
  }, [currentProducts]);
  
  const layoutSm = useMemo(() => {
    return currentProducts.map((product, index) => ({
      i: product.id.toString(),
      x: index % 3,
      y: Math.floor(index / 3),
      w: 1,
      h: 1,
    }));
  }, [currentProducts]);
  
  const layoutXs = useMemo(() => {
    return currentProducts.map((product, index) => ({
      i: product.id.toString(),
      x: index % 2,
      y: Math.floor(index / 2),
      w: 1,
      h: 1,
    }));
  }, [currentProducts]);
  /*reset so trang ve 0 */
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTab]);

  const handleIncrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(0, (prevQuantities[productId] || 0) - 1),
    }));
  };

  /*PAGINATE */
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  }

  if (error) {
    return <div>Đã xảy ra lỗi khi tải dữ liệu: {error.message}</div>;
  }
  return (
    <div className='product-container'>
      <div className='product-tabs'>
        <h1 className='product-title'>Trending Products</h1>
        <div className="nav-tabs">
          <button
            className={`nav-link ${selectedTab === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedTab('All')}
          >
            ALL
          </button>
          <button
            className={`nav-link ${selectedTab === 'Fruits' ? 'active' : ''
              }`}
            onClick={() => setSelectedTab('Fruits')}
          >
            FRUITS
          </button>
          <button
            className={`nav-link ${selectedTab === 'Veges' ? 'active' : ''}`}
            onClick={() => setSelectedTab('Veges')}
          >
            VEGES
          </button>
          <button
            className={`nav-link ${selectedTab === 'Juices' ? 'active' : ''}`}
            onClick={() => setSelectedTab('Juices')}
          >
            JUICES
          </button>
          <button
            className={`nav-link ${selectedTab === 'Plant-based protein' ? 'active' : ''}`}
            onClick={() => setSelectedTab('Plant-based protein')}
          >
            PB-PROTEIN
          </button>
          <button
            className={`nav-link ${selectedTab === 'Herbal tea' ? 'active' : ''}`}
            onClick={() => setSelectedTab('Herbal tea')}
          >
            HERBAL TEA
          </button>
        </div>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layoutLg, md: layoutMd, sm: layoutSm, xs: layoutXs }}
        breakpoints={{ lg: 1200, md: 1024, sm: 768, xs: 480 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2 }}
        rowHeight={350}
        isResizable={false} isDraggable={false}>
        {currentProducts.map((product) => {
          const quantity = quantities[product.id] || 1;
          const handleAddToCart = (product) => {
            // Tìm sản phẩm trong giỏ hàng
            const productInCart = cart.find((item) => item.id === product.id);

            if (productInCart) {
              // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
              let newCart = cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
              setCart(newCart);
              localStorage.setItem(CART_KEY, JSON.stringify(newCart))
            } else {
              // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
              let newCart = [...cart, { ...product, quantity }];
              setCart(newCart);
              localStorage.setItem(CART_KEY, JSON.stringify(newCart))
            }
            toast.success(`${product.productName} has been added to your cart!`);

          };
          let price = product.price;
          let formattedPrice = price.toFixed(2);
          return (
            <div key={product.id} className='product-grid'>
              <div className='product-item'>
                <div className='heart'>
                  <i class='bx bx-heart' ></i>
                </div>
                <div className='product-image'>
                  <img src={getImageUrl(product.thumbnail)} alt={product.productName} />
                </div>

                <h3>{product.productName}</h3>
                {/* <p>{product.rating}</p> */}
                <div className="product-info">
                  <div className="price-quantity">
                    <span className='price'>${formattedPrice}</span>
                    <div className="quantity-selector">
                      <button onClick={() => handleDecrease(product.id)}>
                        <AiOutlineMinus fontSize={18} />
                      </button>
                      <input type="number" value={quantity} readOnly />
                      <button onClick={() => handleIncrease(product.id)}>
                        <AiOutlinePlus fontSize={18} />
                      </button>
                    </div>
                  </div>
                  <div className="sold-add-to-cart">
                    <span className='sold'>Sold {product.sold}</span>
                    <button onClick={() => handleAddToCart(product)} className='btn-add-cart'>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </ResponsiveGridLayout>
      <ReactPaginate
        containerClassName={'pagination'}
        previousLabel={<i class='bx bx-chevron-left'></i>}
        nextLabel={<i class='bx bx-chevron-right'></i>}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        activeClassName={'active'}
        pageClassName={'page-number'}
      />
      <ToastContainer/>
      </div>
  );
};

