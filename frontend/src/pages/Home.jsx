import { lazy, Suspense } from "react";
import { Hero, Container, Testimonial, HowItWorksCard, LoadingSpinner, About, AuctionCard, AuctionListItem, CategoryCarousel, HowItWorks } from "../components";
import Marquee from "react-fast-marquee";
import { BadgeCheck, Gavel, Grid, List, Tag, Upload, Filter, UserCog2, LucideVerified, UserPlus, Clock, PhoneCall, Target, Users, ArrowRight, User, CarFront, Hand } from "lucide-react";
import {
    CaseIH,
    Claas,
    Cummins,
    Fendt,
    Freightliner,
    Hitachi,
    JCB,
    JohnDeere,
    Komatsu,
    Kubota,
    Liebherr,
    MasseyFerguson,
    Mercedes,
    NewHolland,
    NokianTyres,
    Peterbilt,
    Scag,
    Skania,
    Stiga,
    Timberjack,
    Toro,
    Toyota,
    Volvo,
} from "../assets";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const FAQs = lazy(() => import('../components/FAQs'));
const CTA = lazy(() => import('../components/CTA'));
const CategoryIconsSection = lazy(() => import('../components/CategoryIconsSection'));
const TestimonialSection = lazy(() => import('../components/TestimonialSection'));

const faqs = [
    {
        question: "Who can bid on vehicles?",
        answer: "Any registered and verified user who is at least 18 years old can bid on cars listed on our platform.",
    },
    {
        question: "What happens if I win an auction?",
        answer: "If you are the winning bidder, our team will contact you directly to finalize the purchase and guide you through secure payment via bank or wire transfer.",
    },
    {
        question: "Is my bid binding?",
        answer: "Yes. Once you place a bid, it is considered binding. If you win, you are expected to complete the purchase.",
    },
    {
        question: "How will I receive the vehicle after payment?",
        answer: "After payment is confirmed, you can arrange pickup or delivery with our team or the seller, depending on the vehicle location.",
    },
    {
        question: "Can I inspect a vehicle before bidding?",
        answer: "Yes, most listings include detailed photos and descriptions. If in-person inspection is allowed, the listing will mention it along with contact details.",
    },
    {
        question: "Are there any hidden charges?",
        answer: "No, there are no hidden fees. All costs will be clearly communicated before you complete your purchase.",
    },
    {
        question: "How do I know my payment is secure?",
        answer: "We only use verified methods such as bank transfers or wire transfers. Our team handles the process directly to ensure a safe and transparent transaction.",
    },
];

const howItWorks = [
    {
        icon: <User className="h-8 w-8" />,
        title: 'Create Your Account',
        description: 'Sign up in minutes and unlock access to verified vehicles, exclusive offers, and real-time updates.',
        step: '01'
    },
    {
        icon: <CarFront className="h-8 w-8" />,
        title: 'Browse Cars',
        description: 'Explore a wide range of vehicles, check verified details, and shortlist the ones that match your needs.',
        step: '02'
    },
    {
        icon: <Hand className="h-8 w-8" />,
        title: 'Make an Offer',
        description: 'Submit your best offer or secure the car instantly. Once accepted, we will help you finalize the deal.',
        step: '03'
    }
];

