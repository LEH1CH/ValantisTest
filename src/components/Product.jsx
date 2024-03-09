/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Product({ id, product, brand, price }) {
  return (
    <div className="card border rounded-5 m-2 p-0 w-1">
      <div className="card-body">
        <h6 className="card-title text-muted">Название: {product}</h6>
        <p className="card-subtitle mb-2">ID: {id}</p>
        {brand && <p className="card-text mb-2">Брэнд: {brand}</p>}{' '}
        <p className="card-text">Цена: {price}</p>
      </div>
    </div>
  )
}
