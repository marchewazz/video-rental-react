import { Link, useLocation } from "react-router-dom";
import strings from "../utilities/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {

    const location = useLocation()    

  return (
    <footer className="py-5 lg:py-10 border-t-2 border-light-green bg-dark-green dark:bg-earie-black transition-all duration-300">
      <div className="container flex flex-wrap justify-between items-center h-full">
        <div className="w-full lg:w-auto flex justify-end">
          <Link to="/">
            <img className="w-20 dark:invert transition-all duration-300" src="/images/logo.png" />
          </Link>
        </div>
        <div className="w-full lg:w-auto mb-5 lg:mb-0">
            <h4 className="text-white font-bold text-3xl mb-3">
                { strings.footer.shortcuts }
            </h4>
            <div className="flex flex-col">
                <Link to="/movies" className="footer-link mb-2">
                    { strings.footer.movies }
                </Link>
                <Link to="/series" className="footer-link">
                    { strings.footer.series }
                </Link>
            </div>
        </div>
        <div className="w-full lg:w-auto mb-5 lg:mb-0">
            <h4 className="text-white font-bold text-3xl mb-3">
                { strings.footer.usefulLinks }
            </h4>
            <div className="flex flex-col">
                <Link to="/privacy-policy" className="footer-link mb-3"
                state={{ fromCookies: location.pathname === "/cookies"}}>
                    { strings.footer.privacyPolicy }
                </Link>
                <Link to="/cookies" className="footer-link"
                state={{ fromPrivacy: location.pathname === "/privacy-policy"}}>
                    { strings.footer.cookies }
                </Link>
            </div>
        </div>
        <div className="flex items-start justify-end w-full lg:w-auto">
            <div className="flex justify-between">
                <Link className="social-media-icon" target="_blank" to="https://google.com">
                    <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link className="social-media-icon mx-5" target="_blank" to="https://google.com">
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link className="social-media-icon" target="_blank" to="https://google.com">
                    <FontAwesomeIcon icon={faTwitter} />
                </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
