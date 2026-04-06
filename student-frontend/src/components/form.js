import { useState } from "react";
import InputField from "./input";
import Result from "./result";
import Insight from "./Insight";

function Form() {
  const [formData, setFormData] = useState({
    age: "",
    failures: "",
    absences: "",
    studytime: "",
    health: "",
    goout: "",
    freetime: "",
    traveltime: "",
    Fedu: "",
    Walc: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

if (formData.age < 10 || formData.age > 25) {
  errors.push("Age must be between 10 and 25");
}

if (formData.absences < 0) {
  errors.push("Absences cannot be negative");
}

if (errors.length > 0) {
  setError(errors);
  return;
}
    

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const res = await fetch("https://student-performance-predictor-tyk3.onrender.com//predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); //  always stops loading
    }
  };

  const fields = [
    { name: "age", label: "Age" },

    {
      name: "failures",
      label: "Past Failures",
      options: [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2+" }
      ]
    },

    { name: "absences", label: "Absences" },

    {
      name: "studytime",
      label: "Study Time",
      options: [
        { value: 1, label: "<2 hrs" },
        { value: 2, label: "2-5 hrs" },
        { value: 3, label: "5-10 hrs" },
        { value: 4, label: ">10 hrs" }
      ]
    },

    {
      name: "health",
      label: "Health",
      options: [
        { value: 1, label: "Very Bad" },
        { value: 2, label: "Bad" },
        { value: 3, label: "Average" },
        { value: 4, label: "Good" },
        { value: 5, label: "Excellent" }
      ]
    },

    {
      name: "goout",
      label: "Social Life",
      options: [
        { value: 1, label: "Low" },
        { value: 2, label: "Below Avg" },
        { value: 3, label: "Average" },
        { value: 4, label: "High" },
        { value: 5, label: "Very High" }
      ]
    },

    {
      name: "freetime",
      label: "Free Time",
      options: [
        { value: 1, label: "Low" },
        { value: 2, label: "Below Avg" },
        { value: 3, label: "Average" },
        { value: 4, label: "High" },
        { value: 5, label: "Very High" }
      ]
    },

    {
      name: "traveltime",
      label: "Travel Time",
      options: [
        { value: 1, label: "<15 min" },
        { value: 2, label: "15-30 min" },
        { value: 3, label: "30-60 min" },
        { value: 4, label: ">1 hr" }
      ]
    },

    {
      name: "Fedu",
      label: "Father Education",
      options: [
        { value: 0, label: "None" },
        { value: 1, label: "Primary" },
        { value: 2, label: "5th-9th" },
        { value: 3, label: "Secondary" },
        { value: 4, label: "Higher" }
      ]
    },

    {
      name: "Walc",
      label: "Weekend Alcohol",
      options: [
        { value: 1, label: "Low" },
        { value: 2, label: "Below Avg" },
        { value: 3, label: "Average" },
        { value: 4, label: "High" },
        { value: 5, label: "Very High" }
      ]
    }
  ];

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            onChange={handleChange}
            options={field.options}
          />
        ))}

    
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      
      {loading && <p className="loading">Predicting...</p>}
      {error && (
  <div className="error">
    {Array.isArray(error)
      ? error.map((err, index) => <p key={index}>{err}</p>)
      : <p>{error}</p>}
  </div>
)}

      
      <Result prediction={prediction} />
      <Insight data={formData} />
    </div>
  );
}

export default Form;