import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { closeMenu, darkLogo, logo, menuIcon } from "../assets";
import Container from "./Container";
import { ChevronRight, LayoutDashboard, LogIn, Search, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePopUp } from "../contexts/PopUpContextProvider";
import axiosInstance from "../utils/axiosInstance";

const navLinks = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About',
        href: '/about'
    },
    {
        name: 'Contact',
        href: '/contact'
    },
    {
        name: 'FAQs',
        href: '/faqs'
    },
    {
        name: 'Auctions',
        href: '/auctions'
    },
];

const popularBrands = [
    { name: "John Deere", count: 8466 },
    { name: "Claas", count: 4433 },
    { name: "New Holland", count: 3318 },
    { name: "Fendt", count: 2955 },
    { name: "Massey Ferguson", count: 2066 },
    { name: "Deutz-fahr", count: 1941 },
    { name: "Kuhn", count: 1648 },
    { name: "Case IH", count: 1601 },
];


function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { openPopup } = usePopUp();

    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
    const [activeMobileCategory, setActiveMobileCategory] = useState(null);

    useEffect(() => {
        if (categories.length > 0 && !hoveredCategory) {
            setHoveredCategory(categories[0].slug);
        }
    }, [categories]);

    // Fetch categories when popup opens
    useEffect(() => {
        const fetchCategories = async () => {
            if (isCategoriesOpen || mobileCategoriesOpen) {
                try {
                    setLoading(true);
                    // Fetch parent categories
                    const { data } = await axiosInstance.get('/api/v1/categories/public/parents');
                    if (data.success) {
                        // For each parent, fetch its subcategories
                        const categoriesWithChildren = await Promise.all(
                            data.data.map(async (parent) => {
                                try {
                                    const childrenRes = await axiosInstance.get(`/api/v1/categories/public/${parent.slug}/children`);
                                    return {
                                        ...parent,
                                        children: childrenRes.data.success ? childrenRes.data.data.subcategories : [],
                                        auctionCount: parent.auctionCount || Math.floor(Math.random() * 10000)
                                    };
                                } catch (error) {
                                    return {
                                        ...parent,
                                        children: [],
                                        auctionCount: parent.auctionCount || Math.floor(Math.random() * 10000)
                                    };
                                }
                            })
                        );
                        setCategories(categoriesWithChildren);
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    // Fallback data based on your image
                    setCategories([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCategories();
    }, [isCategoriesOpen, mobileCategoriesOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        }

        setIsScrolled(pathname !== '/');

        pathname === '/' && window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // Format number with commas
    const formatNumber = (num) => {
        if (!num) return '0';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <header className={`${isScrolled ? 'fixed bg-white bg-opacity-100 shadow-lg shadow-primary/5' : 'absolute bg-opacity-0'} w-full transition-all duration-150 z-50`}>
            <Container className={`flex items-center justify-between py-4`}>
                <Link to="/">
                    <img src={(isScrolled || isMenuOpen) ? `${darkLogo}` : `${logo}`} alt="BidNordic's Logo" className="h-10 md:h-12 z-10" />
                </Link>

                {/* Navlinks for larger screens */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-7">
                        {/* <li>
                            <Search onClick={() => openPopup('searchForm')} size={24} className={`${isScrolled ? 'text-black' : 'text-white'} cursor-pointer`} />
                        </li> */}
                        {
                            navLinks.map(link => (
                                <li key={link.name}>
                                    <NavLink to={link.href} className={({ isActive }) => `${isActive && isScrolled ? 'text-orange-500' : isActive && !isScrolled ? 'text-orange-500' : isScrolled ? 'text-black' : 'text-white'} hover:underline`}>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                        <li className={`${isScrolled ? 'text-black' : 'text-white'} relative`}>
                            <button
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                className="categories-trigger flex gap-1 items-center cursor-pointer hover:underline"
                            >
                                <span>Categories</span>
                                <ChevronDown size={16} className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isCategoriesOpen && (
                                <div className="fixed inset-0 z-40 flex justify-center items-start pt-24 px-4">

                                    {/* backdrop */}
                                    <div
                                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                                        onClick={() => setIsCategoriesOpen(false)}
                                    />

                                    {/* MENU PANEL */}
                                    <div className="relative w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>

                                        <div className="flex h-[75vh]">

                                            {/* LEFT SIDEBAR */}
                                            <div className="w-1/4 overflow-y-auto py-4 border-r bg-orange-50">
                                                {categories.map((cat) => (
                                                    <div
                                                        key={cat.slug}
                                                        onMouseEnter={() => setHoveredCategory(cat.slug)}
                                                        onClick={() => setHoveredCategory(cat.slug)}
                                                        className={`flex items-center justify-between px-5 py-4 mx-4 cursor-pointer rounded-lg transition
              ${hoveredCategory === cat.slug
                                                                ? "bg-slate-900 text-white"
                                                                : "text-gray-800 hover:bg-white"
                                                            }`}
                                                    >
                                                        <span className="font-medium">{cat.name}</span>
                                                        <ChevronRight size={18} />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* RIGHT CONTENT */}
                                            <div className="w-3/4 p-8 overflow-y-auto">
                                                {categories
                                                    .filter((cat) => cat.slug === hoveredCategory)
                                                    .map((activeCat) => (
                                                        <div key={activeCat.slug}>

                                                            {/* Category Title */}
                                                            <p
                                                                className="text-2xl font-bold text-black"
                                                            >
                                                                {activeCat.name}
                                                                {/* <span className="text-gray-500 text-lg ml-2">
                                                                    ({formatNumber(activeCat.auctionCount)})
                                                                </span> */}
                                                            </p>

                                                            {/* Close Button */}
                                                            <button
                                                                onClick={() => setIsCategoriesOpen(false)}
                                                                className="absolute top-5 right-5 text-gray-500 hover:text-black transition"
                                                            >
                                                                <X size={24} />
                                                            </button>

                                                            {/* Subcategories */}
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 mt-8">
                                                                {activeCat.children?.map((sub) => (
                                                                    <Link
                                                                        key={sub.slug}
                                                                        to={`/auctions?category=${hoveredCategory}&subcategory=${sub.slug}`}
                                                                        onClick={() => setIsCategoriesOpen(false)}
                                                                        className="flex gap-1 text-black text-lg font-medium hover:underline"
                                                                    >
                                                                        {sub.name}
                                                                        {/* <span className="text-gray-500 text-base">
                                                                            ({formatNumber(sub.auctionCount)})
                                                                        </span> */}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </li>
                        <li>
                            {
                                user
                                    ?
                                    <button className="flex items-center gap-2 inset-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-5 py-2 rounded-md cursor-pointer" onClick={() => navigate(`/${user.userType}/dashboard`)}><LayoutDashboard size={20} /> Dashboard</button>
                                    :
                                    <button className="flex items-center gap-2 inset-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-5 py-2 rounded-md cursor-pointer" onClick={() => navigate('/login')}><LogIn size={20} /> Log In</button>
                            }
                        </li>
                    </ul>
                </nav>

                {/* Navlinks for smaller screens */}
                <nav className={`lg:hidden bg-white absolute top-0 left-0 min-h-screen transition-all duration-200 overflow-hidden text-center flex items-center justify-center ${isMenuOpen ? 'w-full' : 'w-0'}`}>
                    <ul>
                        {
                            navLinks.map(link => (
                                <li onClick={() => setIsMenuOpen(false)} key={link.name} className="relative mx-5 py-2">
                                    <NavLink className={({ isActive }) => ``} to={link.href}>{link.name}</NavLink>
                                </li>
                            ))
                        }
                        <li className="relative mx-5 py-2 mb-2">
                            <button
                                onClick={() => {
                                    setMobileCategoriesOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-1"
                            >
                                Categories
                                <ChevronRight size={16} />
                            </button>
                        </li>

                        <li>
                            {
                                user
                                    ?
                                    <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-5 py-2 rounded-md cursor-pointer" onClick={() => navigate(`/${user.userType}/dashboard`)}><LayoutDashboard size={20} /> Dashboard</button>
                                    :
                                    <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-5 py-2 rounded-md cursor-pointer" onClick={() => { navigate('/login'); setIsMenuOpen(false) }}><LogIn size={20} /> Log In</button>
                            }
                        </li>

                    </ul>
                </nav>

                {/* MOBILE CATEGORIES DRAWER */}
                <div
                    className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ${mobileCategoriesOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    {/* LEVEL 1 — ALL CATEGORIES */}
                    {!activeMobileCategory && (
                        <div className="h-full overflow-y-auto">
                            <div className="flex items-center justify-between p-5 border-b">
                                <h2 className="text-xl font-bold">All Categories</h2>
                                <X
                                    className="cursor-pointer"
                                    onClick={() => setMobileCategoriesOpen(false)}
                                />
                            </div>

                            <div className="p-5 space-y-5">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.slug}
                                        onClick={() => setActiveMobileCategory(cat)}
                                        className="flex justify-between items-center cursor-pointer text-lg font-medium"
                                    >
                                        <span>{cat.name}</span>
                                        <ChevronRight size={18} className="font-bold" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* LEVEL 2 — SINGLE CATEGORY */}
                    {activeMobileCategory && (
                        <div className="h-full overflow-y-auto">
                            <div className="flex items-center justify-between p-5 border-b">
                                <button
                                    onClick={() => setActiveMobileCategory(null)}
                                    className="flex items-center gap-2"
                                >
                                    ← Back
                                </button>
                                <X
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setMobileCategoriesOpen(false);
                                        setActiveMobileCategory(null);
                                    }}
                                />
                            </div>

                            <div className="p-5">
                                <h2 className="text-[22px] font-bold">
                                    {activeMobileCategory.name}
                                    <span className="text-gray-500 ml-2">
                                        ({formatNumber(activeMobileCategory.auctionCount)})
                                    </span>
                                </h2>

                                <div className="mt-6 space-y-2">
                                    {activeMobileCategory.children?.map((sub) => (
                                        <Link
                                            key={sub.slug}
                                            to={`/auctions?category=${activeMobileCategory.slug}&subcategory=${sub.slug}`}
                                            onClick={() => {
                                                setMobileCategoriesOpen(false);
                                                setActiveMobileCategory(null);
                                            }}
                                            className="flex justify-start gap-1 items-center text-lg font-medium"
                                        >
                                            <span>{sub.name}</span>
                                            <span className="text-gray-500">
                                                ({formatNumber(sub.auctionCount)})
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <div className="lg:hidden z-50 flex items-center gap-5">
                    {/* <Search className={`${isMenuOpen || isScrolled ? 'text-black' : 'text-white'}`} onClick={() => openPopup('searchForm')} /> */}
                    {
                        isMenuOpen ? (<img onClick={() => setIsMenuOpen(!isMenuOpen)} src={closeMenu} alt="menu icon" className={`h-7 cursor-pointer invert-25 z-50 ${isScrolled}`} />) : (<img onClick={() => setIsMenuOpen(!isMenuOpen)} src={menuIcon} alt="menu icon" className={`h-5 cursor-pointer ${isScrolled && 'invert'} z-50`} />)
                    }
                </div>
            </Container>
        </header>
    );
}

export default Header;