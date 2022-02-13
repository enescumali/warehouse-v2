import {useEffect, useState, useCallback, useRef} from 'react';
import CONSTANTS from '../constants';
import ErrorMessage from './ErrorMessage';
import ArticleListItem from './ArticleListItem';

function ProductListItem({product, onSubstractArticle}) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaleSuccessful, setIsSaleSuccessful] = useState(null);
    const [isSaleRequested, setIsSaleRequested] = useState(false);
    const [articles, setArticles] = useState([]);
    const [failedArticles, setFailedArticles] = useState([]);
    const [substractArticles, setSubstractArticles] = useState(false);
    const [canSale, setCanSale] = useState(false);
    const [productQuantity, setProductQuantity] = useState(0);
    const isMountedRef = useRef(null);

    useEffect(() => {
        isMountedRef.current = true;  
        return () => { 
            isMountedRef.current = false; 
        }; 
    }, []);

    const createSale = useCallback(productId => {
        setIsSaleRequested(true);
        setIsLoading(true);
        setError(null);
        setIsSaleSuccessful(null);
        setCanSale(false);

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, amountSold: 1 })
        };

        fetch(`${CONSTANTS.apiUrl}/sales`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong creating the sale, we are on it!');
                }
            })
            .then((result) => {
                // result is not directly used here but better to keep this way
                if(isMountedRef.current){
                    setIsLoading(false);
                    setIsSaleSuccessful(true);
                    setArticles([]);
                    setFailedArticles([]);
                    setSubstractArticles(true);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.message);
                setIsSaleSuccessful(false);
            });
    }, []);

    useEffect(() => {
        let isAllarticlesLoaded = product.articles.length === articles.length; // don't know why that causes a compile warning

        if(isAllarticlesLoaded && failedArticles.length === 0) {
            if(substractArticles) {
                onSubstractArticle(); 
            }
            setCanSale(true);
        } else {
            setCanSale(false);
        }
    }, [failedArticles, articles]);

    useEffect(() => {
        if(canSale) {
            calculateProductQuantity();
        }
    }, [canSale]);

    const calculateProductQuantity = () => {
        const productQuantities = articles.reduce((total, article) => {
            total.push(Math.floor(article.inStock / article.required))
            return total;
        }, []);
        
        const productQuantity = Math.min(...productQuantities);
        
        setProductQuantity(productQuantity);

        if(productQuantity < 1) {
            setCanSale(false);
        }
    };

    const handleArticleStatus = (isSuccessful, articleObj) => {
        if(!isSuccessful) {
            //  extract failed article first from the failedArticles list
            let filteredFailedArticles = failedArticles.filter(article => {
                return article.id !== articleObj.id;
            });

            // then add it in the list the avoid double-record
            setFailedArticles([...filteredFailedArticles, articleObj]);
            
            // as the article is failed, it needs to removed from succesful ones
            let filteredArticles = articles.filter(article => {
                return article.id !== articleObj.id;
            });
            
            // then add it in the successful ones
            setArticles(filteredArticles)
        } else {
            let filteredFailedArticles = failedArticles.filter(article => {
                return article.id !== articleObj.id;
            });
            
            setFailedArticles(filteredFailedArticles);

            let filteredArticles = articles.filter(article => {
                return article.id !== articleObj.id;
            });
            
            setArticles([...filteredArticles, articleObj])
        }
    }
    
    return (
        <div>
            <div>
                <strong className="block mb-4 text-2xl">
                    <span className='relative'>
                        <span>
                            {product.name} 
                        </span>
                        
                        {productQuantity > 0 && canSale
                            ? <span className='quantity-badge'>{productQuantity}</span>
                            : ''
                        }
                    </span>        
                </strong>
                <ul className="py-2">
                    {product.articles.map(article => (
                        <li key={article.id}>
                            <ArticleListItem 
                                key={article.id} 
                                article={article} 
                                onStatusChange={handleArticleStatus}
                                substractArticles={substractArticles}>
                            </ArticleListItem>
                        </li>
                    ))}
                </ul> 
            </div>
            <div className="items-center md:flex">
                <button className={'justify-center mb-2 md:mb-0 md:mr-2 primary-button sm:w-auto w-full ' + (isLoading ? 'loading' : '')} 
                        onClick={() => createSale(product.id)} 
                        disabled={!canSale}>
                    <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text">Create sale</span>
                </button>
                
                {isSaleRequested && !isLoading 
                    ?   <div>
                            {isSaleSuccessful 
                                ? <p className="text-green-900 text-sm">Sale created succesfully! Product list will be updated accordingly... </p> 
                                : <ErrorMessage message={error} onErrorAction={() => createSale(product.id)}></ErrorMessage>}
                        </div>
                    :   ''
                }
 
            </div>
        </div>
    );
}

export default ProductListItem;
