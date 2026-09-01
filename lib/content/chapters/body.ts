import type { Chapter } from '../../types';

/**
 * Part IX - Wine and the body.
 *
 * A wine course that skips this would be a strange thing. Written
 * straight: the mechanism first, then the guidance, with current national
 * figures rather than the older ones still in wide circulation.
 */
export const BODY: Chapter[] = [
  /* ================================================================== */
  {
    slug: 'what-alcohol-does',
    part: 'practice',
    n: 25,
    title: 'What alcohol does',
    minutes: 3,
    standfirst:
      'How your body processes alcohol, which is more use to know than any rule about how much to drink.',
    body: [
      {
        kind: 'p',
        text: 'Ethanol is a small molecule, soluble in both water and fat, which is why it crosses membranes so easily and reaches every tissue in the body within minutes. There’s no organ it doesn’t get to. Almost all of it is then broken down in the liver, at a rate you have no way of influencing.',
      },
      { kind: 'h', text: 'The two step process' },
      {
        kind: 'p',
        text: 'The liver breaks ethanol down in two stages. First, alcohol dehydrogenase converts it to **acetaldehyde** - which is considerably more toxic than the alcohol itself and is classified as a carcinogen. Second, aldehyde dehydrogenase converts acetaldehyde into harmless acetate.',
      },
      {
        kind: 'p',
        text: 'The rate is fixed and can’t be hurried. Coffee, cold showers, food and exercise do nothing to speed it up - they may make you feel more alert while your blood alcohol is unchanged, which is arguably worse. A healthy liver clears roughly **7 to 10 grams** of ethanol an hour, which is about one standard drink, and blood alcohol falls by roughly 15 to 17 mg per 100 ml of blood over that hour.',
      },
      { kind: 'h', text: 'Why people react so differently' },
      {
        kind: 'p',
        text: 'Age, sex, size and metabolism all move the figure, but body water content is the main variable - alcohol distributes through water, so the same drink in a smaller or leaner person produces a higher concentration. Enzyme levels vary genetically. And stomach contents matter: food doesn’t absorb alcohol, but it slows gastric emptying, so the same drink arrives at the bloodstream more gradually.',
      },
      {
        kind: 'p',
        text: 'One genetic difference is worth knowing about by name. A variant of the *ALDH2* gene, common in people of East Asian descent and uncommon elsewhere, produces a much less effective version of the second enzyme. Acetaldehyde accumulates instead of being cleared, which causes the facial flushing, rapid heartbeat and nausea known as **alcohol flush reaction**.',
      },
      {
        kind: 'p',
        text: 'It’s often described as lacking the enzyme, which isn’t quite right - the enzyme is present and working badly, which is why the effect is a spectrum rather than a switch. Prevalence estimates vary by population and by study; commonly cited figures run from about 30% to 50% among East Asian populations, and closer to 8% worldwide. I have tried to be careful with the shorthand here, since "Asian" covers populations where the variant is barely present at all.',
      },
      {
        kind: 'p',
        text: 'It isn’t only a cosmetic effect. Because acetaldehyde is a carcinogen, people with the variant who drink regularly carry a substantially elevated risk of oesophageal cancer. The flush is a warning signal, and I didn’t know that until I went looking.',
      },
      { kind: 'h', text: 'What is affected' },
      {
        kind: 'p',
        text: 'The liver gets most of the attention because it does the processing, going from fatty liver through hepatitis to cirrhosis. But it isn’t the only organ affected. Heavy drinking causes vomiting and dehydration in the short run, and damage to the brain, the intestines and the pancreas over time. It reaches the whole body, not just the liver.',
      },
      {
        kind: 'p',
        text: 'It’s also classified by the IARC as a **Group 1 carcinogen**, the same category as tobacco and asbestos, primarily through the acetaldehyde pathway described above.',
      },
      {
        kind: 'note',
        title: 'Where the guidance lives',
        text: 'I have not put the drinking guidelines in here. They are easy enough to find, they change, and I am not the person to be handing them to you. What is worth carrying is the mechanism above - and, from chapter three, that a unit is a fixed dose of alcohol while a glass is whatever the person pouring felt like.',
      },
      {
        kind: 'note',
        title: 'On hangovers',
        text: 'Mostly dehydration, acetaldehyde accumulation, inflammation and disrupted sleep, in roughly that order of contribution. Congeners - the non-ethanol compounds in darker drinks - make them measurably worse, which is why red wine and whisky outrank vodka. Water helps with one of the four causes. Nothing helps with the rest except time.',
      },
    ],
    quiz: [
      {
        q: 'What is acetaldehyde?',
        options: [
          'A harmless by-product of fermentation',
          'The toxic, carcinogenic intermediate the liver produces when breaking down alcohol',
          'The compound responsible for a wine’s aroma',
          'A preservative added to wine',
        ],
        answer: 1,
        because:
          'Alcohol dehydrogenase converts ethanol to acetaldehyde, which is more toxic than ethanol. A second enzyme then converts it to harmless acetate.',
      },
      {
        q: 'Can you speed up alcohol metabolism?',
        options: [
          'Yes, with coffee',
          'Yes, with exercise',
          'No - the rate is fixed at roughly one standard drink per hour',
          'Yes, by drinking water',
        ],
        answer: 2,
        because:
          'Coffee and cold showers increase alertness without changing blood alcohol, which can make someone feel more capable than they are.',
      },
      {
        q: 'What causes alcohol flush reaction?',
        options: [
          'An allergy to sulphites',
          'A less effective ALDH2 enzyme variant, so acetaldehyde accumulates',
          'High histamine levels in red wine',
          'Dehydration',
        ],
        answer: 1,
        because:
          'The second breakdown step is impaired, so the toxic intermediate builds up. It also carries a substantially elevated oesophageal cancer risk in regular drinkers.',
      },
    ],
  },

];
