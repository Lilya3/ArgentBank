import iconChat from "/img/icon-chat.png"
import iconMoney from "/img/icon-money.png"
import iconSecurity from "/img/icon-security.png"

function Home() {
  return (
    <main>
      <div className="home__hero">
        <section className="home__content">
          <h2 className="sr-only">Promoted Content</h2>

          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>

          <p className="text">
            Open a savings account with Argent Bank today!
          </p>
        </section>
      </div>

      <section className="home__features">

        <div className="feature">
          <img src={iconChat} alt="Chat Icon" className="feature__icon" />
          <h3 className="feature__title">You are our #1 priority</h3>
          <p className="feature__text">
            Need to talk to a representative? You can get in touch through our 24/7 chat...
          </p>
        </div>

        <div className="feature">
          <img src={iconMoney} alt="Money Icon" className="feature__icon" />
          <h3 className="feature__title">More savings means higher rates</h3>
          <p className="feature__text">The more you save with us, the higher your interest rate will be!</p>
        </div>

        <div className="feature">
          <img src={iconSecurity} alt="Security Icon" className="feature__icon" />
          <h3 className="feature__title">Security you can trust</h3>
          <p className="feature__text">We use top of the line encryption to make sure your data is safe.</p>
        </div>
      </section>
    </main>
  )
}


export default Home