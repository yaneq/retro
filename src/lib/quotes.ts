const QUOTES: iQuote[] = [
  {
    quote: "There is a way to do it better — find it!",
    source: "Thomas A. Edison",
  },
  {
    quote:
      "In any given moment we have two options: to step forward into growth or to step back into safety.",
    source: "Abraham Maslow",
  },
  {
    quote:
      "If you adopt only one agile practice let it be retrospectives. Everything else will follow.",
    source: "Woody Zuill",
  },
  {
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    source: "Nelson Mandela",
  },
  {
    quote:
      "When to use iterative development?\n\nYou should use iterative development only on projects that you want to succeed.",
    source: "Martin Fowler",
  },
  {
    quote:
      "There is nothing so useless as doing efficiently that which should not be done at all.",
    source: "Peter Drucker",
  },
  {
    quote:
      "It seems that perfection is reached not when there is nothing left to add, but when there is nothing left to take away.",
    source: "Antoine de Saint-Exupéry",
  },
  {
    quote: "It is a capital mistake to theorize before one has data",
    source: "Sherlock Holmes - Scandal in Bohemia",
  },
  {
    quote: "If you want a guarantee, buy a toaster.",
    source: "Clint Eastwood in The Rookie",
  },
  {
    quote:
      "The important thing is not your process.\n\nThe important thing is your process for improving your process.",
    source: "Henrik Kniberg",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    source: "Leonardo da Vinci",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    source: "Leonardo da Vinci",
  },
  {
    quote:
      "We don’t divide and conquer. We conquer and divide. First we make something that works, then we bust that up and solve the little parts.",
    source: "Kent Beck",
  },
  {
    quote:
      "If you define the problem correctly,  you almost have the solution.",
    source: "Steve Jobs",
  },
  {
    quote:
      "If you tell people where to go,  but not how to get there, you’ll be amazed by the results.",
    source: "General George S. Patton",
  },
  {
    quote:
      "To achieve great things, two things are needed: a plan, and not quite enough time.",
    source: "Leonard Bernstein",
  },
  {
    quote: "Whether you think that you can, or that you can’t, you are right.",
    source: "Henry Ford",
  },
  {
    quote:
      "However beautiful the strategy, you should occasionally look at the results.",
    source: "Winston Churchill",
  },
  {
    quote:
      "However beautiful the strategy, you should occasionally look at the results.",
    source: "Winston Churchill",
  },
  {
    quote: "Unthinking respect for authority is the greatest enemy of truth.",
    source: "Albert Einstein",
  },
  {
    quote:
      "Life is like riding a bicycle. To keep your balance you must keep moving.",
    source: "Albert Einstein",
  },
  {
    quote:
      "We must learn what customers really want, not what they say they want or what we think they should want.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "As you consider building your own minimum viable product, let this simple rule suffice:\n\nremove any feature, process, or effort that does not contribute directly to the learning you seek.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote: "When in doubt, simplify.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "Success is not delivering a feature; success is learning how to solve the customer’s problem.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "The lesson of the MVP is that any additional work beyond what was required to start learning is waste, no matter how important it might have seemed at the time.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "Customers don’t care how much time something takes to build.\n\nThey care only if it serves their needs.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote: "Build, Measure, Learn",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "If we do not know who the customer is, we do not know what quality is.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "The point is not to find the average customer but to find early adopters: the customers who feel the need for the product most acutely. Those customers tend to be more forgiving of mistakes and are especially eager to give feedback.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "In the Lean Startup model, an experiment is more than just a theoretical inquiry; it is also a first product.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "This is an important rule: a good design is one that changes customer behavior for the better.",
    source: "Eric Ries (The Lean Startup)",
  },
  {
    quote:
      "I knew that if I failed I wouldn’t regret that, but I knew the one thing I might regret is not trying.",
    source: "Jeff Bezos",
  },
  {
    quote:
      "If you are not embarrassed by the first version of your product, you’ve launched too late.",
    source: "Reid Hoffman",
  },
  {
    quote:
      "Remember to celebrate milestones as you prepare for the road ahead.",
    source: "Nelson Mandela",
  },
  {
    quote:
      "Before you criticize someone, you should walk a mile in their shoes.\n\nThat way when you criticize them, you are a mile away from them and you have their shoes.",
    source: "Jack Handey",
  },
  {
    quote:
      "People don’t care how much you know until they know how much you care.",
    source: "Theodore Roosevelt",
  },
  {
    quote:
      "It is not the employer who pays the wages. Employers only handle the money. It is the customer who pays the wages.",
    source: "Henry Ford",
  },
  {
    quote: "The purpose of a business is to create and keep customers.",
    source: "Theodore Levitt",
  },
  {
    quote:
      "Understanding what customers do allows you to predict what they will do next.",
    source: "Colin Shaw",
  },
  {
    quote:
      "You need to get to the future, ahead of your customers, and be ready to greet them when they arrive.",
    source: "Marc Benioff",
  },
  {
    quote: "If you cannot do great things, do small things in a great way.",
    source: "Napoleon Hill",
  },
]

export interface iQuote {
  quote: string
  source: string
}

export const getRandomQuote = (randomString: string): iQuote => {
  const quoteIndex =
    (randomString.charCodeAt(0) + randomString.charCodeAt(1)) % QUOTES.length
  // const rand = Math.round(Math.random() * 100) % QUOTES.length
  return QUOTES[quoteIndex]
}
