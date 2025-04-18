"use client";
import { useEffect } from 'react';
import '@/app/landing/landing.css';
import Link from "next/link";
export default function LandingPage() {
  useEffect(() => {
    // Particle animation
    function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      const x = Math.random() * window.innerWidth;
      particle.style.left = `${x}px`;
      const hue = Math.random() * 360;
      particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      const animationDuration = Math.random() * 2 + 3;
      particle.style.animation = `float-up ${animationDuration}s linear`;
      document.querySelector('.particles-container')?.appendChild(particle);
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }

    const intervalId = setInterval(createParticle, 50);

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Intersection Observer for fade-in animations
    const fadeElems = document.querySelectorAll('.fade-in-section');
    const appearOptions = { threshold: 0.5, rootMargin: "0px 0px -100px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);
    fadeElems.forEach(elem => appearOnScroll.observe(elem));

    // Typewriter effect
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
      const text = heroText.textContent;
      heroText.textContent = '';
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          heroText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      }
      typeWriter();
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });

    // Form submission handler
    const contactForm = document.querySelector('#contact-form');
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');
      contactForm.reset();
      alert('Thank you for your message. We will get back to you soon!');
    });

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      {/* Your actual HTML JSX content from index.html goes here */}
      <div className="particles-container fixed inset-0 z-0 bg-black"></div>

    
    <nav className="relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                    <img src="/img/logo2.png" alt="SUVRITT Logo" className="h-10 w-10 mr-2"/>
                    <span className="text-2xl font-bold text-white">SUVRITT</span>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</a>
                        <a href="#developer-intro" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Devs</a>
                        
                        <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                    </div>
                </div>
                <div className="flex items-center">
  <Link href="/" className="text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-4 py-2 rounded-md text-sm font-medium">
    Login
  </Link>
  <Link href="/login" className="ml-4 text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-4 py-2 rounded-md text-sm font-medium">
    Sign Up
  </Link>
