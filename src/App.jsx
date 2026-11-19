import { Search } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { fetchJson } from './lib/api';
import './App.css';

const API_URL = 'http://localhost:3333';
const RESOURCE = 'products';
const DEBOUNCE_DELAY = 300;
const STEP = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const INITIAL_STATE = { step: STEP.IDLE };

const debounce = (callback, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const ProductListItem = ({ name }) => (
  <li className='font-medium' tabIndex={0}>
    <Search size={16} />
    {name}
  </li>
);

const ProductList = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <Card className='product-list'>
      <ul>
        {products.slice(0, 10).map(product => (
          <ProductListItem key={product.id} name={product.name} />
        ))}
      </ul>
    </Card>
  );
};

export const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const searchProducts = useCallback(async search => {
    if (search === '') {
      setState(INITIAL_STATE);
      return;
    }

    setState({ step: STEP.LOADING });

    try {
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
    debouncedSearch(event.target.value.trim());
  };

  const getContent = () => {
    switch (state.step) {
      case STEP.IDLE:
      case STEP.LOADING:
      case STEP.ERROR:
      default:
        return null;

      case STEP.SUCCESS:
        const { data: products } = state;

        return <ProductList products={products} />;
    }
  };

  return (
    <main className='container'>
      <h1>Search Products</h1>

      <form className='search-form' onSubmit={e => e.preventDefault()}>
        <label htmlFor='search' className='sr-only'>
          Search for a product:
        </label>
        <Input
          id='search'
          placeholder='Search for a product...'
          onChange={handleSearch}
        />
      </form>

      {getContent()}
    </main>
  );
};
