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
      <p className="trusted-by-heading">Over 14 years&rsquo; combined experience</p>
      <p className="trusted-by-sub">Before launching Consett Marketing, we built our experience across a range of in-house roles. Here are some of the brands and organisations we&rsquo;ve worked with or contributed to projects for:</p>
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