</div>
                <div className="md:hidden">
                    <button id="mobile-menu-button" className="text-gray-400 hover:text-white focus:outline-none">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobile-menu" className="hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
                <a href="#developer-intro" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Devs</a>
                <a href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            </div>
        </div>
    </nav>

    <header className="relative z-10 pt-16 pb-32 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                    <span className="block">Single Platform for</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">All Your finances</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    SUVRITT helps you track, manage, and optimize your finances with powerful tools and beautiful visualizations.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="login.html" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 transform transition hover:scale-105">
                        Get Started
                    </a>
                </div>
            </div>
            <div className="md:w-1/2 relative">
                <div className="dashboard-preview rounded-xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img src="/img/dash.png" alt="FinTrack Dashboard" className="w-full"/>
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full filter blur-xl opacity-70 animate-pulse delay-700"></div>
            </div>
        </div>
    </header>

    <section id="features" className="relative z-10 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Powerful Financial Tools</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">Everything you need to manage your money effectively in one place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 hover:bg-gray-700 border border-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md flex items-center justify-center mb-6">
                        <i className="fas fa-chart-line text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Expense Tracking</h3>
                    <p className="text-gray-300">Automatically categorize and track your expenses to understand where your money goes.</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 hover:bg-gray-700 border border-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-md flex items-center justify-center mb-6">
                        <i className="fas fa-chart-pie text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Budget Planning</h3>
                    <p className="text-gray-300">Create custom budgets and get real-time updates on your spending habits.</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 hover:bg-gray-700 border border-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-md flex items-center justify-center mb-6">
                        <i className="fas fa-wallet text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Account Management</h3>
                    <p className="text-gray-300">Connect all your banking accounts in one place for a complete financial overview.</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 hover:bg-gray-700 border border-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-md flex items-center justify-center mb-6">
                        <i className="fas fa-chart-bar text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Stocks & Investment Tracking</h3>
                    <p className="text-gray-300">Monitor your investments and analyze performance with detailed reports.</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 hover:bg-gray-700 border border-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md flex items-center justify-center mb-6">
                        <i className="fas fa-hand-holding-usd text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Loan & EMI Management</h3>
                    <p className="text-gray-300">Track your loans and see detailed payment schedules and interest breakdowns.</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 transform transition hover:scale-105 hover:bg-gray-700 border border-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md flex items-center justify-center mb-6">
                        <i className="fas fa-file-invoice-dollar text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Tax Planning & Filling</h3>
                    <p className="text-gray-300">Prepare for tax season with deduction tracking and tax optimization tools.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="developer-intro" className="relative z-10 py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Meet the Developer</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">Passionate about crafting seamless and efficient financial solutions.</p>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transform transition hover:scale-105 text-center">
                    <div className="flex justify-center mb-6">
                        <img src="/img/ani.jpg" alt="Anisha Saha" className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg"/>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Anisha Saha</h3>
                    <ul className="space-y-3 mb-6 text-gray-300">
                        <li><i className="fas fa-check text-green-500 mr-2"></i> 23BCE1541</li>
                        
                    </ul>
                    <a href="#" className="block w-full bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-4 rounded-md text-center">Connect</a>
                </div>
    
                <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-8 border border-indigo-700 transform transition hover:scale-105 text-center shadow-xl">
                    <div className="flex justify-center mb-6">
                        <img src="/img/sa.jpg" alt="Sattwik Sarkar" className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg"/>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Sattwik Sarkar</h3>
                    <ul className="space-y-3 mb-6 text-gray-200">
                        <li><i className="fas fa-check text-green-400 mr-2"></i> 23BCE1297</li>
                    </ul>
                    <a href="#" className="block w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-md text-center">Connect</a>
                </div>
            </div>
        </div>
    </section>
    

        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">What Our Users Say</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">Join thousands of satisfied users who have transformed their financial lives.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transform transition hover:scale-105">
                    <div className="flex items-center mb-6">
                        <div className="flex">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                        </div>
                    </div>
                    <p className="text-gray-300 mb-6">"FinTrack has completely changed how I manage my money. I've saved over $3,000 in the past year just by being more aware of my spending habits."</p>
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson"/>
                        <div>
                            <h4 className="text-white font-medium">Sarah Johnson</h4>
                            <p className="text-gray-400 text-sm">Marketing Manager</p>
                        </div>
                    </div>
                </div>
               
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transform transition hover:scale-105">
                    <div className="flex items-center mb-6">
                        <div className="flex">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                        </div>
                    </div>
                    <p className="text-gray-300 mb-6">"As a small business owner, keeping track of expenses was always a challenge. FinTrack's business plan has streamlined our financial management and saved us countless hours."</p>
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael Chen"/>
                        <div>
                            <h4 className="text-white font-medium">Sakti Sarkar</h4>
                            <p className="text-gray-400 text-sm">Small Business Owner</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transform transition hover:scale-105">
                    <div className="flex items-center mb-6">
                        <div className="flex">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                        </div>
                    </div>
                    <p className="text-gray-300 mb-6">"The investment tracking feature is incredible. I can see all my investments in one place and make informed decisions. I've increased my portfolio by 15% since using FinTrack."</p>
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emily Rodriguez"/>
                        <div>
                            <h4 className="text-white font-medium">Emily Rodriguez</h4>
                            <p className="text-gray-400 text-sm">Financial Analyst</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    

    <section id="contact" className="relative z-10 py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Get In Touch</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">Have questions? We're here to help you get started.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <form>
                        <div className="mb-6">
                            <label  className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input type="text" id="name" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                        <div className="mb-6">
                            <label  className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input type="email" id="email" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea id="message"  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-md">Send Message</button>
                    </form>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <i className="fas fa-map-marker-alt text-indigo-500 mt-1"></i>
                            </div>
                            <div className="ml-3 text-gray-300">
                                <p>Vandalur-Kelambakkam Road</p>
                                <p>Chennai, 600048</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <i className="fas fa-envelope text-indigo-500 mt-1"></i>
                            </div>
                            <div className="ml-3 text-gray-300">
                                <p>anishasattwik@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <i className="fas fa-phone text-indigo-500 mt-1"></i>
                            </div>
                            <div className="ml-3 text-gray-300">
                                <p>+91 9800295650</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h4 className="text-lg font-medium text-white mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-linkedin text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <footer className="relative z-10 bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                        <img src="/img/logo2.png" alt="FinTrack Logo" className="h-8 w-8 mr-2"/>
                        <span className="text-xl font-bold">SUVRITT</span>
                    </div>
                    <p className="text-gray-400 mb-4">Your All-In-One financial management solution.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Product</h3>
                    <ul className="space-y-2">
                        <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                        <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Sattwik Sarkar</p>
            </div>
        </div>
    </footer>




    </main>
  );
}
