import React from 'react';

const tickerItems = [
  'Web Design',
  'SEO',
  'Brand Strategy',
  'Content & Copy',
  'Local Search',
  'Landing Pages',
  'Positioning',
  'Analytics',
];

export function ScrollingTicker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div key={group} className="ticker-group">
            {tickerItems.map((item) => <span key={item}>{item}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
