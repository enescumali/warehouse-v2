function ErrorMessage({message, onErrorAction, className, dataTestId}) {
    return (
        <div className={`text-red-900 text-sm py-1 ${className}`} data-testid={dataTestId}>
            {message} <button className="anchor-button" data-testid="tryAgainButton" onClick={onErrorAction}>Try again</button>
        </div>
    )
}

export default ErrorMessage;
