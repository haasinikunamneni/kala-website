/**
 * Bulk Gifting Collections registry.
 *
 * Every painting can optionally be assigned to ONE gifting collection via
 * `painting.giftingCollection` (an id from GIFTING_COLLECTION_OPTIONS, or
 * undefined/null for "None").
 *
 * The Bulk Gifting page, the Collections filter, and the artwork Bulk badge
 * are all derived dynamically from whichever paintings carry a
 * `giftingCollection` value — no artwork is ever duplicated, and adding a
 * new collection to the dropdown below is the only step needed to make it
 * available everywhere else in the app.
 */

export interface GiftingCollectionMeta {
  id: string;
  name: string;
  description: string;
}

/** The full known set of collections selectable from the admin dropdown.
 *  Add a new entry here to make a new collection available site-wide. */
export const GIFTING_COLLECTIONS: GiftingCollectionMeta[] = [
  {
    id: "natya-ganapati",
    name: "Natya Ganapati Collection",
    description:
      "The dancing Ganapati in every colourway, ready for weddings, housewarmings, corporate gifting and festival favours.",
  },
  {
    id: "krishna",
    name: "Krishna Collection",
    description: "Krishna's divine pastimes — Raas Leela, Radha-Madhava and more — for devotional and festive gifting.",
  },
  {
    id: "dashavatara",
    name: "Dashavatara Collection",
    description: "Vishnu's ten incarnations, a meaningful gift for spiritual milestones and celebrations.",
  },
  {
    id: "floral",
    name: "Floral Collection",
    description: "Botanical and floral motifs, an elegant, versatile choice for corporate and celebratory gifting.",
  },
  {
    id: "miniature",
    name: "Miniature Collection",
    description: "Compact, giftable miniature artworks — easy to pack, ship and gift in bulk.",
  },
  {
    id: "patra",
    name: "Patra Collection",
    description:
      "Monochrome Patra Chitra botanical and sacred-tree pieces, an elegant choice for bulk gifting.",
  },
  {
    id: "kalpavriksha",
    name: "Kalpavṛkṣa Collection",
    description:
      "Sacred Kalpavṛkṣa, the wish-fulfilling tree of Indian tradition, rendered in vivid colourways — a symbol of abundance and prosperity for bulk gifting.",
  },
];

const toTitleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Looks up a collection's display metadata by id, falling back to a
 *  reasonable auto-generated name/description for any id not yet added
 *  to GIFTING_COLLECTIONS above (so nothing ever breaks silently). */
export const getGiftingCollectionMeta = (id: string): GiftingCollectionMeta =>
  GIFTING_COLLECTIONS.find((c) => c.id === id) ?? {
    id,
    name: `${toTitleCase(id)} Collection`,
    description: "A curated collection available for bulk gifting.",
  };
