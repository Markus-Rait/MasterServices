import React, { useState } from 'react';
import { createService } from '../utils/api';

const ServiceCreation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService({
          title, description,
          image: '',
          change: [],
          categories: []
      });
      alert('Service created successfully!');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div className="service-creation-page">
      <h1>Service Creation</h1>
      <form onSubmit={handleCreate}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ServiceCreation;
