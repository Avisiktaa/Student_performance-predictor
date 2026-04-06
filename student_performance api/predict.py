import sys
import json
import joblib
import pandas as pd

# Load model and columns
model = joblib.load("model.pkl")
columns = joblib.load("columns.pkl")

# Get input data from Node
input_json = sys.stdin.readline()
input_dict = json.loads(input_json)

# Convert to dataframe
input_df = pd.DataFrame([input_dict])

# Encode same way
input_df = pd.get_dummies(input_df)
input_df = input_df.reindex(columns=columns, fill_value=0)

# Predict
prediction = model.predict(input_df)

print(prediction[0])
