export interface IPOItem {
    Company: string,
    Symbol: string,
    Managers: string,
    Shares_Millions: string,
    Price_Low: string,
    Price_High: string,
    Estimated_Dollar_Volume: string,
    Expected_Date: string,
};

export interface SpacResearchItem {
    date: string | undefined,
    eventType: string | undefined,
    symbol: string | undefined
};

export interface FinvizScreenerItem {
    Ticker: string,
    Company: string,
    Sector: string,
    Industry: string,
    Country: string,
    MarketCap: string,
    PriceEarningsRatio: string,
    Price: string,
    Change: string,
    Volume: string,
};

export interface FinvizCandlestickParams {
    aftermarket?: boolean,
    barsCount: number,
    instrument: 'stock',
    premarket?: boolean,
    ticker: string,
    timeframe: 'd' | 'i1',
};