import React from "react";
import SelectFilter from '../components/SelectFilter'

const SearchFilters = ({ handleChange, service, services, city, cities, insurance, insurances }) =>
    <div>
        <SelectFilter label="Service" suggestions={services} handleUpdate={handleChange} value={service} />
        <SelectFilter label="City" suggestions={cities} handleUpdate={handleChange} value={city} />
        <SelectFilter label="Insurance" suggestions={insurances} handleUpdate={handleChange} value={insurance} />
    </div>

export default SearchFilters