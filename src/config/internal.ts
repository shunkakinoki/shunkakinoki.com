// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export enum InternalConfig {
  Cal = "https://cal.com/shunkakinoki",
  Meeting = "https://cal.com/shunkakinoki/meeting",
  Checklist = "https://shunkakinoki.notion.site/ccf0648ddaab42a38644f209e6cd641f",
  Gym = "https://shunkakinoki.notion.site/8e197940153f418a9f77574f77ab07f7",
  Stats = "https://shunkakinoki.notion.site/6c733d818b8742c8b4c66e01e715a8da",
}

// Create a reversed array of the enum entries
export const internalConfig = Object.entries(InternalConfig)
  .reverse()
  .map(([name, href]) => ({
    name,
    href,
  }));
