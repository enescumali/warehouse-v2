import { Link, useMatch, useResolvedPath } from "react-router-dom";
import PropTypes from "prop-types";

function CustomLink({ children, to, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link className={match ? "selected" : ""} to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}
// TODO

CustomLink.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
  props: PropTypes.array,
};

export default CustomLink;
