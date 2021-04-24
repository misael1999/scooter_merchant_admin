
export class PromotionsMerchant {
    constructor(
        public name: string,
        public description: string,
        public fromDate: string,
        public toDate: string,
        public promotionType: number,
        public promotionRule: PromotionRule,
        public timeIntervals: TimeInterval[],
    ) { }
}


interface PromotionRule {
    isPeriodic: boolean;
    hasLimitUsage: boolean;
    hasLimitDiscountAmount: boolean;
    isDiscountPercentage: boolean;
    isCouponCode: boolean;
    minimumOrderPrice: number;
    discountAmount: number;
    limitDiscountAmount: number;
    usageLimit: number;
    budget: number;
}

interface TimeInterval {
    fromTime: string;
    toTime: string;
    scheduleIDS: number[];
}
