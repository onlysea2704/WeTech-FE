import { useState, useEffect } from 'react';

const PROVINCES_URL = 'https://production.cas.so/address-kit/latest/provinces';
const COMMUNES_URL = (code) => `https://production.cas.so/address-kit/latest/provinces/${code}/communes`;

// Cache provinces globally to avoid repeated fetches across component instances
let cachedProvinces = null;
let provincesFetchPromise = null;

async function getProvincesOnce() {
    if (cachedProvinces) return cachedProvinces;
    if (!provincesFetchPromise) {
        provincesFetchPromise = fetch(PROVINCES_URL)
            .then(r => r.json())
            .then(data => {
                cachedProvinces = data.provinces || [];
                return cachedProvinces;
            });
    }
    return provincesFetchPromise;
}

/**
 * useFetchAddress
 *
 * Dùng ở component cha (ví dụ GiayDeNghi) để lấy danh sách tỉnh/xã.
 * - Provinces được cache toàn cục → chỉ fetch 1 lần dù có nhiều AddressSelect.
 * - Communes được fetch khi provinceCode thay đổi.
 *
 * @param {string} provinceCode - Mã tỉnh (code) để fetch communes. Truyền '' nếu chưa chọn.
 * @returns {{ provinces: Array, communes: Array, loadingProvinces: boolean, loadingCommunes: boolean }}
 */
export function useFetchAddress(provinceCode = '') {
    const [provinces, setProvinces] = useState(cachedProvinces || []);
    const [communes, setCommunes] = useState([]);
    const [loadingProvinces, setLoadingProvinces] = useState(!cachedProvinces);
    const [loadingCommunes, setLoadingCommunes] = useState(false);

    // Fetch provinces once
    useEffect(() => {
        if (cachedProvinces) {
            setProvinces(cachedProvinces);
            setLoadingProvinces(false);
            return;
        }
        setLoadingProvinces(true);
        getProvincesOnce()
            .then(data => {
                setProvinces(data);
            })
            .catch(err => console.error('[useFetchAddress] provinces error:', err))
            .finally(() => setLoadingProvinces(false));
    }, []);

    // Fetch communes when provinceCode changes
    useEffect(() => {
        if (!provinceCode) {
            setCommunes([]);
            return;
        }
        setLoadingCommunes(true);
        fetch(COMMUNES_URL(provinceCode))
            .then(r => r.json())
            .then(data => setCommunes(data.communes || []))
            .catch(err => console.error('[useFetchAddress] communes error:', err))
            .finally(() => setLoadingCommunes(false));
    }, [provinceCode]);

    return { provinces, communes, loadingProvinces, loadingCommunes };
}
