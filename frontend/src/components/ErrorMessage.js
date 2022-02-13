function ErrorMessage({message, onErrorAction, className, dataTestId}) {
    const handleErrorAction = () => {
        onErrorAction();
    }
  
    return (
        <div className={`text-red-900 text-sm py-1 ${className}`} data-testid={dataTestId}>
            {message} <button className="anchor-button" onClick={handleErrorAction}>Try again</button>
        </div>
    )
}

export default ErrorMessage;
