import { Search } from 'lucide-react';
import { Button } from './ui/Button';
import './ProductListItem.css';

export const ProductListItem = ({ id, name, onSelect }) => (
  <li className='product-list-item'>
    <Button variant={Button.variant.ghost} onClick={() => onSelect(id)}>
      <Search size={16} />
      {name}
    </Button>
  </li>
);
