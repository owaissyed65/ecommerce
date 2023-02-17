const Productreducer = (state, action) => {
    switch (action.type) {
        case "LOADING_TYPE":
            return {
                ...state,
                isLoading: true
            }
        case "SET_API_PRODUCTS":
            const featuredProducts = action.payload.filter(currEle => { return currEle.featured === true })
            return {
                ...state,
                isLoading: false,
                isError: false,
                products: action.payload,
                featuredProducts: featuredProducts
            }
        case "ERROR_TYPE":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case 'SINGLE_LOADING_TYPE':
            return {
                ...state,
                isSingleLoading: true
            }
        case 'SINGLE_PRODUCT':
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload
            }
        case 'SINGLE_ERROR_TYPE':
            return {
                ...state,
                isSingleError: true
            }
        default:
            return state
    }
}
export default Productreducer
export const filterProductReducer = (state, action) => {
    switch (action.type) {

        case 'FILTER_TYPE':
            let priceValue = action.payload.map((curEle) => {
                return curEle.price
            }
            )
            // console.log(Math.max(...priceValue), "hello");
            // console.log(Math.min(...priceValue), "hello1");
            return {
                ...state,
                filterProduct: [...action.payload],
                allProduct: [...action.payload],
                search_filter: {
                    ...state.search_filter,
                    maxPrice: Math.max(...priceValue),
                    minPrice: Math.min(...priceValue)
                }
            }
        case 'GRID_VIEW_TYPE':
            return {
                ...state,
                grid_View: true
            }
        case 'List_VIEW_TYPE':
            return {
                ...state,
                grid_View: false
            }
        case 'SORT_TYPE':
            return {
                ...state,
                sort_value: action.payload
            }
        case 'SORT_VALUE_TYPE':
            let newSortData = [];
            let tempData = [...state.filterProduct]
            const sortDataFunc = (a, b) => {
                if (state.sort_value === 'a-z') {
                    return a.name.localeCompare(b.name)
                }
                if (state.sort_value === 'z-a') {
                    return b.name.localeCompare(a.name)
                }
                if (state.sort_value === 'lowest') {
                    return a.price - b.price
                }
                if (state.sort_value === 'highest') {
                    return b.price - a.price
                }
            }
            newSortData = tempData.sort(sortDataFunc)
            return {
                ...state,
                filterProduct: newSortData
            }
        case 'SEARCH_TYPE':
            let { name, value } = action.payload;
            return {
                ...state,
                search_filter: {
                    ...state.search_filter,
                    [name]: value
                }
            }
        case 'SEARCH_FILTER_VALUE':
            let tempSearchData = state.allProduct;
            if (state.search_filter.text)
                tempSearchData = tempSearchData.filter((curELe) => {
                    return curELe.name.toLowerCase().includes(state.search_filter.text.toLowerCase())
                })
            if (state.search_filter.category !== 'all') {
                tempSearchData = tempSearchData.filter((curELe) => {
                    return curELe['category'].includes(state.search_filter.category)
                })
            }
            if (state.search_filter.company !== "all") {
                tempSearchData = tempSearchData.filter(
                    (curElem) => { return curElem.company.toLowerCase().includes(state.search_filter.company.toLowerCase()) }
                );
            }
            if (state.search_filter.color !== 'all') {
                tempSearchData = tempSearchData.filter((curEle) => {
                    return curEle.colors.includes(state.search_filter.color)
                })
            }
            if (state.search_filter.category === 'ALL' || state.search_filter.company === 'ALL' || state.search_filter.color === 'ALL') {
                tempSearchData = state.allProduct
            }
            if (state.search_filter.price) {
                tempSearchData = tempSearchData.filter((curELe) => {
                    return curELe.price <= state.search_filter.price
                })
            }
            return {
                ...state,
                filterProduct: tempSearchData
            }
        case 'CLEAR_FILTER':
            const allData = state.allProduct;

            return {
                ...state,
                filterProduct: allData,
                search_filter: {
                    text: '',
                    category: 'all',
                    company: 'all',
                    color: 'all',
                    price: 0,
                    minPrice: 0,
                    maxPrice: Math.max(...allData.map((curEle) => {
                        return curEle.price
                    })),
                }
            }
        default:
            return state
    }

}
export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'CART_TYPE':
            const { id, product, color, price, amount, stock } = action.payload
            console.log(product)
            let cartProduct = {
                id: id + color,
                name: product.name,
                image: product.image[0].url,
                color: color,
                price: price,
                amount: amount
            }
            return {
                ...state,
                cartItem: [...state.cartItem, cartProduct]
            }
        default:
            return state;
    }
}