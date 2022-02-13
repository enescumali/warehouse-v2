import {useEffect, useState, useRef} from 'react';
import CONSTANTS from '../constants';
import ErrorMessage from './ErrorMessage';
import LoadingState from './LoadingState';

function ArticleListItem({article, onStatusChange, substractArticles}) {
    const [error, setError] = useState(null);
    const [substractError, setSubstractError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(null);
    const [articleDetail, setArticleDetail] = useState({});
    const [tryAgain, setTryAgain] = useState(false);
    const [trySubsctractAgain, setTrySubsctractAgain] = useState(false);
    const isMountedRef = useRef(null);

    useEffect(() => {
        isMountedRef.current = true;  
        setIsLoaded(false);
        setError(null);
        setIsSuccessful(null);
        setTryAgain(false);
        
        fetch(`${CONSTANTS.apiUrl}/articles/${article.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong getting the article, we are on it');
                }
            })
            .then((result) => {
                if(isMountedRef.current){
                    setArticleDetail(result);
                    setIsSuccessful(true);
                    setIsLoaded(true); 
                }
            })
            .catch((error) => {
                setError(error.message);
                setIsSuccessful(false);
                setIsLoaded(true);    
            });
            
            return () => {
                isMountedRef.current = false;
            };

    }, [tryAgain])

    useEffect(() => {
        if(isSuccessful !== null) {
            const articleDetailToSend = {
                id: article.id,
                name: articleDetail.name,
                inStock: articleDetail.amountInStock,
                required: article.amountRequired
            }
            
            onStatusChange(isSuccessful, articleDetailToSend);
        }
    }, [isSuccessful]);

    useEffect(() => {
        if(substractArticles || trySubsctractAgain) {
            setIsLoaded(false);
            setSubstractError(null);
            setIsSuccessful(null);
            setTrySubsctractAgain(false);

            const requestOptions = {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({ amountToSubtract: article.amountRequired })
            };

            fetch(`${CONSTANTS.apiUrl}/articles/${article.id}`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong substracting the article, we are on it');
                    }
                })
                .then((result) => {
                    setArticleDetail(result);
                    setIsSuccessful(true);
                    setIsLoaded(true); 
                })
                .catch((error) => {
                    setSubstractError(error.message);
                    setIsSuccessful(false);
                    setIsLoaded(true);    
                });    
        }
    }, [substractArticles, trySubsctractAgain])
    
    if (error) {
        return <ErrorMessage className="mb-10" dataTestId="errorMessage" onErrorAction={() => setTryAgain(true)} message={error}></ErrorMessage>
    } 

    if (substractError) {
        return <ErrorMessage className="mb-10" dataTestId="errorMessage" onErrorAction={() => setTrySubsctractAgain(true)} message={substractError}></ErrorMessage>
    } 

    if (!isLoaded) {
        return <LoadingState type={'article'}></LoadingState>;
    } 
    
    return (
            <div className="mb-6">
                <p className="font-bold" data-testid="articleName">{articleDetail.name}</p> 
                <span className="font-light text-xs mr-2">
                   
                    {articleDetail.amountInStock > 0 
                        ? 
                        <>
                            <span className="w-2 h-2 bg-green-700 inline-block rounded mr-2"></span> 
                            <span data-testid="articleAmount">In stock ({articleDetail.amountInStock})</span>  
                        </>
                        : 
                        <>
                            <span className="w-2 h-2 bg-red-700 inline-block rounded mr-2"></span> 
                            <span data-testid="articleAmount">Out of stock</span>  
                        </>
                    }
                    
                </span>
                <span className="font-light italic text-xs" data-testid="articleRequired"> Required: {article.amountRequired}</span> 
            </div>
        );
}

export default ArticleListItem;
