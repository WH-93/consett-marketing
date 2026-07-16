import React from 'react';
import { BcIcon } from '@/components/bc-icon';

interface ContactItem {
  icon: 'mail' | 'phone' | 'location';
  label: string;
  value: string;
  href: string | null;
}

export function ContactCard({ contacts }: { contacts: ContactItem[] }) {
  return (
    <div className="bg-white border border-navy/10 rounded-card shadow-card p-7 sm:p-10">
      <div className="space-y-7">
        {contacts.map(item => (
          <div key={item.label} className="flex items-center gap-5">
            <div className="icon-circle-sm text-gold shrink-0">
              <BcIcon name={item.icon} size={18} strokeWidth={1.4} />
            </div>
            <div>
              <p className="eyebrow mb-1">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-navy text-sm sm:text-base hover:text-gold transition-colors break-words">
                  {item.value}
                </a>
              ) : (
                <p className="text-navy text-base break-words">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-navy/10">
        <p className="text-sm leading-7 text-navy/60">
          We aim to respond within one business day. Share the outcome you want and we will suggest the clearest next step.
        </p>
      </div>
    </div>
  );
}
