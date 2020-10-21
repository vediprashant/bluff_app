import React from "react";

import { Link } from "react-router-dom";

import "./notFoundPage.css";

const NotFoundPage = () => (
  <div className="notFound">
    <div className="code">
      <span>Oops! 404</span>
    </div>
    <div className="redirect">
      <Link to="/">Go Home</Link>
    </div>
  </div>
);

export default NotFoundPage;
