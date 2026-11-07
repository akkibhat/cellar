'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AROMA_FAMILIES } from '@/lib/aromas';
import { SCALES, useJournal } from '@/lib/storage';

/**
 * The guided tasting tool.
 *
 * Walks the three stages of the standard method - visual, nose,
 * palate - collecting observations as you go, assembling them into a
 * written note in real time, and saving the result to a local journal.
 *
 * The point of the live note is pedagogical: it shows the reader that a
 * tasting note is nothing more than their own structured observations
 * written out in order, which demystifies the whole exercise.
 */

/** Hue vocabulary, which depends on what kind of wine is in the glass. */
const HUES: Record<string, string[]> = {
  red: ['purple', 'ruby', 'garnet', 'brick', 'tawny'],
  white: ['pale green', 'straw', 'yellow', 'gold', 'amber'],
  rose: ['pale pink', 'salmon', 'œil de perdrix', 'deep pink', 'onion skin'],
  sparkling: ['pale straw', 'straw', 'gold', 'pale pink', 'salmon'],
};

const COLOURS = [
  { id: 'red', label: 'Red' },
  { id: 'white', label: 'White' },
  { id: 'rose', label: 'Rosé' },
  { id: 'sparkling', label: 'Sparkling' },
] as const;

type Colour = (typeof COLOURS)[number]['id'];

const STEPS = [
  { n: '01', title: 'Visual', hint: 'Colour, depth, clarity' },
  { n: '02', title: 'The nose', hint: 'Families, then specifics' },
  { n: '03', title: 'The palate', hint: 'Structure, then length' },
];

