import { Search } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';
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

const ProductListItem = ({ id, name, onSelect }) => (
  <li>
    <Button variant={Button.variant.ghost} onClick={() => onSelect(id)}>
      <Search size={16} />
      {name}
    </Button>
  </li>
);

const ProductDetails = ({ product }) => (
  <Card as='article' className='product-detail'>
    <Card.Header>
      <Card.Title as='h2'>{product.name}</Card.Title>
    </Card.Header>

    <Card.Content>
      <p>{product.description}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
    </Card.Content>
  </Card>
);

const ProductList = ({ products, onSelect }) =>
  products &&
  products.length > 0 && (
    <Card className='product-list'>
      <ul>
        {products.slice(0, 10).map(product => (
          <ProductListItem
            key={product.id}
            id={product.id}
            name={product.name}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </Card>
  );

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

  const handleProductSelect = useCallback(
    async id => {
      debouncedSearch.cancel();
      setState({ step: STEP.LOADING });

      try {
        const data = await fetchJson(`${API_URL}/${RESOURCE}/${id}`);

        setState({ step: STEP.PRODUCT_SUCCESS, data });
      } catch (error) {
        setState({ step: STEP.ERROR, error: error.message });
      }
    },
    [debouncedSearch],
  );

  const handleSearch = event => {
    const search = event.target.value.trim();

    if (search === '') {
      debouncedSearch.cancel();
      setState(INITIAL_STATE);
      return;
    }

    debouncedSearch(search);
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

        return (
          <ProductList products={products} onSelect={handleProductSelect} />
        );

      case STEP.PRODUCT_SUCCESS:
        const { data: product } = state;
        return <ProductDetails product={product} />;
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
