import { useCallback, useMemo, useState } from 'react';
import { ProductDetails } from './components/ProductDetails';
import { ProductList } from './components/ProductList';
import { ProductSearchForm } from './components/ProductSearchForm';
import { fetchJson } from './lib/api';
import { debounce } from './lib/debounce';
import './App.css';

const API_URL = 'http://localhost:3333';
const RESOURCE = 'products';
const DEBOUNCE_DELAY = 300;
const STEP = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  PRODUCT_SUCCESS: 'product_success',
  ERROR: 'error',
};
const INITIAL_STATE = { step: STEP.IDLE };

export const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const searchProducts = useCallback(async search => {
    if (search === '') {
      setState(INITIAL_STATE);
      return;
    }

    setState({ step: STEP.LOADING });

    try {
      console.log('[API] Search products:', search);
      const data = await fetchJson(
        `${API_URL}/${RESOURCE}?search=${encodeURIComponent(search)}`,
      );
      setState({ step: STEP.SUCCESS, data });
    } catch (error) {
      setState({ step: STEP.ERROR, error: error.message });
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(searchProducts, DEBOUNCE_DELAY),
    [searchProducts],
  );

  const handleSearch = event => {
    const search = event.target.value.trim();

    if (search === '') {
      debouncedSearch.cancel(); // Cancel any pending search requests
      setState(INITIAL_STATE);
      return;
    }

    debouncedSearch(search);
  };

  const handleProductSelect = useCallback(
    async id => {
      debouncedSearch.cancel();
      setState({ step: STEP.LOADING });

      try {
        console.log('[API] Product details:', id);
        const data = await fetchJson(`${API_URL}/${RESOURCE}/${id}`);

        setState({ step: STEP.PRODUCT_SUCCESS, data });
      } catch (error) {
        setState({ step: STEP.ERROR, error: error.message });
      }
    },
    [debouncedSearch],
  );

  const getContent = () => {
    switch (state.step) {
      case STEP.IDLE:
      case STEP.LOADING:
      case STEP.ERROR:
      default:
        return null;

      case STEP.SUCCESS:
        return (
          <ProductList products={state.data} onSelect={handleProductSelect} />
        );

      case STEP.PRODUCT_SUCCESS:
        return <ProductDetails product={state.data} />;
    }
  };

  return (
    <main className='container'>
      <h1>Search Products</h1>

      <ProductSearchForm onSearch={handleSearch} />

      {getContent()}
    </main>
  );
};
