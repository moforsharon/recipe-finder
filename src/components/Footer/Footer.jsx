import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="p-10 bg-primary-color shadow-top bg-cover bg-center text-primary-content text-white flex flex-col justify-center items-center">
            <div className="mb-4 text-sm">
                Connect with me on social media:
            </div>
            <div className="flex justify-center items-center space-x-4 mb-4 text-sm">
                <a href="https://twitter.com/sharon_mofor"> <FaTwitter className="social-icon" /></a>
                <a href="https://github.com/moforsharon"><FaGithub className="social-icon" /></a>
                <a href="https://www.linkedin.com/in/sharon-mofor-183a71217/"><FaLinkedin className="social-icon" /></a>
                <a href="https://web.facebook.com/profile.php?id=100084454255858"><FaFacebook className="text-primary-content" /></a>
            </div>
            <p className="text-sm text-center">© 2023 All rights reserved</p>
            <p className="text-center text-sm">Sha🎉</p>
        </footer>
    );
};

export default Footer;
