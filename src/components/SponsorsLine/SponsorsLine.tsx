import React from "react";
import styles from "./SponsorsLine.module.css";

import { GiSpoon } from "react-icons/gi";
import { MY } from "@/constants";

type SponsorTier = 'diamond' | 'gold' | 'coffee' | 'flower' | 'spiritual';

interface SponsorTierData {
  name: SponsorTier;
  items: unknown[];
}

const SPONSOR_TIERS: SponsorTierData[] = [
  { name: 'diamond', items: [] },
  { name: 'gold', items: [] },
  { name: 'coffee', items: [] },
  { name: 'flower', items: [] },
  { name: 'spiritual', items: [] }
];

interface SponsorTypeConfig {
  emoji: string;
  header: string;
  hasName: boolean;
  hasCard: boolean;
  size: number;
}

const SPONSOR_TYPE_CONFIG: Record<SponsorTier, SponsorTypeConfig> = {
  diamond: {
    emoji: "💎",
    header: "Diamond",
    hasName: true,
    hasCard: true,
    size: 80
  },
  gold: {
    emoji: "🥇",
    header: "Gold",
    hasName: true,
    hasCard: true,
    size: 60
  },
  coffee: {
    emoji: "☕️",
    header: "Coffee",
    hasName: true,
    hasCard: true,
    size: 60
  },
  flower: {
    emoji: "🌹",
    header: "Little Red Flower",
    hasName: true,
    hasCard: true,
    size: 60
  },
  spiritual: {
    emoji: "🔮",
    header: "Spiritual",
    hasName: true,
    hasCard: true,
    size: 60
  }
};

const SponsorsLine = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>The Sponsors</div>
        <div className={`${styles.description} flex flex-row justify-center`}>
          <GiSpoon className="text-2xl my-auto" />
          <p className=" font-plex italic mx-4">
            {"you can also feed me with knowledge"}
          </p>
          😋
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.scroll}>
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.name} className={styles.sponsors}>
              <div>
                <header className={styles.sponsors_header}>
                  <div className={styles.type_header}>
                    <span className={styles.emoji}>
                      {SPONSOR_TYPE_CONFIG[tier.name].emoji}
                    </span>
                    <span>
                      {`${SPONSOR_TYPE_CONFIG[tier.name].header} sponsors`}
                    </span>
                  </div>
                </header>
                <div className={`${styles.cards} ${styles[tier.name]}`}>
                  <p className="font-plex italic text-sm capitalize">
                    be the first
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["gradient-left"]} />
        <div className={styles["gradient-right"]} />
      </div>
      <div className={styles["special-sponsors_wrap"]}>
        <div className={styles["special-sponsors_content"]}>
          <div className={styles.sponsors}>
            <header className={styles["special-sponsors_header"]}>
              <div className={styles.type_header}>
                <span>❤️ special sponsors</span>
              </div>
            </header>
            <div className={styles["special-sponsors_cards"]}></div>
          </div>
        </div>
      </div>
      <a
        className={styles.button_accent}
        href="https://github.com/sponsors/XinYun2020"
        target="_blank"
        rel="nofollow noreferrer">
        Become a sponsor
      </a>
    </div>
  );
};

export default SponsorsLine;
