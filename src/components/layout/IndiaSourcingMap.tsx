import React, { useState } from 'react';
import { Sprout, MapPin, Users, Cog, ShieldCheck, Package } from 'lucide-react';

interface SourcingStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  placeholderTag: string;
  icon: React.ReactNode;
}

const SOURCING_STAGES: SourcingStage[] = [
  {
    id: 'farms',
    step: '01',
    title: 'Indian Farms',
    subtitle: 'Seasonal agricultural harvests',
    description:
      'Every spice begins as an agricultural crop shaped by soil, rainfall, and sunlight across India’s diverse agro-climatic zones.',
    placeholderTag: 'Origin Data: [SOURCING REGION]',
    icon: <Sprout size={20} />
  },
  {
    id: 'regions',
    step: '02',
    title: 'Spice-Growing Regions',
    subtitle: 'Selected for natural character',
    description:
      'From arid western seed belts to humid southern hills and northern valleys, each spice is selected from regions suited to its botanical profile.',
    placeholderTag: 'Regional Lot: [SOURCING REGION]',
    icon: <MapPin size={20} />
  },
  {
    id: 'partners',
    step: '03',
    title: 'Farmers & Sourcing Partners',
    subtitle: 'Thoughtful lot selection',
    description:
      'We work with sourcing partners to select mature, well-cured harvests prioritized for volatile essential oil content, aroma, and clean physical grading.',
    placeholderTag: 'Partner Record: [SOURCING REGION]',
    icon: <Users size={20} />
  },
  {
    id: 'processing',
    step: '04',
    title: 'Small-Batch Processing',
    subtitle: 'Cleaning, sorting & gentle milling',
    description:
      'Whole spices are air-cleaned and gravity-sorted to remove chaff. Ground spices and blends are milled in controlled runs to protect delicate aromas.',
    placeholderTag: 'Batch Protocol: Small-Lot Milling',
    icon: <Cog size={20} />
  },
  {
    id: 'quality',
    step: '05',
    title: 'Quality Checking',
    subtitle: 'Sensory & physical verification',
    description:
      'Every lot is evaluated for colour, moisture balance, aroma intensity, and freedom from foreign matter or artificial colours.',
    placeholderTag: 'Compliance: [CERTIFICATION]',
    icon: <ShieldCheck size={20} />
  },
  {
    id: 'packaging',
    step: '06',
    title: 'Protective Packaging',
    subtitle: 'Sealed in UV-shielded amber glass',
    description:
      'Spices are packed promptly after milling into UV-protective amber glass jars and barrier pouches so light and humidity never dull their character.',
    placeholderTag: 'Format: 100g · 200g · 500g',
    icon: <Package size={20} />
  }
];

interface MapPinRegion {
  id: string;
  label: string;
  spices: string;
  cx: number;
  cy: number;
  note: string;
}

const INDIA_MAP_PINS: MapPinRegion[] = [
  {
    id: 'north',
    label: 'Northern Valleys · [SOURCING REGION]',
    spices: 'Kashmiri Chilli · Culinary Aromatics',
    cx: 165,
    cy: 78,
    note: 'Cool mountain air and crisp autumn sun ideal for slow-drying whole red chillies with deep natural pigment.'
  },
  {
    id: 'west',
    label: 'Western Seed Belt · [SOURCING REGION]',
    spices: 'Whole Cumin (Jeera) · Coriander Seeds',
    cx: 112,
    cy: 195,
    note: 'Dry winter sunshine and mineral-rich alluvial soils suited to aromatic seed crops like cumin and dhaniya.'
  },
  {
    id: 'central',
    label: 'Deccan & Central Plateau · [SOURCING REGION]',
    spices: 'Cured Turmeric Rhizomes · Dry Ginger',
    cx: 185,
    cy: 255,
    note: 'Warm tropical growing seasons followed by dry winter harvest windows for curing golden turmeric fingers.'
  },
  {
    id: 'south',
    label: 'Southern Forest Hills · [SOURCING REGION]',
    spices: 'Black Peppercorns · Green Cardamom Pods',
    cx: 168,
    cy: 355,
    note: 'Shaded forest canopies and monsoon mists where pepper vines and cardamom pods develop complex essential oils.'
  }
];

