import fratCrestImg from "../assets/Frat_Crest.png";

export default function Contact() {
  return (
    <div className="contact-page page-with-fixed-nav bg-sand">
      <section className="contact-wrap">
        <div className="container">
          <div className="contact-card">
            <div
              className="contact-info"
              style={{ backgroundImage: `url(${fratCrestImg})` }}
            >
              <div className="contact-info-inner">
                <h2>Contact Us</h2>
                <p>
                  Reach out to the Alpha Epsilon Chapter. We’d love to hear from
                  you.
                </p>
                <div className="contact-detail">
                  <span className="contact-label">Address</span>
                  <span>University of Virginia, Charlottesville, VA</span>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">Email</span>
                  <span>lambdas1982@gmail.com</span>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">Phone</span>
                  <span>(571) 263-6521</span>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3>Send Us A Message</h3>
              <form className="contact-form-grid">
                <label>
                  <span>Tell us your name</span>
                  <div className="contact-two">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                  </div>
                </label>
                <label>
                  <span>Enter your email</span>
                  <input type="email" placeholder="you@example.com" />
                </label>
                <label>
                  <span>Enter phone number</span>
                  <input type="tel" placeholder="(000) 000-0000" />
                </label>
                <label>
                  <span>Message</span>
                  <textarea rows="5" placeholder="Write us a message" />
                </label>
                <button className="btn btn-lul" type="button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
