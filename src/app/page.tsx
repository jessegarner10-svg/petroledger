export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "10px",
          color: "#1f2937",
        }}
      >
        PetroLedger
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#4b5563",
          marginBottom: "30px",
        }}
      >
        Modern Oil & Gas Accounting Platform
      </p>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          maxWidth: "700px",
        }}
      >
        <h2>🚀 Congratulations!</h2>

        <p>
          You have successfully created the PetroLedger project.
        </p>

        <p>
          This is Version <strong>0.0.1</strong>.
        </p>

        <p>
          From here, we'll build a professional oil and gas accounting system
          together.
        </p>
      </div>
    </main>
  );
}