export const IndiaSourcingMap: React.FC = () => {
  const [activePin, setActivePin] = useState<MapPinRegion>(INDIA_MAP_PINS[3]);
  const [activeStage, setActiveStage] = useState<string>('farms');

  return (
    <div className="space-y-16">
      {/* Interactive Botanical India Map + Regional Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#EFECE3] border border-[#E2DDD2] p-6 sm:p-10 lg:p-12">
        {/* Left: Illustrated SVG Map of India's Spice Belts */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[340px] aspect-[3/4] bg-[#F7F4ED] border border-[#D5CFC2] p-6 flex items-center justify-center">
            <span className="absolute top-3 left-4 text-[10px] font-mono-spec uppercase tracking-[0.18em] text-[#847E74]">
              Botanical Atlas · India
            </span>
            <svg
              viewBox="0 0 360 440"
              className="w-full h-full"
              role="img"
              aria-label="Illustrated map of Indian spice growing climatic zones"
            >
              {/* Subtle latitude/longitude grid lines */}
              <line x1="0" y1="110" x2="360" y2="110" stroke="#E2DDD2" strokeDasharray="3 3" />
              <line x1="0" y1="220" x2="360" y2="220" stroke="#E2DDD2" strokeDasharray="3 3" />
              <line x1="0" y1="330" x2="360" y2="330" stroke="#E2DDD2" strokeDasharray="3 3" />
              <line x1="180" y1="0" x2="180" y2="440" stroke="#E2DDD2" strokeDasharray="3 3" />

              {/* Stylized Subcontinent Outline */}
              <path
                d="M155,32 L188,42 L195,70 L182,98 L215,132 L262,148 L298,142 L310,168 L272,198 L245,215 L228,255 L205,305 L186,375 L168,405 L150,375 L132,308 L115,245 L82,222 L68,192 L95,168 L112,135 L135,95 L138,55 Z"
                fill="#EFECE3"
                stroke="#182B21"
                strokeWidth="1.5"
              />

              {/* Connecting Trade Route Curve */}
              <path
                d="M165,78 Q112,195 185,255 T168,355"
                fill="none"
                stroke="#C89236"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />

              {/* Interactive Region Pins */}
              {INDIA_MAP_PINS.map((pin) => {
                const isSelected = activePin.id === pin.id;
                return (
                  <g
                    key={pin.id}
                    onClick={() => setActivePin(pin)}
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <circle
                        cx={pin.cx}
                        cy={pin.cy}
                        r="16"
                        fill="#C89236"
                        fillOpacity="0.25"
                      />
                    )}
                    <circle
                      cx={pin.cx}
                      cy={pin.cy}
                      r={isSelected ? '7' : '5.5'}
                      fill={isSelected ? '#182B21' : '#C89236'}
                      stroke="#F7F4ED"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>
            <span className="absolute bottom-3 inset-x-4 text-center text-[10px] text-[#5A564E]">
              Select a marker to explore agro-climatic spice zones
            </span>
          </div>
        </div>

        {/* Right: Active Region Details + Zone Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38] font-medium">
              Indian Spice Heritage · Traceable Lots
            </p>
            <h3 className="font-serif-editorial text-2xl md:text-3xl text-[#1C1B18] mt-2">
              From India&apos;s spice-growing regions to your kitchen, we believe better flavour begins with knowing the ingredient and respecting where it comes from.
            </h3>
          </div>

          {/* Zone Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INDIA_MAP_PINS.map((pin) => {
              const isSelected = activePin.id === pin.id;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setActivePin(pin)}
                  className={`text-left p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                      : 'bg-[#F7F4ED] text-[#1C1B18] border-[#D5CFC2] hover:border-[#182B21]'
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.16em] font-mono-spec ${
                      isSelected ? 'text-[#C89236]' : 'text-[#6D4C38]'
                    }`}
                  >
                    {pin.spices}
                  </p>
                  <p className="font-serif-editorial text-lg mt-1">{pin.label}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Zone Card */}
          <div className="p-5 bg-[#F7F4ED] border-l-2 border-[#C89236]">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6D4C38] font-medium">
              Selected Zone Profile — {activePin.label}
            </p>
            <p className="mt-2 text-sm text-[#5A564E] leading-relaxed">
              {activePin.note}
            </p>
          </div>
        </div>
      </div>

      {/* 6-Stage Seed-to-Jar Process Grid */}
      <div>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38]">
              Six-Stage Stewardship
            </p>
            <h3 className="font-serif-editorial text-2xl md:text-3xl text-[#1C1B18] mt-1">
              How Every Jar Reaches Your Table
            </h3>
          </div>
          <p className="text-xs font-mono-spec text-[#5A564E]">
            Batch Traceability · [CERTIFICATION]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOURCING_STAGES.map((stage) => {
            const isSelected = activeStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F7F4ED] border-[#182B21] shadow-sm'
                    : 'bg-[#F7F4ED]/60 border-[#E2DDD2] hover:border-[#C89236]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[#6D4C38] mb-4">
                    <span className="font-mono-spec text-xs uppercase tracking-[0.2em]">
                      Stage {stage.step}
                    </span>
                    <div className="text-[#182B21]">{stage.icon}</div>
                  </div>
                  <h4 className="font-serif-editorial text-2xl text-[#1C1B18]">
                    {stage.title}
                  </h4>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#6D4C38] mt-1">
                    {stage.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-[#5A564E] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E2DDD2] text-[11px] font-mono-spec text-[#847E74]">
                  {stage.placeholderTag}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
