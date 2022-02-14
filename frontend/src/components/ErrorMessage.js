import PropTypes from "prop-types";

function ErrorMessage({ message, onErrorAction, className, dataTestId }) {
  return (
    <div
      className={`text-red-900 text-sm py-1 ${className}`}
      data-testid={dataTestId}
    >
      {message}{" "}
      <button
        className="anchor-button"
        data-testid="tryAgainButton"
        onClick={onErrorAction}
      >
        Try again
      </button>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onErrorAction: PropTypes.func,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
};

export default ErrorMessage;
