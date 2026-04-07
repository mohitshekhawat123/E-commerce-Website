import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Clock, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '../../hooks/useDebounce'

import { MOCK_PRODUCTS } from '../../data/mockProducts'

const SearchBar = ({ isMobile = false }) => {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [results, setResults] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [recentSearches, setRecentSearches] = useState([])

    const debouncedQuery = useDebounce(query, 400)
    const wrapperRef = useRef(null)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    // Load recent searches from LocalStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('crag_recent_searches')
            if (saved) setRecentSearches(JSON.parse(saved))
        } catch (e) { console.error('Failed to load recent searches') }
    }, [])

    // Handle outside clicks to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Filter effect based strictly on the debounced value
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([])
            return
        }

        const lowerQuery = debouncedQuery.toLowerCase()

        // Simulating API filtering logic mapping against name and category
        const filtered = MOCK_PRODUCTS.filter((product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        ).slice(0, 5) // Cap at 5 results for dropdown UI

        setResults(filtered)
        setSelectedIndex(-1) // Reset selection when results change
    }, [debouncedQuery])

    const saveRecentSearch = (term) => {
        if (!term.trim()) return
        const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5)
        setRecentSearches(updated)
        localStorage.setItem('crag_recent_searches', JSON.stringify(updated))
    }

    const handleNavigate = (productId, productName = '') => {
        if (productName) saveRecentSearch(productName)
        setIsFocused(false)
        setQuery('')
        navigate(`/product/${productId}`)
    }

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ?
                        <span key={i} className="text-black font-bold">{part}</span> : part
                )}
            </span>
        );
    };

    const onKeyDown = (e) => {
        if (!isFocused) return

        // Limit index to max rows in dropdown (either results length or recent search length)
        const listLength = debouncedQuery.trim() ? results.length : recentSearches.length

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev < listLength - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev))
        } else if (e.key === 'Enter') {
            e.preventDefault()

            if (selectedIndex >= 0) {
                if (debouncedQuery.trim() && results.length > 0) {
                    handleNavigate(results[selectedIndex].id, results[selectedIndex].name)
                } else if (!debouncedQuery.trim() && recentSearches.length > 0) {
                    // Simulate a click on 'recent search'
                    setQuery(recentSearches[selectedIndex])
                    inputRef.current?.focus()
                }
            } else if (debouncedQuery.trim()) {
                // If pressing enter dynamically without selection, just hit standard search page
                saveRecentSearch(debouncedQuery)
                navigate(`/products?search=${encodeURIComponent(debouncedQuery)}`)
                setIsFocused(false)
            }
        } else if (e.key === 'Escape') {
            setIsFocused(false)
            inputRef.current?.blur()
        }
    }

    return (
        <div className={`relative w-full ${isMobile ? 'max-w-none' : 'max-w-[200px] xl:max-w-[250px] mr-2'}`} ref={wrapperRef}>
            <Search className={`absolute left-3 ${isMobile ? 'top-3.5' : 'top-2.5'} h-4 w-4 ${isFocused ? 'text-[#111111]' : 'text-gray-400'} transition-colors duration-200 z-40`} />

            <Input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={onKeyDown}
                className={`w-full rounded-xl pl-10 pr-10 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-gray-300 bg-[#f8f8f8] border-gray-200 ${isMobile ? 'h-11 text-base' : 'h-9 text-sm'} relative z-30 transition-all`}
            />

            {/* Clear Button */}
            {query && (
                <button
                    onClick={() => {
                        setQuery('')
                        inputRef.current?.focus()
                    }}
                    className={`absolute ${isMobile ? 'top-3.5 right-3' : 'top-2.5 right-3'} text-gray-400 hover:text-black transition-colors z-40`}
                >
                    <X className="h-4 w-4" />
                </button>
            )}

            {/* Dropdown Menu Overlay */}
            {isFocused && (
                <div className={`absolute left-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 ${isMobile ? 'w-full' : 'w-[300px] lg:w-[350px]'}`}>

                    {/* Searching State */}
                    {query.trim() !== debouncedQuery.trim() && (
                        <div className="p-4 text-center text-sm text-gray-500 animate-pulse">
                            Searching...
                        </div>
                    )}

                    {/* Results State */}
                    {query.trim() === debouncedQuery.trim() && debouncedQuery.trim() && results.length > 0 && (
                        <div className="py-2">
                            <div className="px-4 py-2 text-xs font-bold tracking-wider text-gray-400 uppercase">Products</div>
                            <ul className="max-h-[360px] overflow-y-auto">
                                {results.map((product, idx) => (
                                    <li key={product.id}>
                                        <button
                                            onClick={() => handleNavigate(product.id, product.name)}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${selectedIndex === idx ? 'bg-[#f8f8f8]' : 'hover:bg-[#f8f8f8]'}`}
                                        >
                                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md bg-gray-100 shrink-0" />
                                            <div className="flex flex-col flex-1 overflow-hidden">
                                                <span className="text-sm font-medium text-[#111111] truncate">
                                                    {highlightText(product.name, debouncedQuery)}
                                                </span>
                                                <span className="text-xs text-gray-500">{product.category}</span>
                                            </div>
                                            <span className="text-sm font-bold text-[#111111] shrink-0">₹{product.price}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-3 bg-gray-50 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        saveRecentSearch(debouncedQuery)
                                        navigate(`/products?search=${encodeURIComponent(debouncedQuery)}`)
                                        setIsFocused(false)
                                    }}
                                    className="w-full text-center text-sm font-semibold text-[#111111] hover:underline"
                                >
                                    View all results for "{debouncedQuery}" <ArrowRight className="inline-block w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* No Results State */}
                    {query.trim() === debouncedQuery.trim() && debouncedQuery.trim() && results.length === 0 && (
                        <div className="p-8 text-center">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="text-sm font-semibold text-[#111111] mb-1">No products found</p>
                            <p className="text-xs text-gray-500">Try adjusting your spelling or using more general terms.</p>
                        </div>
                    )}

                    {/* Recent Searches State (when input is empty) */}
                    {!debouncedQuery.trim() && recentSearches.length > 0 && (
                        <div className="py-2">
                            <div className="flex items-center justify-between px-4 py-2">
                                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Recent Searches</span>
                                <button
                                    onClick={() => {
                                        setRecentSearches([])
                                        localStorage.removeItem('crag_recent_searches')
                                    }}
                                    className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                            <ul>
                                {recentSearches.map((term, idx) => (
                                    <li key={term}>
                                        <button
                                            onClick={() => {
                                                setQuery(term)
                                                inputRef.current?.focus()
                                            }}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${selectedIndex === idx ? 'bg-[#f8f8f8]' : 'hover:bg-[#f8f8f8]'}`}
                                        >
                                            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="text-sm text-[#111111] truncate">{term}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Default State (Empty input, No Recents) */}
                    {!debouncedQuery.trim() && recentSearches.length === 0 && (
                        <div className="p-6 text-center">
                            <p className="text-sm text-gray-500">Start typing to search for clothing, brands, and categories.</p>
                        </div>
                    )}

                </div>
            )}
        </div>
    )
}

export default SearchBar
