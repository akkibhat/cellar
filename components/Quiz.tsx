'use client';

import { useState } from 'react';
import type { Question } from '@/lib/types';
import { useProgress } from '@/lib/storage';
import HandRule from './HandRule';

/**
 * The end-of-chapter check.
 *
 * Answers are revealed one question at a time with the reasoning attached,
 * because the explanation is the teaching and a bare score is not. The
 * best score per chapter is kept in local progress.
 */
export default function Quiz({
  slug,
  questions,
}: {
  slug: string;
  questions: Question[];
}) {
  const { recordScore } = useProgress();

  /** Chosen option index per question, or null if unanswered. */
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null),
  );
  const [finished, setFinished] = useState(false);

  const answeredCount = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>(
    (n, a, i) => n + (a === questions[i].answer ? 1 : 0),
    0,
  );

  const choose = (qi: number, oi: number) => {
    // Answers are final once given, so the reasoning stays attached to
    // the choice the reader actually made.
    if (answers[qi] !== null) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);

    if (next.every((a) => a !== null)) {
      const finalScore = next.reduce<number>(
        (n, a, i) => n + (a === questions[i].answer ? 1 : 0),
        0,
      );
      recordScore(slug, finalScore);
      setFinished(true);
    }
  };

  const reset = () => {
    setAnswers(questions.map(() => null));
    setFinished(false);
  };

  return (
    <section className="mt-12">
      <h2 className="hand t-h2 mb-1">Check yourself</h2>
      <HandRule width={190} variant={1} />

      <p className="label-ui mt-3 mb-5">
        {answeredCount} of {questions.length} answered
        {finished && ` - ${score} correct`}
      </p>

      <div className="space-y-4">
        {questions.map((q, qi) => {
          const given = answers[qi];
          const answered = given !== null;

          return (
            <div key={qi} className="card px-5 py-4">
              <p className="t-base mb-3.5">
                <span className="hand t-h3 mr-2" style={{ color: 'var(--wine)' }}>
                  {qi + 1}
                </span>
                {q.q}
              </p>

              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.answer;
                  const isChosen = given === oi;

                  // Colour only after answering: the correct option in
                  // gold, a wrong choice in wine, everything else plain.
                  let border = 'var(--rule)';
                  let background: string | undefined;
                  if (answered && isCorrect) {
                    border = 'var(--gold)';
                    background = 'color-mix(in srgb, var(--gold) 11%, transparent)';
                  } else if (answered && isChosen) {
                    border = 'var(--wine)';
                    background = 'color-mix(in srgb, var(--wine) 9%, transparent)';
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => choose(qi, oi)}
                      disabled={answered}
                      className="w-full text-left px-3.5 py-2 rounded transition-colors t-ui"
                      style={{
                        border: `1px solid ${border}`,
                        background,
                        cursor: answered ? 'default' : 'pointer',
                        opacity: answered && !isCorrect && !isChosen ? 0.5 : 1,
                      }}
                    >
                      <span className="flex items-start gap-2.5">
                        <span
                          className="label-ui shrink-0 pt-1"
                          style={{
                            color: answered && isCorrect
                              ? 'var(--gold)'
                              : answered && isChosen
                                ? 'var(--wine)'
                                : 'var(--ink-faint)',
                          }}
                        >
                          {answered && isCorrect
                            ? '✓'
                            : answered && isChosen
                              ? '✕'
                              : String.fromCharCode(97 + oi)}
                        </span>
                        <span>{opt}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <p
                  className="t-ui mt-3 pl-1"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {q.because}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {finished && (
        <div
          className="note-block px-5 py-4 mt-4 flex flex-wrap items-center justify-between gap-3"
        >
          <p className="!mb-0">
            <span className="hand t-h2" style={{ color: 'var(--wine)' }}>
              {score} / {questions.length}
            </span>
            <span className="ml-3" style={{ color: 'var(--ink-soft)' }}>
              {score === questions.length
                ? 'All correct.'
                : score >= questions.length / 2
                  ? 'Worth re-reading the parts you missed.'
                  : 'Have another look at this one.'}
            </span>
          </p>
          <button className="btn" onClick={reset}>
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
