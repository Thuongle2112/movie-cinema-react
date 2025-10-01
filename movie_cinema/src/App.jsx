import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Header from './components/Header'
import Footer from './components/Footer'
import Detail from './pages/MovieDetail'
import SearchResults from './pages/SearchResults'
import ContentList from './components/ContentList'
// import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <div className="flex flex-col h-screen">
      <LanguageProvider>
        <FavoritesProvider>
          {/* <ScrollToTop /> */}
          <Header />
          <main className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/movie/:id" element={<Detail />} />
                <Route path="/tv/:id" element={<Detail />} />
                <Route path="/collection/:type/:category" element={<ContentList />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </FavoritesProvider>
      </LanguageProvider>
    </div>
  )
}

export default App