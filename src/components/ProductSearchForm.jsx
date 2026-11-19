import { Input } from './ui/Input';

export const ProductSearchForm = ({ onSearch }) => {
  return (
    <form className='search-form' onSubmit={e => e.preventDefault()}>
      <label htmlFor='search' className='sr-only'>
        Search for a product:
      </label>
      <Input
        id='search'
        placeholder='Search for a product...'
        onChange={onSearch}
      />
    </form>
  );
};
