import { useState } from 'react';
import { X, Mail, Phone, Linkedin, Github, Twitter, Send } from 'lucide-react';
import axios from 'axios';
import { Spinner } from '@radix-ui/themes';

export default function Connect({ isOpen, setIsOpen }) {
    const [isClosing, setIsClosing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const openModal = () => {
        setIsOpen(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            setShowForm(false);
        }, 300);
    };

    const showContactForm = () => {
        setShowForm(true);
    };

    const showContactOptions = () => {
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        if (!formData.email || !formData.name || !formData.message) {
            return alert("All details are required!");
        }

        try {
            setLoading(true);
            const { data, status } = await axios.post("https://send-mail-theta.vercel.app/send-portfolio-email", formData)

            if (status === 200) {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
                setShowForm(false);
            }
        } catch (err) {

        } finally {
            setLoading(false);
        }
    };

    const getCharacterCount = () => {
        return formData.message.length;
    };

    return (
        <div className=" bg-gray-900 flex items-center justify-center p-4 ss:p-0">

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className={`fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end justify-center  z-50 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
                        }`}
                    onClick={closeModal}
                >
                    {/* Modal Content */}
                    <div
                        className={`bg-[#121212] border border-[#323232] border-b-0 rounded-t-2xl p-10 max-w-[550px] w-full relative transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <X size={24} />
                        </button>


                        {/* Social Icons */}
                        <div className="flex justify-center gap-6 mb-8">
                            <a href="https://www.linkedin.com/in/ayushagrahari0511/" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/ayushagrahari0511" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Github size={20} />
                            </a>
                            <a href="https://x.com/ayush_dev0511" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Twitter size={20} />
                            </a>
                        </div>

                        {/* Quick Connect and Fill Form Buttons - In Row */}
                        <div className="grid grid-cols-2 gap-4 mb-10 p-[3px] bg-neutral-800/50 rounded-[7px]">
                            <div
                                onClick={showContactOptions}
                                className={`text-center cursor-pointer flex items-center justify-center  text-[12px] font-semibold ${!showForm ? 'text-white p-2 bg-[#292929] border border-[#ffffff26] rounded-[8px]' : 'text-[#a1a1a1]'}`}
                            >
                                Quick connect
                            </div>
                            <div
                                onClick={showContactForm}
                                className={`text-center cursor-pointer flex items-center justify-center  text-[12px] font-semibold ${showForm ? 'text-white p-2 bg-[#292929] border border-[#ffffff26] rounded-[8px]' : 'text-[#a1a1a1]'}`}
                            >
                                Fill a form
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="mb-6">
                            {!showForm ? (
                                /* Contact Options */
                                <div className='flex flex-col gap-6'>
                                    <div className="grid grid-cols-2 gap-4 ss:grid-cols-1">
                                        {/* Email Option */}
                                        <a href='mailto:ayush.printila@gmail.com' className="border border-[#323232] rounded-lg hover:bg-gray-750 transition-colors duration-200 cursor-pointer group">
                                            <div className="flex items-center gap-3 mb-2 p-[15px] border-b border-b-[#323232] bg-gradient-to-r from-blue-900/20 to-transparent">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                                    <Mail size={20} className="text-blue-400" />
                                                </div>
                                                <span className="text-white font-medium">Email</span>
                                            </div>

                                            <div className='flex flex-col p-[15px]'>
                                                <div className="text-lg text-white font-bold mb-1">ayush.printila@gmail.com</div>
                                                <div className="text-lg text-gray-500">Send me an email directly</div>
                                            </div>

                                        </a>

                                        {/* Phone Option */}
                                        <a href="https://wa.me/917800947067"
                                            target="_blank"
                                            rel="noopener noreferrer" className="border border-[#323232] rounded-lg hover:bg-gray-750 transition-colors duration-200 cursor-pointer group">
                                            <div className="flex items-center gap-3 mb-2 p-[15px] border-b border-b-[#323232] bg-gradient-to-r from-purple-900/20 to-transparent">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                                    <Phone size={20} className="text-purple-400" />
                                                </div>
                                                <span className="text-white font-medium">Phone</span>
                                            </div>
                                            <div className='flex flex-col p-[15px]'>
                                                <div className="text-lg text-white font-bold mb-1">+91 7800947067</div>
                                                <div className="text-lg text-gray-500">Call or WhatsApp me directly</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-sm bg-green-900/10 border-[1px] p-5 rounded-[8px] border-green-400/20 ">
                                        <div className="relative">
                                            {/* Main dot */}
                                            <div className="w-4 h-4 bg-green-500 rounded-full z-10 relative"></div>
                                            {/* Ripple effect layers */}
                                            <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"></div>
                                            <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
                                        </div>
                                        <span className="text-green-400 text-center text-[13px]">Currently available for new opportunities</span>
                                    </div>
                                </div>
                            ) : (
                                /* Contact Form */
                                <div className="space-y-4">
                                    {/* Name and Email in Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-[14px] font-medium text-gray-300 mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full text-[12px] px-4 py-3 bg-[#121212] border border-[#323232] rounded-lg text-white placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-[14px] font-medium text-gray-300 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full text-[12px] px-4 py-3 bg-[#121212] border border-[#323232] rounded-lg text-white placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Input */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label htmlFor="message" className="block text-[14px] font-medium text-gray-300">
                                                Message
                                            </label>
                                            <span className="text-sm text-gray-500">
                                                {getCharacterCount()}/1000
                                            </span>
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            maxLength={1000}
                                            rows={4}
                                            className="w-full text-[12px] px-4 py-3 bg-[#121212] border border-[#323232] rounded-lg text-white placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="What would you like to discuss?"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        // type="submit"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-[14px] h-[40px] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                                    >
                                        {
                                            loading ? <Spinner /> :
                                                <div className='flex items-center gap-2'>
                                                    <Send size={20} />
                                                    Send message
                                                </div>
                                        }
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Status Indicator */}
                        {/* Status Indicator with Ripple Effect */}
                    </div>
                </div>
            )}
        </div>
    );
}