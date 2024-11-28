import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroup } from '@radix-ui/react-radio-group';
import React from 'react';

const filterData = [
  {
    filterType: "Location",
    data: ["Delhi", "Pune", "Mumbai"]
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
  return (
    <div className="p-4 space-y-4 sm:p-6 md:p-8">
      <h1 className="text-lg font-bold mb-2">Filter Jobs</h1>
      <hr className="mb-4" />
      <RadioGroup className="space-y-3">
        {filterData.map((filter, index) => (
          <div key={index} className="space-y-2">
            <h2 className="text-sm font-semibold">{filter.filterType}</h2>
            {filter.data.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <RadioGroupItem value={item} id={`${filter.filterType}-${item}`} />
                <Label htmlFor={`${filter.filterType}-${item}`} className="text-sm">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default Filter;
