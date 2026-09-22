# ITC Limited - corrected exploratory macro regression
# Sample: 64 supplied monthly return observations, May 2021-August 2026.
# September 2026 is excluded because the original report was dated 9 September 2026.
# RBI policy-rate change months were corrected against RBI publications.
# The supplied ITC/NIFTY returns are reproduced but underlying price observations
# and adjustment factors were not available for independent certification.

library(readr)
library(lmtest)
library(sandwich)

df <- read_csv("ITC_R_Regression_Data.csv", show_col_types = FALSE)

model <- lm(ITC_Return ~ Repo_Change + NIFTY_Return, data = df)

# HC1 robust covariance. df = Inf aligns p-values to the normal approximation
# used in the corrected workbook.
robust <- coeftest(model, vcov. = vcovHC(model, type = "HC1"), df = Inf)

print(summary(model))
print(robust)

# Reference outputs from the corrected dataset:
# N = 64
# R-squared = 0.368175
# Intercept = -0.000649
# Repo_Change = 0.112253
# NIFTY_Return = 0.951274
# HC1 robust SEs = 0.006457, 0.026771, 0.146506
# Normal-approx p-values = 0.919946, 0.00002753, 8.41e-11

png("ITC_regression_diagnostics.png", width = 1400, height = 1000)
par(mfrow = c(2, 2))
plot(model)
dev.off()
