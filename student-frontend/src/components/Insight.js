function Insight({ data }) {
  if (!data) return null;

  let messages = [];

  if (data.absences > 10) {
    messages.push(" High absences may reduce your score.");
  }

  if (data.studytime < 2) {
    messages.push(" Increasing study time can improve performance.");
  }

  if (data.failures > 0) {
    messages.push(" Past failures are affecting your result.");
  }

  if (data.goout > 3) {
    messages.push(" Too much social activity might impact studies.");
  }

  return (
    <div style={{ marginTop: "15px" }}>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}

export default Insight;