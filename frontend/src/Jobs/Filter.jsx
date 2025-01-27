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
    filterType: "Job Type",
    data: ["Fulltime", "PartTime", "Remote"]
  },
  {
    filterType: "Job Tile",
    data: ["frontend", "backend", "Data Scientist", "QA"]
  }
];

function Filter() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="p-6 space-y-6 sm:p-8 md:p-10 max-w-lg mx-auto bg-white shadow-lg rounded-lg dark:bg-slate-800 dark:text-white">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 dark:bg-slate-800 dark:text-white">Filter Jobs</h1>
      <p className="text-gray-500 mb-6 dark:bg-slate-800 dark:text-white">Customize your job search by selecting preferences below.</p>
      <hr className="mb-6 border-gray-300" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-8 ">
        {filterData.map((filter, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800 dark:text-white"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-3 dark:bg-slate-800 dark:text-white">
              {filter.filterType}
            </h2>
            <div className="space-y-3 ">
              {filter.data.map((item, idx) => {
                const itemId = `${filter.filterType}-${item}`;
                return (
                  <div key={idx} className="flex items-center space-x-4 dark:bg-slate-800 dark:text-white">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="w-4 h-4 border-gray-400 focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-base font-medium text-gray-600 hover:text-gray-800 cursor-pointer dark:bg-slate-800 dark:text-white"
                    >
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
