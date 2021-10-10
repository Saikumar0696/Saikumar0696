import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="container my-5"
      style={{
        width: "100%",
      }}
    >
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">UberEats</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>An food delivery company which delivers Food to your place</p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />

              <p>
                <Link to="/seller/signin" className="text-dark">
                  Become an Affiliate
                </Link>
              </p>
              <p>
                <Link href="/about" className="text-dark">
                  About
                </Link>
              </p>
              <p>
                <Link href="/help" className="text-dark">
                  Help
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <i className="fas fa-home mr-3"></i> California, CA 95122, US
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i>{" "}
                ubereats.info@example.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print mr-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
