import pandas as pd

data = pd.read_csv("student_data.csv")

print("Shape:", data.shape)
print("\nFirst 5 rows:")
print(data.head())

print("\nMissing values:")
print(data.isnull().sum())

print("\nCorrelation with G3:")
print(data.corr(numeric_only=True)["G3"].sort_values(ascending=False))
