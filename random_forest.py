import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

data=pd.read_csv("student_data.csv")

data=data.drop(columns=["G1","G2"])

y=data["G3"]
X=data.drop(columns=["G3"])

X=pd.get_dummies(X, drop_first=True)
print("\nShape after encoding:", X.shape)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\nTrain shape:", X_train.shape)
print("Test shape:", X_test.shape)

rf_model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

rf_model.fit(X_train, y_train)

print("Random Forest training complete.")


rf_pred = rf_model.predict(X_test)


rf_mae = mean_absolute_error(y_test, rf_pred)
rf_r2 = r2_score(y_test, rf_pred)

print("\nRandom Forest Results:")
print("MAE:", rf_mae)
print("R2 Score:", rf_r2)

importances = rf_model.feature_importances_

feature_importance_df = pd.DataFrame({
    "Feature": X.columns,
    "Importance": importances
})

feature_importance_df = feature_importance_df.sort_values(
    by="Importance",
    ascending=False
)

print("\nTop 10 Important Features:")
print(feature_importance_df.head(10))



joblib.dump(rf_model, "model.pkl")
print("Model saved successfully.")

joblib.dump(X.columns, "columns.pkl")