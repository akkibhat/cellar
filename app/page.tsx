import FrontDoor from '@/components/FrontDoor';

/**
 * The front door.
 *
 * Deliberately not the contents page - that moved to /course. This page
 * has one job: show that there are two halves and let you pick one. The
 * course is a thing you read; the cellar is a thing you keep. Landing
 * straight in the contents made the second half invisible.
 *
 * It renders without the sidebar. `Shell` checks for this route and steps
 * out of the way, because a front door wrapped in the course's own
 * navigation is not a front door.
 *
 * The masthead and the cards are one client component, since the mark
 * animates in response to which card the pointer is on. It takes no
 * props: the cards deliberately carry no counts, because a front door
 * that reports how many bottles are left is a dashboard rather than an
 * invitation.
 */
export default function Home() {
  return (
    <div className="relative mx-auto max-w-[52rem] px-6 sm:px-10 py-14 lg:py-20">
      {/* Decorative stains, hidden from assistive technology. Placed
          rather than floating: the ring sits behind the masthead where
          the centred lockup gives it something to be behind. */}

      <FrontDoor />
    </div>
  );
}
