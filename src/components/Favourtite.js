import React from 'react'
import { useGlobalContext } from '../Context'

const Favourtite = () => {
  const { favourites, selectMeal, removeFromFavourites} = useGlobalContext()
  return (
    <section className='favorites'>
      <div className='favorites-content'>
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favourites.map((item) => {
            const { idMeal, strMealThumb: image } = item;
            return <div key={idMeal} className='favorite-item'>
              <img src={image} alt="image" className='favorites-img img' onClick={() => selectMeal(idMeal, true)} />
              <button className="remove-btn" onClick={() => removeFromFavourites(idMeal)}>Remove</button>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

export default Favourtite