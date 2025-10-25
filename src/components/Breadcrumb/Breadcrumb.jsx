import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li
              className={`breadcrumb-item ${
                index === items.length - 1 ? 'active' : ''
              }`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {index === items.length - 1 || !item.link ? (
                item.label
              ) : (
                <a href={item.link}>{item.label}</a>
              )}
            </li>

            {index < items.length - 1 && (
              <li className="breadcrumb-separator">›</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
