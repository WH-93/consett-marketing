import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

type LogoVariant = 'full' | 'white' | 'compact';

interface BcLogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
}

const sources: Record<LogoVariant, string> = {
  full: siteConfig.logo.full,
  white: siteConfig.logo.white,
  compact: siteConfig.logo.compact,
};

const heights: Record<LogoVariant, number> = siteConfig.logo.heights;
const aspectRatios: Record<LogoVariant, number> = {
  full: 592 / 206,
  white: 318 / 166,
  compact: 1,
};

export function BcLogo({ variant = 'full', height, className }: BcLogoProps) {
  const h = height ?? heights[variant];
  const w = Math.round(h * aspectRatios[variant]);

  return (
    <Image
      src={sources[variant]}
      alt={siteConfig.logo.alt}
      width={w}
      height={h}
      sizes="(min-width: 1024px) 300px, 220px"
      style={{ height: h, width: 'auto' }}
      className={className}
      priority
    />
  );
}
