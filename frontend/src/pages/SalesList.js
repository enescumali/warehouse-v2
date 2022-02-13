import {useEffect, useState, useRef} from 'react';
import CONSTANTS from '../constants';
import SalesListItem from '../components/SalesListItem';
import ErrorMessage from '../components/ErrorMessage';
import LoadingState from '../components/LoadingState';

function SalesList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sales, setSales] = useState([]);
    const [tryAgain, setTryAgain] = useState(false);
    const isMountedRef = useRef(null);

    useEffect(() => {
        isMountedRef.current = true;  
        const controller = new AbortController();
        const signal = controller.signal;
        setIsLoaded(false);
        setError(null);
        
        fetch(`${CONSTANTS.apiUrl}/sales`, {signal})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong getting the sales list, we are on it!');
                }
            })
            .then((result) => {
                if(isMountedRef.current){
                    setIsLoaded(true);
                    setSales(result);
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

    }, [tryAgain])
  
    if (error) {
        return <ErrorMessage onErrorAction={() => setTryAgain(true)} message={error}></ErrorMessage>
    }
    
    if (!isLoaded) {
        return <LoadingState type={'productList'}></LoadingState>;
    } 
      
    return (
        <ul className="my-4 list">
            {sales.map(sale => (
                <li key={sale.id} className="border-b py-4">
                    <SalesListItem productId={sale.productId}></SalesListItem>
                    
                    <p className="mt-2">Quantity: {sale.amountSold}</p>
                    <p className="text-xs mt-1">{new Date(sale.createdAt).toLocaleString()}</p>
                </li>
            ))}
        </ul>
    );
}

export default SalesList;
