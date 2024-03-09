/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Product from "./Product";
import {
  calculateOffset,
  generateAuthHeader,
  removeDuplicates,
} from "../utils/utils";
import Loading from "./Loading";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterPrice, setFilterPrice] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterName, setFilterName] = useState("");
  const password = "Valantis";
  const apiUrl = "https://api.valantis.store:41000/";
  const limit = 50;

  useEffect(() => {
    if (!filterPrice.trim() && !filterBrand.trim() && !filterName.trim()) {
      fetchProductIds();
    } else {
      setCurrentPage(1);
      if (filterPrice.trim()) {
        fetchFilteredProductsByPrice(parseFloat(filterPrice));
      } else if (filterBrand.trim()) {
        fetchFilteredProductsByBrand(filterBrand.trim());
      } else if (filterName.trim()) {
        fetchFilteredProductsByName(filterName.trim()); // Вызов новой функции
      }
    }
  }, [currentPage, filterPrice, filterBrand, filterName]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProductIds();
    }
  }, [currentPage]);

  function fetchProductIds() {
    setIsLoading(true);
    axios
      .post(
        apiUrl,
        {
          action: "get_ids",
          params: {
            offset: calculateOffset(currentPage, limit),
            limit: limit,
          },
        },
        {
          headers: {
            "X-Auth": generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result;
        // console.log('productIds', productIds)
        fetchProducts(productIds);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product IDs:", error);
        setIsLoading(false);
      });
  }

  function fetchProducts(productIds) {
    setIsLoading(true);

    axios
      .post(
        apiUrl,
        {
          action: "get_items",
          params: { ids: productIds },
        },
        {
          headers: {
            "X-Auth": generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const products = response.data.result;
        const uniqueProducts = removeDuplicates(products, "id");
        setProducts(uniqueProducts);
        // console.log('uniqueProducts products', uniqueProducts)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }

  function fetchFilteredProductsByPrice(price) {
    setIsLoading(true);

    axios
      .post(
        apiUrl,
        {
          action: "filter",
          params: {
            price: price,
          },
        },
        {
          headers: {
            "X-Auth": generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result;
        // console.log('Filtered product IDs:', productIds)
        fetchProducts(productIds);
      })
      .catch((error) => {
        console.error("Error filtering products:", error);
        setIsLoading(false);
      });
  }

  function fetchFilteredProductsByBrand(brand) {
    setIsLoading(true);

    axios
      .post(
        apiUrl,
        {
          action: "filter",
          params: {
            brand: brand,
          },
        },
        {
          headers: {
            "X-Auth": generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result;
        // console.log('Filtered product IDs by brand:', productIds)
        fetchProducts(productIds);
      })
      .catch((error) => {
        console.error("Error filtering products by brand:", error);
        setIsLoading(false);
      });
  }

  function fetchFilteredProductsByName(product) {
    setIsLoading(true);

    axios
      .post(
        apiUrl,
        {
          action: "filter",
          params: {
            product: product,
          },
        },
        {
          headers: {
            "X-Auth": generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result;
        fetchProducts(productIds);
      })
      .catch((error) => {
        console.error("Error filtering products by product:", error);
        setIsLoading(false);
      });
  }

  const handleFilterSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setCurrentPage(1);
      if (filterPrice.trim()) {
        fetchFilteredProductsByPrice(parseFloat(filterPrice));
      } else if (filterBrand.trim()) {
        fetchFilteredProductsByBrand(filterBrand.trim());
      } else if (filterName.trim()) {
        fetchFilteredProductsByName(filterName.trim()); // Вызов новой функции
      } else {
        fetchProductIds();
      }
    },
    [filterPrice, filterBrand, filterName]
  );

  const resetFilters = useCallback(() => {
    setFilterPrice("");
    setFilterBrand("");
    setFilterName("");
    setCurrentPage(1);
    fetchProductIds();
  }, []);

  const goToPrevPage = useCallback(() => {
    setIsLoading(true);
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setIsLoading(false);
  }, [setCurrentPage, setIsLoading]);

  const goToNextPage = useCallback(() => {
    setIsLoading((prevLoading) => {
      setCurrentPage((prevPage) => prevPage + 1);
      return prevLoading;
    });
  }, [setCurrentPage, setIsLoading]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Список товаров</h1>

      <form className="mb-4" onSubmit={handleFilterSubmit}>
        <div className="row">
          <div className="col">
            <input
              type="number"
              className="form-control rounded-5"
              placeholder="Фильтр по цене"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="Фильтр по брендам"
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="Фильтр по названию"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary rounded-5" type="submit">
              Фильтр
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-secondary rounded-5"
              type="button"
              onClick={resetFilters}
            >
              Сброс
            </button>
          </div>
        </div>
      </form>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 text-center g-2 align-items-stretch">
          {products.map(({ id, product, brand, price }) => (
            <div
              className="col-6 col-md-4 col-lg-3 align-items-stretch"
              key={id}
            >
              <Product id={id} product={product} brand={brand} price={price} />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-center mt-4 mb-4">
        <button
          className="btn btn-primary me-4 rounded-5"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          Назад
        </button>
        <span className="center mt-1"> {currentPage}</span>
        <button className="btn btn-primary ms-4 rounded-5" onClick={goToNextPage}>
          Вперед
        </button>
      </div>
    </div>
  );
}

export default ProductList;
