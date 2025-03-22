import React from "react";

const PageTitle = ({
  title = "IGREJA EVANGÉLICA RESTITUI",
  subtitle = "",
  className = "uppercase",
  align = "center",
}) => {
  return (
    <div className={`page-title my-6 ${className}`}>
      <h1
        className={`text-2xl md:text-2xl font-bold text-${align} text-[var(--main-color)]`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={`text-lg mt-2 text-${align} text-gray-600`}>{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