const testimonials = [
    {
        name: 'Michael R.',
        review: 'The "Make an Offer" feature was perfect. I got exactly what I wanted for my Porsche 911 without the stress of traditional auctions.',
        rating: 5,
        vehicle: 'Porsche 911 Turbo S'
    },
    {
        name: 'Samantha L.',
        review: 'Buying my dream car was so simple with the "Buy Now" option. The entire process was transparent and hassle-free.',
        rating: 5,
        vehicle: 'Mercedes-Benz G-Class'
    },
    {
        name: 'James K.',
        review: 'Sold my classic Mustang through the platform. The instant "Buy Now" purchase saved me weeks of waiting for bids.',
        rating: 4,
        vehicle: 'Ford Mustang GT'
    },
    {
        name: 'Olivia M.',
        review: 'Made an offer on a BMW M3 and it was accepted within hours. The negotiation process was smooth and fair.',
        rating: 5,
        vehicle: 'BMW M3 Competition'
    },
    {
        name: 'Daniel P.',
        review: 'The "Buy Now" option gave me immediate ownership of my Audi R8. No bidding wars, just straight to purchase.',
        rating: 5,
        vehicle: 'Audi R8 V10'
    },
    {
        name: 'Sophia H.',
        review: 'Loved being able to make offers on multiple vehicles. Ended up securing my dream Range Rover at a great price.',
        rating: 4,
        vehicle: 'Land Rover Range Rover'
    },
    {
        name: 'Christopher B.',
        review: 'As a first-time buyer, the "Make an Offer" system was intuitive. Felt in control of the purchase price.',
        rating: 5,
        vehicle: 'Tesla Model S Plaid'
    },
    {
        name: 'Emma W.',
        review: 'Sold my vintage Corvette with "Buy Now" pricing. Had serious offers within minutes of listing.',
        rating: 5,
        vehicle: 'Chevrolet Corvette Stingray'
    }
];

const HowItWorksSelling = [
    {
        icon: <Upload />,
        title: 'List Your Car',
        description: 'Upload clear photos and key details to get your auction started.'
    },
    {
        icon: <UserCog2 />,
        title: 'Expert Review',
        description: `Each vehicle is reviewed and refined for maximum visibility and buyer trust.`
    },
    {
        icon: <Gavel />,
        title: 'Go Live and Engage',
        description: `Once approved, your car listing goes live for interested buyers to view and interact with.`
    },
    {
        icon: <BadgeCheck />,
        title: 'Secure the Deal',
        description: 'After the auction closes, you and the buyer complete the transaction on agreed terms.'
    }
];

const HowItWorksBuying = [
    {
        icon: <UserPlus />,
        title: 'Create Your Account',
        description: 'Sign up in minutes and set up your profile to access all premium vehicle listings.'
    },
    {
        icon: <Clock />,
        title: 'Browse Cars',
        description: 'Explore verified listings, compare details, and follow vehicles you’re interested in — all with real-time updates.'
    },
    {
        icon: <Gavel />,
        title: 'Make an Offer',
        description: 'Submit an offer, negotiate with the seller, or instantly secure the car using Buy Now — no hidden fees.'
    },
    {
        icon: <BadgeCheck />,
        title: 'Complete the Purchase',
        description: 'Once your offer is accepted or bought the vehicle with buy now option, we finalize payment and collection securely.'
    }
];

const trustedBrands = [
    { src: CaseIH, alt: 'Case IH' },
    { src: Claas, alt: 'Claas' },
    { src: Cummins, alt: 'Cummins' },
    { src: Fendt, alt: 'Fendt' },
    { src: Freightliner, alt: 'Freightliner' },
    { src: Hitachi, alt: 'Hitachi' },
    { src: JCB, alt: 'JCB' },
    { src: JohnDeere, alt: 'John Deere' },
    { src: Komatsu, alt: 'Komatsu' },
    { src: Kubota, alt: 'Kubota' },
    { src: Liebherr, alt: 'Liebherr' },
    { src: MasseyFerguson, alt: 'Massey Ferguson' },
    { src: Mercedes, alt: 'Mercedes' },
    { src: NewHolland, alt: 'New Holland' },
    { src: NokianTyres, alt: 'Nokian Tyres' },
    { src: Peterbilt, alt: 'Peterbilt' },
    { src: Scag, alt: 'Scag' },
    { src: Skania, alt: 'Skania' },
    { src: Stiga, alt: 'Stiga' },
    { src: Timberjack, alt: 'Timberjack' },
    { src: Toro, alt: 'Toro' },
    { src: Toyota, alt: 'Toyota' },
    { src: Volvo, alt: 'Volvo' },
];

