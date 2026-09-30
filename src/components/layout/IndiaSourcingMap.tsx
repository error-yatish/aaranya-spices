import React, { useState } from 'react';
import { Sprout, MapPin, Users, Cog, ShieldCheck, Package } from 'lucide-react';
import { INDIA_STATE_PATHS } from '../../data/indiaMapPaths';

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
  id: 'north' | 'west' | 'central' | 'south';
  shortTag: string;
  label: string;
  statesText: string;
  spices: string;
  cx: number;
  cy: number;
  coordinates: string;
  note: string;
}

const INDIA_MAP_PINS: MapPinRegion[] = [
  {
    id: 'north',
    shortTag: 'Northern Valleys',
    label: 'Northern Valleys · [SOURCING REGION]',
    statesText: 'Jammu & Kashmir · Ladakh · Himachal · Uttarakhand',
    spices: 'Kashmiri Chilli · Culinary Aromatics',
    cx: 101,
    cy: 62,
    coordinates: '34.0° N, 74.8° E',
    note: 'Cool mountain air and crisp autumn sun ideal for slow-drying whole red chillies with deep natural pigment and gentle warmth.'
  },
  {
    id: 'west',
    shortTag: 'Western Seed Belt',
    label: 'Western Seed Belt · [SOURCING REGION]',
    statesText: 'Gujarat · Rajasthan',
    spices: 'Whole Cumin (Jeera) · Coriander Seeds',
    cx: 71,
    cy: 199,
    coordinates: '23.8° N, 72.4° E',
    note: 'Dry winter sunshine and mineral-rich alluvial soils suited to aromatic seed crops like cumin (jeera) and coriander (dhaniya).'
  },
  {
    id: 'central',
    shortTag: 'Deccan Plateau',
    label: 'Deccan & Central Plateau · [SOURCING REGION]',
    statesText: 'Maharashtra · Telangana · Andhra Pradesh · Madhya Pradesh',
    spices: 'Cured Turmeric Rhizomes · Dry Ginger',
    cx: 135,
    cy: 266,
    coordinates: '18.8° N, 77.5° E',
    note: 'Warm tropical growing seasons followed by dry winter harvest windows for curing golden turmeric fingers with high natural curcumin.'
  },
  {
    id: 'south',
    shortTag: 'Southern Hills',
    label: 'Southern Forest Hills · [SOURCING REGION]',
    statesText: 'Kerala · Karnataka · Tamil Nadu · Western Ghats',
    spices: 'Black Peppercorns · Green Cardamom Pods',
    cx: 122,
    cy: 382,
    coordinates: '10.2° N, 76.5° E',
    note: 'Shaded forest canopies and monsoon mists along the Western Ghats where pepper vines and cardamom pods develop complex essential oils.'
  }
];

