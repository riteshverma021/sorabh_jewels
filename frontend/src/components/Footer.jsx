import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer  className="id=footer bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-3">Contact Info</h3>
        <p>Phone: 9466539953</p>
        
      </div>
      <div>
        <h3 className="text-lg font-bold mb-3">Address</h3>
        <p>Sourabh Jewellers , Sunaro Wali Gali</p>
        <p>Near Hanuman Mandir , Gharaunda</p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-3">Follow Us</h3>
        <div className="flex gap-4">
         
          <a href="https://www.instagram.com/sourabh.jewellers?igsh=a29ua3VpNzQxaW90" target="_blank" rel="noreferrer" className="hover:text-pink-500">
            <FaInstagram className="w-6 h-6" /> @sourabh.jewellers
          </a>
        
        </div>
      </div>
    </div>
    <div className="text-center mt-8 text-sm text-gray-400">
      © {new Date().getFullYear()} Sourabh Jewellers. All Rights Reserved.
    </div>
  </footer>
  )
}

export default Footer