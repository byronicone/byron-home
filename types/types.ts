//Quotes
export type QuoteType = {
  id: string;
  text: string;
  author: string;
};

//Posts
export type PostData = {
  id: string;
  contentHtml?: string;
} & MatterResultData;

export type MatterResultData = {
  title: string;
  date: string;
};
