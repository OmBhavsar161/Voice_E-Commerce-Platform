import React from 'react'
import ShopCategory from './ShopCategory'

const All_Products_Display = () => {
  return (
    <div>
      <ShopCategory category="smartwatch" />
      <ShopCategory category="tws" />
      <ShopCategory category="headphones" />
    </div>
  )
}

export default All_Products_Display
