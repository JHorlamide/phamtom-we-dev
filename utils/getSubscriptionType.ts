const getMonthlySubscriptionType = (type: string) => {
    if (type === "Basic plan") {
        return "FREE"
    } else if (type === "Bronze plan") {
        return "BRONZE_MONTHLY_PLAN"
    } else if (type === "Silver plan") {
        return "SILVER_MONTHLY_PLAN"
    } else if (type === "Golden plan") {
        return "GOLDEN_MONTHLY_PLAN"
    } else if (type === "Custom") {
        return "CUSTOM_MONTHLY_PLAN"
    }
}

const getQuarterlySubscriptionType = (type: string) => {
    if (type === "Basic plan") {
        return "FREE"
    } else if (type === "Bronze plan") {
        return "BRONZE_QUARTERLY_PLAN"
    } else if (type === "Silver plan") {
        return "SILVER_QUARTERLY_PLAN"
    } else if (type === "Golden plan") {
        return "GOLDEN_QUARTERLY_PLAN"
    } else if (type === "Custom") {
        return "CUSTOM_QUARTERLY_PLAN"
    }
}

const getYearlySubscriptionType = (type: string) => {
    if (type === "Basic plan") {
        return "FREE"
    } else if (type === "Bronze plan") {
        return "BRONZE_YEARLY_PLAN"
    } else if (type === "Silver plan") {
        return "SILVER_YEARLY_PLAN"
    } else if (type === "Golden plan") {
        return "GOLDEN_YEARLY_PLAN"
    } else if (type === "Custom") {
        return "CUSTOM_YEARLY_PLAN"
    }
}

export {
    getMonthlySubscriptionType,
    getQuarterlySubscriptionType,
    getYearlySubscriptionType
}
