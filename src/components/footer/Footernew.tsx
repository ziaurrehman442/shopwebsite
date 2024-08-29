import React from "react";

// TypeScript: Declare the functional component
const Footernew: React.FC = () => {
  return (
    <div>
      <hr />
      <footer id="rs-footer" className="rs-footer footer-main-home footer-style1">
        <div className="container custom8">
          <div className="footer-top">
            <div className="row">
              <div className="col-lg-4 md-mb-30">
                <div className="footer-logo">
                  <a href="index">
                    <img src="/assets/img/logo.png" alt="Logo" />
                  </a>
                </div>
                <p className="description"></p>
                <div className="contact-box">
                  <div className="address-box mb-12 bgph">
                    <div className="address-icon">
                      <i className="ri-phone-line mti"></i>
                    </div>
                    <div className="address-text">
                      <div className="text">
                        <a href="tel:800888555" style={{ fontSize: "20px" }}>800888555</a>
                      </div>
                    </div>
                  </div>

                  <div className="address-box mb-12">
                    <div className="address-icon">
                      <i className="ri-whatsapp-line"></i>
                    </div>
                    <div className="address-text">
                      <div className="text">
                        <a href="https://wa.me/+97126459507">+97126459507</a>
                      </div>
                    </div>
                  </div>
                  <div className="address-box">
                    <div className="address-icon">
                      <i className="ri-mail-send-line"></i>
                    </div>
                    <div className="address-text">
                      <div className="text">
                        <a href="mailto:help@driven.llc">help@driven.llc</a>
                      </div>
                    </div>
                  </div>

                  <br />
                  <a href="https://maps.app.goo.gl/5fudwkaSDGkwDs6P7" target="_blank" title="Open Google Maps" rel="noopener noreferrer">
                    <div className="address-box">  
                      <div className="address-icon">
                        
                     <i className="ri-map-pin-line"></i>
                      </div>
                      <div className="address-text">
                        <div className="text">
                          <a>
                            Building 11 - Office 6 Al Wakalat 4 St - Industrial Area - Abu Dhabi - United Arab Emirates
                          </a>
                        </div>
                      </div>
                    </div>
                  </a>
                  
                </div>
              </div>
              <div className="col-lg-4 pl-110 md-pl-15">
                <h5 className="footer-title">Quick Links</h5>
                <ul className="site-map">
                  <li><a href="/">Home</a></li>
                  <li><a href="https://www.drivens.co/car-services.html">Services</a></li>
                  <li><a href="https://www.drivens.co/">About</a></li>
                  <li><a href="https://www.drivens.co/">Blogs</a></li>
                  <li><a href="https://www.drivens.co/">FAQs</a></li>
                </ul>
              </div>

              <div className="col-lg-4">
                <h5 className="footer-title">Connect with Us</h5>
                <ul className="footer-social">
                  <li><a href="https://www.facebook.com/driven.llc1" target="_blank" rel="noopener noreferrer"><img src="/assets/img/facebook.png" alt="Facebook" /></a></li>
                  <li><a href="https://www.instagram.com/driven.llc/" target="_blank" rel="noopener noreferrer"><img src="/assets/img/instgram.png" alt="Instagram" /></a></li>
                  <li><a href="https://twitter.com/drivenAutoCare" target="_blank" rel="noopener noreferrer"><img src="/assets/img/twitt.png" alt="Twitter" /></a></li>
                  <li><a href="https://www.tiktok.com/@driven.app" target="_blank" rel="noopener noreferrer"><img src="/assets/img/tiktok.png" alt="TikTok" /></a></li>
                  <li><a href="#"><img src="/assets/img/youtube.png" alt="YouTube" /></a></li>
                  <li><a href="https://www.linkedin.com/company/driven-app/" target="_blank" rel="noopener noreferrer"><img src="/assets/img/linkdin.png" alt="LinkedIn" /></a></li>
                </ul>
                <hr className="whtline" />
                <h5 className="footer-title">Payment Methods</h5>
                <ul className="footer-social">
                  <li><a href="#"><img src="/assets/img/visa.png" alt="Visa" /></a></li>
                  <li><a href="#"><img src="/assets/img/master.png" alt="MasterCard" /></a></li>
                  <li><a href="#"><img src="/assets/img/card.png" alt="Card" /></a></li>
                </ul>
                <hr className="whtline" />
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <a className="readon started phone-number normal-blue" href="https://apps.apple.com/app/driven-customer/id1603274627" style={{ backgroundColor: "#0D4058", display: "flex" }}>
                      <span className="btn-icon">
                        <img src="/assets/img/apple.png" className="plyst4" style={{ paddingTop: '30px' }} alt="App Store" />
                      </span>
                      <div className="btn-inl" style={{ paddingLeft: '5px' }}>
                        <div className="dnl4">Download On</div>
                        <div className="app-st4">App Store</div>
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-6 col-12">
                    <a className="readon started phone-number normal-blue" href="https://play.google.com/store/apps/details?id=com.driven.customer.application" style={{ backgroundColor: "#0D4058", display: "flex" }}>
                      <span className="btn-icon">
                        <img src="/assets/img/play.png" style={{ paddingTop: '30px' }} className="plyst4" alt="Play Store" />
                      </span>
                      <div className="btn-inl" style={{ paddingLeft: '5px' }}>
                        <div className="dnl4">Download On</div>
                        <div className="app-st4">Play Store</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="bottom-border">
              <div className="row y-middle">
                <div className="col-lg-6">
                  <div className="copyright text-lg-start text-center">
                    <p>© 2024 Powered By Driven</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footernew;
