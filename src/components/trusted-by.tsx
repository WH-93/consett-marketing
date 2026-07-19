import React from 'react';

const trustedBrands = [
  'Ross Webster Tree Services',
  'BC Financial Search',
  'Keating Heating & Plumbing',
  'BC Electrical',
  'Tees Valley Lawn Care',
  'Brew & Co.',
  'Iron Forge Gym',
  'Meridian Law',
];

export function TrustedBy() {
  return (
    <section className="trusted-by" aria-label="Trusted by these companies">
      <p className="trusted-by-heading">Trusted by</p>
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
