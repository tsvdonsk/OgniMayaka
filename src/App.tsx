import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataContext'
import { LanguageProvider } from './i18n'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Pool from './pages/Pool'
import Sauna from './pages/Sauna'
import Gazebos from './pages/Gazebos'
import IgluGazebos from './pages/IgluGazebos'
import Services from './pages/Services'
import Contacts from './pages/Contacts'
import Admin from './pages/Admin'
import ScrollToTop from './components/ScrollToTop'
import { PravitaVisit, PravilaPool, Privacy, Terms, Requisites } from './pages/Documents'
import News from './pages/News'

export default function App() {
  return (
    <LanguageProvider>
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter basename="/OgniMayaka">
          <ScrollToTop />
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gostinichnye-nomera" element={<Rooms />} />
                <Route path="/bassejn" element={<Pool />} />
                <Route path="/sauna" element={<Sauna />} />
                <Route path="/malye-besedki" element={<Gazebos type="small" />} />
                <Route path="/bolshie-besedki" element={<Gazebos type="big" />} />
                <Route path="/iglu-besedki-u-bassejna" element={<IgluGazebos />} />
                <Route path="/uslugi" element={<Services />} />
                <Route path="/kontakty" element={<Contacts />} />
                <Route path="/novosti" element={<News />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/pravila-poseshheniya" element={<PravitaVisit />} />
                <Route path="/pravila-bassejna-doc" element={<PravilaPool />} />
                <Route path="/politika-konfidencialnosti" element={<Privacy />} />
                <Route path="/polzovatelskoe-soglashenie" element={<Terms />} />
                <Route path="/rekvizity" element={<Requisites />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
    </LanguageProvider>
  )
}
