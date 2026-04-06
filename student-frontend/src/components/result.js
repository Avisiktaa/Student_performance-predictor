function Result({ prediction }) {
  if (!prediction) return null;

  // Convert to percentage
  const percentage = ((prediction / 20) * 100).toFixed(2);

  let color = "green";

  if (percentage < 40) color = "red";
  else if (percentage < 70) color = "orange";

  return (
    <div>
      <h2 className="result" style={{ color }}>
        Predicted Score: {percentage}%
      </h2>

      <p>
        {percentage >= 80 && "Excellent performance 🎯"}
        {percentage >= 50 && percentage < 80 && "Average performance 👍"}
        {percentage < 50 && "Needs improvement ⚠️"}
      </p>
    </div>
  );
}

export default Result;