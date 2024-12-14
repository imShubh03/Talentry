import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { setSearchedQuery } from '@/redux/jobSlice';
import { RadioGroup } from '@radix-ui/react-radio-group';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const filterData = [
  {
    filterType: "Location",
    data: ["Bangalore", "Pune", "Hyderabad"]
  },
  {
    filterType: "Salary",
    data: ["Below 3 LPA", "3-6 LPA", "Above 6 LPA"]
  },
  {
    filterType: "Job Type",
    data: ["Full Time", "Part Time", "Remote"]
  }
];

function Filter() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue]);

  return (
    <div className="p-6 space-y-6 sm:p-8 md:p-10">
      <h1 className="text-2xl font-bold mb-4">Filter Jobs</h1>
      <hr className="mb-6 border-gray-300" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-8">
        {filterData.map((filter, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">{filter.filterType}</h2>
            <div className="space-y-3">
              {filter.data.map((item, idx) => {
                const itemId = `${filter.filterType}-${item}`;
                return (
                  <div key={idx} className="flex items-center space-x-4">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-base">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default Filter;