// const categoryIcons = [
//     {
//         name: 'Convertible',
//         icon: convertible,
//         type: 'img'
//     },
//     {
//         name: 'Electric',
//         icon: electric,
//         type: 'img'
//     },
//     {
//         name: 'Hatchback',
//         icon: hatchback,
//         type: 'img'
//     },
//     {
//         name: 'Luxury',
//         icon: luxury,
//         type: 'img'
//     },
//     {
//         name: 'Pickup',
//         icon: pickup,
//         type: 'img'
//     },
//     {
//         name: 'Sedan',
//         icon: sedan,
//         type: 'img'
//     },
//     {
//         name: 'Sports',
//         icon: sports,
//         type: 'img'
//     },
//     {
//         name: 'SUV',
//         icon: suv,
//         type: 'img'
//     },
//     {
//         name: 'Van',
//         icon: van,
//         type: 'img'
//     },
//     {
//         name: 'Explore',
//         icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13">
//             <path fill="currentColor" d="M6.5,1A5.5,5.5,0,1,1,1,6.5,5.51,5.51,0,0,1,6.5,1m0-1A6.5,6.5,0,1,0,13,6.5,6.49,6.49,0,0,0,6.5,0Z" />
//             <path fill="currentColor" d="M9.7,5.78V7.15a.07.07,0,0,1-.07.07H7.28V9.57a.07.07,0,0,1-.07.07H5.79a.07.07,0,0,1-.07-.07V7.22H3.37a.07.07,0,0,1-.07-.07V5.78a.1.1,0,0,1,.1-.1H5.72V3.33a.07.07,0,0,1,.07-.07H7.21a.07.07,0,0,1,.07.07V5.68H9.6A.1.1,0,0,1,9.7,5.78Z" />
//         </svg>,
//     }
// ];

