
import { useProducts } from '../features/product/productHook'

const List = () => {
  const { data } = useProducts();
  console.log(data);
  return (
    <div>List</div>
  )
}

export default List