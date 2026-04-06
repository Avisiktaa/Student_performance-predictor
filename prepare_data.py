import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

data=pd.read_csv("student_data.csv")    

#data=data.drop(columns=["G1","G2"])
print("Shape after dropping G1 & G2:", data.shape)
print("\nColumns:")
print(data.columns)

y=data["G3"]
X=data.drop(columns=["G3"])
print("\nFeatures (X) shape:", X.shape)
print("Target (y) shape:", y.shape)

X = pd.get_dummies(X, drop_first=True)

print("\nShape after encoding:", X.shape)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\nTrain shape:", X_train.shape)
print("Test shape:", X_test.shape)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\nScaling complete.")

model = LinearRegression()
model.fit(X_train_scaled, y_train)

print("Model training complete.")

y_pred = model.predict(X_test_scaled)

print("First 10 Predictions:")
print(y_pred[:10])

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\nMean Absolute Error:", mae)
print("R2 Score:", r2)