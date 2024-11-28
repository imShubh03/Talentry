import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function JobCard() {
  const navigate = useNavigate();
  const jobId = 'xyzl'
  return (
    <Card className="w-full max-w-md mx-auto border rounded-md shadow-none dark:bg-slate-800 dark:text-white">
      {/* Header with Company Info and Bookmark */}
      <CardHeader className="flex flex-row justify-between items-center px-4 py-3">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="Company Logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg dark:bg-slate-800 dark:text-white">Company Name</h3>
            <p className="text-sm text-gray-500 dark:bg-slate-800 dark:text-white">India</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-400 dark:bg-slate-800 dark:text-white">
          <Bookmark className="h-5 w-5 text-gray-500 dark:bg-slate-800 dark:text-white" />
        </Button>
      </CardHeader>

      {/* Content with Job Details */}
      <CardContent className="px-4 py-3">
        <div className="text-sm text-gray-500 mb-2 dark:bg-slate-800 dark:text-white">Posted: 2 days ago</div>
        <h2 className="text-xl font-bold mb-2">Job Title</h2>
        <p className="text-sm text-gray-600 mb-4 dark:bg-slate-800 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam aliquid autem minus praesentium totam nisi fugit officia non accusantium incidunt?
        </p>
        {/* Job Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-white">
            12 positions
          </Badge>
          <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-gray-700 dark:text-white">
            Full Time
          </Badge>
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 dark:bg-gray-700 dark:text-white">
            Remote
          </Badge>
        </div>
      </CardContent>

      {/* Footer with Action Buttons */}
      <CardFooter className="flex gap-4 px-4 py-3">
        <Button onClick={() => navigate(`/description/${jobId}`)} className="flex-1 py-2 bg-white text-black hover:bg-sky-500 hover:text-white ">
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