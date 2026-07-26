import React from 'react';

const trustedBrands = [
  'Nurofen',
  'Percy Hedley Foundation',
  'Accenture',
  'Make a Wish Foundation',
  'Northumbrian Water',
  'Clearly Drinks',
  'Anglian Water',
  'HMRC',
  'Newcastle University',
  'Northumbria Spring',
];

export function TrustedBy() {
  return (
    <section className="trusted-by" aria-label="Companies we have worked with">
      <p className="trusted-by-heading">We have over 14 years combined experience. Here are some of the companies we helped during our various roles</p>
      <div className="trusted-by-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div key={group} className="trusted-by-group">
            {trustedBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