export const IndiaSourcingMap: React.FC = () => {
  const [activePin, setActivePin] = useState<MapPinRegion>(INDIA_MAP_PINS[3]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<string>('farms');

  const handleStateClick = (zoneId: MapPinRegion['id'] | null) => {
    if (!zoneId) return;
    const found = INDIA_MAP_PINS.find((p) => p.id === zoneId);
    if (found) setActivePin(found);
  };

  return (
    <div className="space-y-16">
      {/* Interactive Botanical India Map + Regional Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#EFECE3] border border-[#E2DDD2] p-6 sm:p-10 lg:p-12">
        {/* Left: Cartographically Accurate SVG Map of India's Spice Belts */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[380px] aspect-[400/450] bg-[#F7F4ED] border border-[#D5CFC2] p-4 sm:p-5 flex items-center justify-center shadow-xs">
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] font-mono-spec uppercase tracking-[0.18em] text-[#6D4C38]">
                Botanical Atlas · India
              </span>
              <span className="text-[10px] font-mono-spec text-[#847E74]">
                {hoveredState ? hoveredState : activePin.coordinates}
              </span>
            </div>

            <svg
              viewBox="0 0 400 450"
              className="w-full h-full select-none"
              role="img"
              aria-label="Cartographic map of India highlighting spice-growing states and agro-climatic zones"
            >
              <defs>
                <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#182B21" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Subtle Cartographic Graticule Lines */}
              <line x1="0" y1="105" x2="400" y2="105" stroke="#E5E0D4" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="0" y1="210" x2="400" y2="210" stroke="#E5E0D4" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="0" y1="315" x2="400" y2="315" stroke="#E5E0D4" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="130" y1="0" x2="130" y2="450" stroke="#E5E0D4" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="260" y1="0" x2="260" y2="450" stroke="#E5E0D4" strokeWidth="0.75" strokeDasharray="3 3" />

              {/* Tropic of Cancer Reference Line (~23.5°N) */}
              <line x1="0" y1="203" x2="400" y2="203" stroke="#C89236" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="2 4" />
              <text x="392" y="199" textAnchor="end" className="fill-[#847E74] text-[7px] font-mono-spec uppercase tracking-widest">
                23.5°N Tropic of Cancer
              </text>

              {/* Official State & UT Polygons of India */}
              <g filter="url(#map-shadow)">
                {INDIA_STATE_PATHS.map((state) => {
                  const isSelectedZone = state.zoneId === activePin.id;
                  const isOtherSpiceZone = state.zoneId !== null && !isSelectedZone;

                  return (
                    <path
                      key={state.name}
                      d={state.d}
                      onClick={() => handleStateClick(state.zoneId)}
                      onMouseEnter={() => setHoveredState(state.name)}
                      onMouseLeave={() => setHoveredState(null)}
                      fill={
                        isSelectedZone
                          ? '#D8B575'
                          : isOtherSpiceZone
                          ? '#E6E1D3'
                          : '#EFECE3'
                      }
                      stroke={isSelectedZone ? '#182B21' : '#8C857B'}
                      strokeWidth={isSelectedZone ? '1.1' : '0.65'}
                      strokeLinejoin="round"
                      className={`transition-colors duration-300 ${
                        state.zoneId ? 'cursor-pointer hover:opacity-90' : ''
                      }`}
                    >
                      <title>{state.name}</title>
                    </path>
                  );
                })}
              </g>

              {/* Connecting Botanical Trade Route Curve */}
              <path
                d="M101,62 Q62,135 71,199 Q105,235 135,266 Q128,325 122,382"
                fill="none"
                stroke="#182B21"
                strokeOpacity="0.55"
                strokeWidth="1.25"
                strokeDasharray="3.5 3.5"
                className="pointer-events-none"
              />

              {/* Interactive Agro-Climatic Region Pins */}
              {INDIA_MAP_PINS.map((pin) => {
                const isSelected = activePin.id === pin.id;
                return (
                  <g
                    key={pin.id}
                    onClick={() => setActivePin(pin)}
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <>
                        <circle
                          cx={pin.cx}
                          cy={pin.cy}
                          r="18"
                          fill="#C89236"
                          fillOpacity="0.22"
                        />
                        <circle
                          cx={pin.cx}
                          cy={pin.cy}
                          r="11"
                          fill="none"
                          stroke="#182B21"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      </>
                    )}
                    <circle
                      cx={pin.cx}
                      cy={pin.cy}
                      r={isSelected ? '6.5' : '5'}
                      fill={isSelected ? '#182B21' : '#C89236'}
                      stroke="#F7F4ED"
                      strokeWidth="1.8"
                    />
                    {/* Pin Callout Label */}
                    <g
                      transform={`translate(${pin.cx + 11}, ${pin.cy + 3})`}
                      className="pointer-events-none"
                    >
                      <rect
                        x="-3"
                        y="-9"
                        width={pin.shortTag.length * 4.7 + 8}
                        height="13"
                        rx="1.5"
                        fill={isSelected ? '#182B21' : '#F7F4ED'}
                        fillOpacity={isSelected ? '0.95' : '0.88'}
                        stroke={isSelected ? '#182B21' : '#D5CFC2'}
                        strokeWidth="0.6"
                      />
                      <text
                        x="1"
                        y="0"
                        className={`text-[7.5px] font-mono-spec uppercase tracking-wider ${
                          isSelected ? 'fill-[#F7F4ED]' : 'fill-[#1C1B18]'
                        }`}
                      >
                        {pin.shortTag}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Sea / Ocean Labels */}
              <text x="38" y="345" className="fill-[#9C9589] text-[7.5px] font-serif-editorial italic tracking-widest pointer-events-none">
                Arabian Sea
              </text>
              <text x="245" y="325" className="fill-[#9C9589] text-[7.5px] font-serif-editorial italic tracking-widest pointer-events-none">
                Bay of Bengal
              </text>
            </svg>

            <div className="absolute bottom-2.5 inset-x-4 flex items-center justify-between text-[10px] text-[#5A564E]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 inline-block bg-[#D8B575] border border-[#182B21]" />
                Active Spice Belt
              </span>
              <span>Click a region or marker</span>
            </div>
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
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-[10px] uppercase tracking-[0.16em] font-mono-spec ${
                        isSelected ? 'text-[#C89236]' : 'text-[#6D4C38]'
                      }`}
                    >
                      {pin.spices}
                    </p>
                    <span
                      className={`text-[10px] font-mono-spec ${
                        isSelected ? 'text-[#D7D2C8]' : 'text-[#847E74]'
                      }`}
                    >
                      {pin.coordinates}
                    </span>
                  </div>
                  <p className="font-serif-editorial text-lg mt-1">{pin.label}</p>
                  <p
                    className={`text-[11px] mt-1 ${
                      isSelected ? 'text-[#D7D2C8]' : 'text-[#5A564E]'
                    }`}
                  >
                    {pin.statesText}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Zone Card */}
          <div className="p-5 bg-[#F7F4ED] border-l-2 border-[#C89236]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs uppercase tracking-[0.16em] text-[#6D4C38] font-medium">
                Selected Zone Profile — {activePin.label}
              </p>
              <span className="text-[11px] font-mono-spec text-[#182B21]">
                {activePin.statesText}
              </span>
            </div>
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
