import { Search } from 'lucide-react';
import { useState } from 'react';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { fetchJson } from './lib/api';
import './App.css';

const API_URL = 'http://localhost:3333';
const RESOURCE = 'products';
const STEP = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const INITIAL_STATE = { step: STEP.IDLE };

export const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const searchProducts = async search => {
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
  };

  const handleSearch = e => {
    searchProducts(e.target.value.trim());
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

        if (!products || products.length === 0) return null;

        return (
          <Card className='product-list'>
            <ul>
              {products.slice(0, 10).map(product => (
                <li key={product.id} className='font-medium' tabIndex={0}>
                  <Search size={16} />
                  {product.name}
                </li>
              ))}
            </ul>
          </Card>
        );
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
