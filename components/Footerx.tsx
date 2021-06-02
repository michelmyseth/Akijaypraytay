const Footerx: React.FC = () => {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="bg-dark text-center text-white fixed-bottom">
        {/* <!-- Grid container --> */}
        <div className="container p-4">
          {/* <!-- Section: Text -->  */}
          <section className="mb-4">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur itaque est labore distinctio, atque quia omnis earum
              veniam rem, eius dolores.
            </p>
          </section>
          {/* <!-- Section: Text -->
    <!-- Section: Links --> */}
          <section className="">
            {/* <!--Grid row--> */}
            <div className="row">
              {/* <!--Grid column--> */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Nous contacter
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!--Grid column-->
        <!--Grid column--> */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!--Grid column-->
        <!--Grid column--> */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Git Hub
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!--Grid column-->
        <!--Grid column--> */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!--Grid column--> */}
            </div>
            {/* <!--Grid row--> */}
          </section>
          {/* <!-- Section: Links --> */}
        </div>
        {/* <!-- Grid container --> */}
        {/* <!-- Copyright --> */}
        <div className="text-center p-3 bg-dark">
          Powered by : Florian - Michel - David - Logan of Batch-4
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </>
  );
};

export default Footerx;
