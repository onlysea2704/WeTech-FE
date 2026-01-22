import React, { createContext, useState, useEffect, useContext } from "react";
import { authAxios } from "../services/axios-instance";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            setCartCount(0);
            return;
        }
        try {
            const response = await authAxios.get("/cart/get-item");
            if (response.data && Array.isArray(response.data)) {
                // Filter out null items if any, similar to CartPage logic
                const validItems = response.data.filter((item) => item !== null);
                setCartCount(validItems.length);
            } else {
                setCartCount(0);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
            // Don't reset to 0 here to avoid flickering if it's just a temporary network error,
            // but if desired, we could. For now, keep as is.
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    return <CartContext.Provider value={{ cartCount, fetchCartCount }}>{children}</CartContext.Provider>;
};