function Home() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active'); // 'sold', 'active', 'approved'
    const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

    // Map tab values to API status values
    const tabStatusMap = {
        'sold': 'sold',
        'active': 'active',
        'approved': 'approved'
    };

    const tabTitles = {
        'active': 'Live Auctions',
        'sold': 'Closed Auctions',
        'approved': 'Upcoming Auctions'
    };

    const tabDescriptions = {
        'active': 'Handpicked heavy equipment. Clear bidding. Verified listings. — find your perfect machine today.',
        'sold': 'Learn from past auctions — browse sold and reserve-not-met listings to bid smarter on your next machine.',
        'approved': 'Plan your next move — browse upcoming heavy equipment auctions and build your bidding strategy in advance.'
    };

    const fetchAuctions = async (tab = activeTab, category = null, limit = 4, sortBy = 'highestBid') => {
        setLoading(true);
        try {
            const status = tabStatusMap[tab];
            const params = new URLSearchParams();
            params.append('status', status);
            params.append('limit', limit.toString());
            params.append('sortBy', sortBy);
            if (category && category !== 'all') {
                params.append('category', category);
            }

            const { data } = await axiosInstance.get(`/api/v1/auctions/top?${params}`);
            if (data.success) {
                setAuctions(data.data.auctions);
            }
        } catch (err) {
            console.error('Fetch auctions error:', err);
            toast.error("Failed to load auctions");
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        fetchAuctions(tab);
    };

    useEffect(() => {
        fetchAuctions('active'); // Load sold auctions by default
    }, []);

    const handleLoadByStatus = () => {
        const status = tabStatusMap[activeTab];
        const params = new URLSearchParams();
        params.append('status', status);
        navigate(`/auctions?${params.toString()}`);
    };

    const handleSearchByTitle = (title) => {
        const params = new URLSearchParams();
        if (title === 'Explore') {
            navigate(`/auctions`);
        } else {
            params.append('search', title);
            navigate(`/auctions?${(params.toString()).toLocaleLowerCase()}`);
        }
    }

    return (
        <>
            <Hero />

            {/* Marquee section */}
            <Container>
                <Marquee speed={50} gradient={false}>
                    <div className="flex gap-8 w-full my-14 mr-8">
                        {
                            trustedBrands.map(brand => (
                                <div key={brand.alt} className="flex items-center justify-center border rounded-lg shadow hover:shadow-lg transition-all border-slate-200 p-4 md:p-5">
                                    <img src={brand.src} alt={brand.alt} className="h-6 sm:h-6 md:h-7 lg:h-8 xl:h-9" />
                                </div>
                            ))
                        }
                    </div>
                </Marquee>
            </Container>

            {/* Category section */}
            <CategoryIconsSection />

            {/* Dynamic Auctions section */}
            <Container className="mb-14 flex flex-col">
                <div className="flex items-center justify-between flex-wrap gap-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary order-1">{tabTitles[activeTab]}</h2>
                    <p className="text-sm md:text-base text-gray-500 order-2 md:order-3">
                        {tabDescriptions[activeTab]}
                    </p>
                    <div className="flex items-center  flex-wrap gap-5 order-2 mb-3">
                        <div className="flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-md text-sm">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="options"
                                    id="active"
                                    className="hidden peer"
                                    checked={activeTab === 'active'}
                                    onChange={() => handleTabChange('active')}
                                />
                                <label htmlFor="active" className="cursor-pointer rounded py-2 px-4 sm:px-8 text-[#1e2d3b] transition-colors duration-200 peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:via-amber-500 peer-checked:to-amber-600 peer-checked:text-white">
                                    Live
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="options"
                                    id="sold"
                                    className="hidden peer"
                                    checked={activeTab === 'sold'}
                                    onChange={() => handleTabChange('sold')}
                                />
                                <label htmlFor="sold" className="cursor-pointer rounded py-2 px-4 sm:px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:via-amber-500 peer-checked:to-amber-600 peer-checked:text-white">
                                    Closed
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="options"
                                    id="approved"
                                    className="hidden peer"
                                    checked={activeTab === 'approved'}
                                    onChange={() => handleTabChange('approved')}
                                />
                                <label htmlFor="approved" className="cursor-pointer rounded py-2 px-4 sm:px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:via-amber-500 peer-checked:to-amber-600 peer-checked:text-white">
                                    Upcoming
                                </label>
                            </div>
                        </div>

                        {/* Add this view mode toggle */}
                        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                                title="Grid View"
                            >
                                <Grid size={18} className={viewMode === "grid" ? "text-orange-600" : "text-gray-500"} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                                title="List View"
                            >
                                <List size={18} className={viewMode === "list" ? "text-orange-600" : "text-gray-500"} />
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    // Loading Skeleton based on view mode
                    viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-8">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                                    <div className="flex justify-between">
                                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // List View Loading Skeleton
                        <div className="space-y-2 mt-8">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                                    <div className="flex flex-col lg:flex-row gap-5">
                                        <div className="lg:w-64">
                                            <div className="h-48 bg-gray-200 rounded-lg"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                {Array.from({ length: 4 }).map((_, i) => (
                                                    <div key={i} className="space-y-2">
                                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                                        <div className="h-5 bg-gray-200 rounded w-16"></div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <>
                        {auctions.length > 0 ? (
                            viewMode === "grid" ? (
                                // Grid View
                                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-10 mt-8">
                                    {auctions.map((auction) => (
                                        <AuctionCard
                                            key={auction._id}
                                            auction={auction}
                                        />
                                    ))}
                                </section>
                            ) : (
                                // List View using AuctionListItem component
                                <div className="space-y-2 mt-8">
                                    {auctions.map((auction) => (
                                        <AuctionListItem
                                            key={auction._id}
                                            auction={auction}
                                        />
                                    ))}
                                </div>
                            )
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <Filter size={48} className="mx-auto mb-4 text-gray-300" />
                                <p className="text-lg font-medium">No auctions found</p>
                                <p className="text-sm">Try adjusting your filters or search terms</p>
                            </div>
                        )}

                        {/* Add this View More button section */}
                        {auctions.length > 0 && (
                            <button
                                onClick={handleLoadByStatus}
                                className="px-8 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white font-medium rounded-lg hover:bg-gradient-to-r hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 mt-10 mx-auto"
                            >
                                View More
                            </button>
                        )}
                    </>
                )}
            </Container>

            {/* Who we are section */}
            <Container className="mb-8 md:mb-0">
                <About />
            </Container>

            <Container className="">
                <HowItWorks />
            </Container>

            {/* Testimonials */}
            <Container>
                <Suspense fallback={<LoadingSpinner />}>
                    <TestimonialSection />
                </Suspense>
            </Container>

            {/* <Container className="my-14">
                <Suspense fallback={<LoadingSpinner />}>
                    <FAQs faqs={faqs} />
                </Suspense>
            </Container> */}

            <CTA />
        </>
    )
}

export default Home;