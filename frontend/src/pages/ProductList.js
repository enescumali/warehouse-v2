import {useEffect, useState, useRef} from 'react';
import CONSTANTS from '../constants';
import ErrorMessage from '../components/ErrorMessage';
import LoadingState from '../components/LoadingState';
import ProductListItem from '../components/ProductListItem';

function ProductList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [tryAgain, setTryAgain] = useState(false);
    const isMountedRef = useRef(null);
    
    useEffect(() => {
        isMountedRef.current = true;  
        const controller = new AbortController();
        const signal = controller.signal;

        setIsLoaded(false);
        setError(null);
        setTryAgain(false);

        fetch(`${CONSTANTS.apiUrl}/products`, {signal})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong getting the product list, we are on it!');
                }
            })
            .then((result) => {
                if(isMountedRef.current){
                    setIsLoaded(true);
                    setProducts(result);
                }
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Fetch successfully aborted');
                } else {
                    setIsLoaded(false);
                    setError(error.message);
                }
            });

            return () => {
                isMountedRef.current = false;
                controller.abort();
            };

    }, [tryAgain]);

    const handleSubstractArticle = () => {
        // In order to keep the product list consistent after substracting articles
        // we need to re-render the list
        setTryAgain(true);    
    }

    if (error) {
        return <ErrorMessage onErrorAction={() => setTryAgain(true)} message={error}></ErrorMessage>
    }  
      
    if (!isLoaded) {
        return <LoadingState type={'productList'}></LoadingState>;
    } 
    
    return (
        <>
            <ul className="list">
                {products.map(product => (
                    <li key={product.id} className="border-b py-6">
                        <ProductListItem product={product} onSubstractArticle={handleSubstractArticle}></ProductListItem>
                    </li>
                ))}
            </ul>
        </>
        
    )
}

export default ProductList;
