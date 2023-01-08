import { ReactElement } from "react"

import './../styles/footer-component.scss';

const FooterComponent: React.FC = (): ReactElement => {
    return (
        <footer className="footer">
            <span>All rights reserved &copy; 2020</span>
        </footer>
    );
}

export default FooterComponent;