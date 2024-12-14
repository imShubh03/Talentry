import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function JobCard({job}) {
  const navigate = useNavigate();
  const jobId = 'xyzl'

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt

    return Math.floor(timeDifference / (1000*24*60*60))
  }

  return (
    <Card className="w-full max-w-md mx-auto border rounded-md shadow-none dark:bg-slate-800 dark:text-white">
      {/* Header with Company Info and Bookmark */}
      <CardHeader className="flex flex-row justify-between items-center px-4 py-3">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={job?.company?.logo} alt="Company Logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg dark:bg-slate-800 dark:text-white">{job?.company?.name}</h3>
            <p className="text-sm text-gray-500 dark:bg-slate-800 dark:text-white">India</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-400 dark:bg-slate-800 dark:text-white">
          <Bookmark className="h-5 w-5 text-gray-500 dark:bg-slate-800 dark:text-white" />
        </Button>
      </CardHeader>

      {/* Content with Job Details */}
      <CardContent className="px-4 py-3">
        <div className="text-sm text-gray-500 mb-2 dark:bg-slate-800 dark:text-white">Posted: {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} </div>
        <h2 className="text-xl font-bold mb-2">{job?.title}</h2>
        <p className="text-sm text-gray-600 mb-4 dark:bg-slate-800 dark:text-white">
          {job?.description}
        </p>
        {/* Job Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-white">
          {job?.positions} Positions
          </Badge>
          <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-gray-700 dark:text-white">
          {job?.jobtype}
          </Badge>
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 dark:bg-gray-700 dark:text-white">
          {job?.salary} LPA
          </Badge>
        </div>
      </CardContent>

      {/* Footer with Action Buttons */}
      <CardFooter className="flex gap-4 px-4 py-3">
        <Button onClick={() => navigate(`/jobs/${job?._id}`)} className="flex-1 py-2 bg-white text-black hover:bg-sky-500 hover:text-white ">
          Details
        </Button>
        <Button className="flex-1 py-2 bg-blue-500 text-white hover:bg-blue-600">
          Save For Later
        </Button>
      </CardFooter>
    </Card>
  );
}

export default JobCard;