/** The three-step tasting form, its live note, and the save button. */
export default function TastingTool({ compact = false }: { compact?: boolean }) {
  const { saveNote } = useJournal();

  /* ---- state -------------------------------------------------- */
  const [step, setStep] = useState(0);
  const [wine, setWine] = useState('');
  const [colour, setColour] = useState<Colour>('red');
  const [hues, setHues] = useState<string[]>([]);
  const [depth, setDepth] = useState(2);
  const [clarity, setClarity] = useState<'bright' | 'hazy'>('bright');
  const [families, setFamilies] = useState<string[]>([]);
  const [aromas, setAromas] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(2);
  const [tannin, setTannin] = useState(2);
  const [acidity, setAcidity] = useState(2);
  const [body, setBody] = useState(2);
  const [sweetness, setSweetness] = useState(1);
  const [length, setLength] = useState(6);
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState<string | null>(null);

  /** Toggle a value in and out of a string array. */
  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    value: string,
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  /**
   * Descriptors available at step two: only those belonging to a family
   * the taster has actually selected. This enforces the sort-then-name
   * discipline the aroma chapter argues for.
   */
  const availableAromas = useMemo(() => {
    return AROMA_FAMILIES.filter((f) => families.includes(f.slug)).flatMap(
      (f) => f.descriptors.map((d) => ({ d, colour: f.colour })),
    );
  }, [families]);

  /** Join a list into readable prose: "a, b and c". */
  const prose = (list: string[]) => {
    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    return `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`;
  };

  /**
   * Assemble the written note from every observation recorded so far.
   * Sentences are built conditionally, so a partially completed tasting
   * still produces something readable rather than a string of blanks.
   */
  const note = useMemo(() => {
    const parts: string[] = [];

    const appearance = [
      depth <= 1 ? 'Pale' : depth >= 3 ? 'Deep' : 'Medium',
      hues.length ? prose(hues) : null,
    ]
      .filter(Boolean)
      .join(' ');
    parts.push(
      `${appearance}${clarity === 'hazy' ? ', slightly hazy' : ''}.`,
    );

    const nose = aromas.length
      ? prose(aromas)
      : families.length
        ? prose(families)
        : 'not yet placed';
    parts.push(`${SCALES.intensity[intensity]} on the nose, showing ${nose}.`);

    const structure: string[] = [];
    if (colour === 'red') structure.push(`${SCALES.tannin[tannin].toLowerCase()} tannin`);
    structure.push(`${SCALES.acidity[acidity].toLowerCase()} acidity`);
    structure.push(`${SCALES.body[body].toLowerCase()} body`);
    parts.push(
      `${SCALES.sweetness[sweetness]} on the palate, with ${prose(structure)}.`,
    );

    parts.push(
      `Holds for about ${length} ${length === 1 ? 'caudalie' : 'caudalies'} after spitting.`,
    );

    return parts.join(' ');
  }, [
    depth, hues, clarity, intensity, aromas, families,
    colour, tannin, acidity, body, sweetness, length,
  ]);

  /** Commit the note to the journal. */
  const save = () => {
    const record = saveNote({
      wine: wine.trim(),
      colour,
      appearance: [...hues, clarity],
      families,
      aromas,
      intensity,
      tannin,
      acidity,
      body,
      sweetness,
      length,
      rating,
      prose: note,
      comment: comment.trim(),
    });
    setSaved(record.id);
    // Clear the banner after a moment so it does not linger over the form.
    setTimeout(() => setSaved(null), 4000);
  };

  /* ---- render ------------------------------------------------- */
  return (
    <section className={compact ? 'my-8' : ''}>
      {/* Wine identity ------------------------------------------- */}
      <div className="card px-5 py-4 mb-4">
        <label className="label-ui block mb-1.5" htmlFor="wine-name">
          What is in the glass?
        </label>
        <input
          id="wine-name"
          className="ink-input hand t-h3"
          placeholder="Producer, wine, vintage…"
          value={wine}
          onChange={(e) => setWine(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {COLOURS.map((c) => (
            <button
              key={c.id}
              className="chip chip--block"
              aria-pressed={colour === c.id}
              onClick={() => {
                setColour(c.id);
                setHues([]); // hue vocabulary changes with the wine type
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stepper -------------------------------------------------- */}
      <div className="grid gap-2.5 sm:grid-cols-3 mb-4">
        {STEPS.map((s, i) => (
          <button
            key={s.n}
            onClick={() => setStep(i)}
            className="card px-4 py-3 text-left transition-colors"
            style={{
              borderColor: step === i ? 'var(--wine)' : 'transparent',
              borderWidth: step === i ? 2 : 1,
            }}
            aria-current={step === i ? 'step' : undefined}
          >
            <span
              className="label-ui"
              style={{ color: step === i ? 'var(--wine)' : undefined }}
            >
              {s.n}
            </span>
            <span className="hand t-h3 block leading-none mt-0.5">
              {s.title}
            </span>
            <span className="t-caption" style={{ color: 'var(--ink-soft)' }}>
              {s.hint}
            </span>
          </button>
        ))}
      </div>

      {/* ---- Step 1: Visual ------------------------------------- */}
      {step === 0 && (
        <div className="card px-5 py-5">
          <Panel
            title="What colour is it?"
            hint="Tilt the glass over something white and read the rim, not the centre."
          >
            <div className="flex flex-wrap gap-2">
              {HUES[colour].map((h) => (
                <button
                  key={h}
                  className="chip chip--block"
                  aria-pressed={hues.includes(h)}
                  onClick={() => toggle(hues, setHues, h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </Panel>

          <Slider
            label="Depth of colour"
            value={depth}
            max={4}
            display={['Watery', 'Pale', 'Medium', 'Deep', 'Opaque'][depth]}
            onChange={setDepth}
          />

          <Panel title="Clarity" hint="Haze can be deliberate - an unfiltered wine - or a problem.">
            <div className="flex gap-2">
              {(['bright', 'hazy'] as const).map((c) => (
                <button
                  key={c}
                  className="chip chip--block"
                  aria-pressed={clarity === c}
                  onClick={() => setClarity(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {/* ---- Step 2: Nose --------------------------------------- */}
      {step === 1 && (
        <div className="card px-5 py-5">
          <Panel
            title="Which families can you find?"
            hint="Sort before you name. Pick the broad family first - specifics unlock below."
          >
            <div className="flex flex-wrap gap-2">
              {AROMA_FAMILIES.map((f) => (
                <button
                  key={f.slug}
                  className="chip chip--block"
                  aria-pressed={families.includes(f.slug)}
                  onClick={() => {
                    toggle(families, setFamilies, f.slug);
                    // Drop any specifics belonging to a family being removed.
                    if (families.includes(f.slug)) {
                      setAromas((a) =>
                        a.filter((d) => !f.descriptors.includes(d)),
                      );
                    }
                  }}
                  style={
                    families.includes(f.slug)
                      ? { background: f.colour, borderColor: f.colour }
                      : undefined
                  }
                >
                  {f.name}
                </button>
              ))}
            </div>
          </Panel>

          {availableAromas.length > 0 && (
            <Panel
              title="Now the specifics"
              hint="Only descriptors from the families you chose. Pick as few as you are sure of."
            >
              <div className="flex flex-wrap gap-1.5">
                {availableAromas.map(({ d, colour: c }) => (
                  <button
                    key={d}
                    className="chip chip--block"
                    aria-pressed={aromas.includes(d)}
                    onClick={() => toggle(aromas, setAromas, d)}
                    style={
                      aromas.includes(d)
                        ? { background: c, borderColor: c }
                        : undefined
                    }
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Panel>
          )}

          <Slider
            label="Aromatic intensity"
            value={intensity}
            max={4}
            display={SCALES.intensity[intensity]}
            onChange={setIntensity}
          />
        </div>
      )}

      {/* ---- Step 3: Palate ------------------------------------- */}
      {step === 2 && (
        <div className="card px-5 py-5">
          <p className="label-ui mb-4">
            Structure first - it is objective. Flavour second.
          </p>

          <div className="grid gap-x-8 sm:grid-cols-2">
            {colour === 'red' && (
              <Slider
                label="Tannin"
                value={tannin}
                max={4}
                display={SCALES.tannin[tannin]}
                onChange={setTannin}
              />
            )}
            <Slider
              label="Acidity"
              value={acidity}
              max={4}
              display={SCALES.acidity[acidity]}
              onChange={setAcidity}
            />
            <Slider
              label="Body"
              value={body}
              max={4}
              display={SCALES.body[body]}
              onChange={setBody}
            />
            <Slider
              label="Sweetness"
              value={sweetness}
              max={4}
              display={SCALES.sweetness[sweetness]}
              onChange={setSweetness}
            />
            <Slider
              label="Length"
              value={length}
              min={1}
              max={20}
              display={`${length} caudalies`}
              onChange={setLength}
            />
          </div>

          <Panel title="Your verdict" hint="Out of five. Be honest rather than generous.">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  className="chip chip--block"
                  aria-pressed={rating === r}
                  onClick={() => setRating(r)}
                  aria-label={`${r} out of 5`}
                >
                  {'★'.repeat(r)}
                </button>
              ))}
            </div>
          </Panel>

          <div className="mt-5">
            <label className="label-ui block mb-1.5" htmlFor="comment">
              Anything else
            </label>
            <input
              id="comment"
              className="ink-input"
              placeholder="Where you drank it, what you ate, whether you would buy it again…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ---- The live note -------------------------------------- */}
      <div
        className="card px-5 py-5 mt-4"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--wine) 7%, var(--paper-raised)), var(--paper-raised))',
          borderColor: 'var(--wine)',
        }}
      >
        <span className="label-ui" style={{ color: 'var(--wine)' }}>
          Your note, so far
        </span>

        {wine.trim() && (
          <p className="hand t-h2 leading-none mb-2">{wine}</p>
        )}
        <p className="italic t-base leading-relaxed mb-4">{note}</p>
        {comment.trim() && (
          <p className="t-ui mb-4" style={{ color: 'var(--ink-soft)' }}>
            {comment}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          <button className="btn btn-primary" onClick={save}>
            Save to journal
          </button>
          {step < 2 && (
            <button className="btn" onClick={() => setStep(step + 1)}>
              Next stage →
            </button>
          )}
          <Link href="/journal" className="btn">
            View journal
          </Link>
          {saved && (
            <span className="label-ui" style={{ color: 'var(--gold)' }}>
              ✓ Saved
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Small building blocks
 * ------------------------------------------------------------------ */

/** A titled group inside one of the step panels. */
function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="hand t-h3 leading-none mb-1">{title}</h3>
      {hint && (
        <p className="t-caption mb-3" style={{ color: 'var(--ink-soft)' }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

/** A labelled slider with its current value spelled out in words. */
function Slider({
  label,
  value,
  min = 0,
  max,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={id} className="t-ui">
          {label}
        </label>
        <span
          className="label-ui"
          style={{ color: 'var(--gold)', letterSpacing: '0.08em' }}
        >
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="ink-range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
