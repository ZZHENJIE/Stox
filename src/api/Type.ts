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
    Date: string | undefined,
    EventType: string | undefined,
    Symbol: string | undefined
};

export interface FinvizScreenerItem {
    Symbol: string,
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
    Aftermarket?: boolean,
    BarsCount: number,
    Instrument: 'stock',
    Premarket?: boolean,
    Symbol: string,
    Timeframe: 'd' | 'i1',
};