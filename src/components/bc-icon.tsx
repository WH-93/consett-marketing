import React from 'react';
import { SVGProps } from 'react';
import {
  Users,
  Search,
  Crosshair,
  ShieldCheck,
  Star,
  Handshake,
  Building2,
  User,
  MapPin,
  Mail,
  Phone,
  Clock,
  ClipboardList,
  Leaf,
  TreePine,
  Scissors,
  CircleArrowDown,
  BadgeCheck,
  Lock,
  Globe,
  PenTool,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';

// Lucide-based icon set — consistent 2px strokes, 24×24 viewBox, designer-drawn
// Retains the original BcIconName API so no profile changes are needed

const icons: Record<string, LucideIcon> = {
  people: Users,
  search: Search,
  target: Crosshair,
  shield: ShieldCheck,
  star: Star,
  handshake: Handshake,
  building: Building2,
  person: User,
  location: MapPin,
  mail: Mail,
  phone: Phone,
  clock: Clock,
  clipboard: ClipboardList,
  leaf: Leaf,
  tree: TreePine,
  branch: Scissors,        // pruning metaphor
  stump: CircleArrowDown,   // grinding down into the ground
  mountain: MapPin,        // "Local" — map pin is more accurate than mountain for County Durham
  badge: BadgeCheck,       // certification / independently assessed
  lock: Lock,              // padlock — security, insurance, certified
  globe: Globe,            // web / internet
  pen: PenTool,            // writing / copywriting / content
  whatsapp: MessageCircle,  // WhatsApp / messaging
};

export type BcIconName = keyof typeof icons;

interface BcIconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  name: BcIconName;
  size?: number;
}

export function BcIcon({ name, size = 24, className, ...props }: BcIconProps) {
  const Icon = icons[name];
  return <Icon size={size} className={className} strokeWidth={2} {...(props as Record<string, unknown>)} />;
}
