import axios from "axios";
import React, { useEffect, useState } from "react";
import './Suplier.css';
import { IoSearchSharp } from "react-icons/io5";

const Supplier = () => {
    const [supplierList, setSupplierList] = useState([]);
    const [showSupplierForm, setShowSupplierForm] = useState(false);
    const [formData, setFormData] = useState({
      supplier_name: '',
      supplier_address: '',
      contact_number: '',
      email: '',
      registration_date: '',
    });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/suppliers');
            setSupplierList(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleAddSupplierClick = () => {
      setShowSupplierForm(true);
    };

    const handleCloseSupplierForm = () => {
        setShowSupplierForm(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.supplier_name || !formData.supplier_address || !formData.contact_number || !formData.email || !formData.registration_date) {
            alert('Please fill in all required fields.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:7001/api/suppliers', formData);
            console.log('Supplier added successfully:', response.data);
            fetchSuppliers();
            setFormData({
                supplier_name: '',
                supplier_address: '',
                contact_number: '',
                email: '',
                registration_date: '',
            });
            setShowSupplierForm(false);
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    };

    return (
        <div className="supplier-container">
            <div className="supplier-home-and-sort-title">
                <h2 className="supplier-heading">Supplier Management</h2>
            </div>
            <div className="supplier-search-and-export">
                <div className="search-container">
                    <IoSearchSharp className="search-icon"/>
                    <input
                        id="searchInput"
                        className="supplier-search-input"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <table className="main-supplier-table">
                <thead >
                    <tr >
                        <th className="supplier-thead">Supplier ID</th>
                        <th className="supplier-thead">Supplier Name</th>
                        <th className="supplier-thead">Supplier Address</th>
                        <th className="supplier-thead">Contact Number</th>
                        <th className="supplier-thead">Email</th>
                        <th className="supplier-thead">Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {supplierList.map((supplier) => (
                        <tr key={supplier.supplier_id}>
                            <td className="supplier-table-fields">{supplier.supplier_id}</td>
                            <td className="supplier-table-fields">{supplier.supplier_name}</td>
                            <td className="supplier-table-fields">{supplier.supplier_address}</td>
                            <td className="supplier-table-fields">{supplier.contact_number}</td>
                            <td className="supplier-table-fields">{supplier.email}</td>
                            <td className="supplier-table-fields">{new Date(supplier.registration_date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                            })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showSupplierForm && (
                <div className='detailed-view-supplier-form'>
                    <div className='detail-description-detailed-supplier-form'>
                        <div className='supplier-form-title' >Add Supplier</div>
                        <div className="supplier-form">
                            <label className="supplier-form-label">
                                Supplier Name:
                                <input
                                    type="text"
                                    name="supplier_name"
                                    value={formData.supplier_name}
                                    onChange={handleChange}
                                    className="supplier-form-input"
                                />
                            </label>
                            <label className="supplier-form-label">
                                Supplier Address:
                                <input
                                    type="text"
                                    name="supplier_address"
                                    value={formData.supplier_address}
                                    onChange={handleChange}
                                    className="supplier-form-input"
                                />
                            </label>
                            <label className="supplier-form-label">
                                Contact Number:
                                <input
                                    type="text"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    className="supplier-form-input"
                                />
                            </label>
                            <label className="supplier-form-label">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="supplier-form-input"
                                />
                            </label>
                            <label className="supplier-form-label">
                                Registration Date:
                                <input
                                    type="date"
                                    name="registration_date"
                                    value={formData.registration_date}
                                    onChange={handleChange}
                                    className="supplier-form-input"
                                />
                            </label>
                        </div>
                        <button type="button" onClick={handleSubmit} className="supplier-form-submit-btn">Submit</button>
                        <button onClick={handleCloseSupplierForm} className='supplier-form-close-button'>Close</button>
                    </div>
                </div>
            )}
            <button className="add-supplier-button" onClick={handleAddSupplierClick}>Add Supplier</button>
        </div>
    );
}

export default Supplier;
