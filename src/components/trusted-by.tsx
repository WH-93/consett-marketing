import React from 'react';

const placeholderCount = 6;

export function TrustedBy() {
  return (
    <section className="trusted-by" aria-label="Trusted by these companies">
      <p className="trusted-by-heading">Trusted by</p>
      <div className="trusted-by-logos">
        {Array.from({ length: placeholderCount }).map((_, i) => (
          <div key={i} className="trusted-by-placeholder" aria-hidden="true" />
        ))}
      </div>
    </section>
  );
}
