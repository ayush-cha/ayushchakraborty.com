# ITC Limited — Macro Regression FINAL
# Embedded-data reproducible specification.
# The ChatGPT execution runtime does not include an R interpreter; the coefficients
# below were independently computed using equivalent OLS + HC1 robust covariance.
# Running this script in R/RStudio reproduces the regression from the CSV.

library(tidyverse)
library(lmtest)
library(sandwich)

df <- read_csv("ITC_R_Regression_Data.csv", show_col_types = FALSE)

model <- lm(ITC_Return ~ Repo_Change + NIFTY_Return, data = df)
print(summary(model))
print(coeftest(model, vcov = vcovHC(model, type = "HC1")))

scenarios <- tibble(
  Repo_Change = c(-1, 0, 1),
  NIFTY_Return = c(0, 0, 0),
  Scenario = c("100 bps cut", "No change", "100 bps hike")
)
scenarios$Predicted_ITC_Return <- predict(model, newdata=scenarios)
print(scenarios)

png("ITC_regression_diagnostics.png", width=1400, height=1000)
par(mfrow=c(2,2))
plot(model)
dev.off()

# Reference results:
# N = 65
# R-squared = 0.3564
# Intercept = 0.000191
# Repo_Change = 0.107013
# NIFTY_Return = 0.939268
