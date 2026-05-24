function Contact() {

  return (
    <div className="center-box contact-box">

      <h2>📩 Command Communication Channel</h2>

      <p style={{ opacity: 0.7, marginTop: "8px" }}>
        Secure line to Military Command Center
      </p>

      <div className="contact-form">

        <input
          type="email"
          placeholder="Enter Command Email"
        />

        <textarea
          placeholder="Enter Message to HQ..."
          rows="5"
        />

        <button className="btn">
          🚀 Transmit Message
        </button>

      </div>

    </div>
  )
}

export default Contact