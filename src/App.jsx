import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import IndustriesPage from './pages/IndustriesPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:categoryId" element={<ProductCategoryPage />} />
        <Route path="/products/:categoryId/:productId" element={<ProductDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
