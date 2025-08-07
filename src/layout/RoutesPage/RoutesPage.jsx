import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import Sidebar from '../SideBar/SideBar';
import Home from '../../modules/Home/Home'
import Projects from '../../modules/Projects/Projects'
import Contact from '../../modules/Contact/Contact'
import Monitors from '../../modules/Projects/Monitors';
import Accessories from '../../modules/Projects/Accessories';
import PurchasesPage from '../../modules/Projects/PurchasesPage';
import MyProductsPage from '../../modules/Projects/MyProductsPage';
import Login from '../Login/Login';
import NoteBook from '../../modules/Projects/NoteBook';

import FavoriteProduct from '../../modules/Projects/FavoriteProduct';
import About from '../../modules/About/About';
import Mouse from '../../modules/Projects/Mouse';
import ProductSingle from '../../modules/Projects/ProductSingle';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';
import RekModal from '../../Components/RekModal/RekModal';


export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <ScrollToTop />
            <RekModal />
            <div className="app">
                <div className="app__content">
                    {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}
                    <div className="app__main">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/products/monitors" element={<Monitors />} />
                            <Route path="/products/components" element={<Accessories />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/purchases" element={<PurchasesPage />} />
                            <Route path="/my-products" element={<MyProductsPage />} />
                            <Route path="/products/notebooks" element={<NoteBook />} />
                            <Route path="/products/mouse" element={<Mouse />} />
                            <Route path="/favorites" element={<FavoriteProduct />} />
                            <Route path="/product/:id" element={<ProductSingle />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}
