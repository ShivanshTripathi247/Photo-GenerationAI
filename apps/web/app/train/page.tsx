'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from '@/components/ui/file-upload'
import JSZip from 'jszip'


type Props = {}

const Train = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  
  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
    
    const zip = new JSZip();
    // Add all files to the zip
    files.forEach(file => {
      zip.file(file.name, file);
    });

    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    const zipFile = new File([content], 'uploaded-images.zip', {
      type: 'application/zip',
    });

    // Log file details
    console.log('Original files:', files);
    console.log('Zip file created:', {
      name: zipFile.name,
      size: zipFile.size,
      type: zipFile.type,
    });

    // Optional: Create download link
    const url = URL.createObjectURL(zipFile);
    console.log('Zip file URL:', url);
    // You can trigger download with: 
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = zipFile.name;
    // a.click();
  };

  const handleZipRequest = async (files: File[]) => {
    const zip = new JSZip();
    
    // Add files to zip
    files.forEach(file => {
      zip.file(file.name, file);
    });

    // Generate zip content
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Create File object
    const zipFile = new File([content], 'uploaded-images.zip', {
      type: 'application/zip',
    });

    // Log results
    console.log('Zip file created:', {
      name: zipFile.name,
      size: zipFile.size,
      type: zipFile.type,
    });
    
    // Optional: Trigger download
    // const url = URL.createObjectURL(zipFile);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = zipFile.name;
    // a.click();
  };

  const handleCreateZip = async () => {
    if (files.length === 0) {
      alert('Please upload files first');
      return;
    }

    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.name, file);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const zipFile = new File([content], 'uploaded-images.zip', {
      type: 'application/zip',
    });

    console.log('Zip file created:', zipFile);
    // Add your submission logic here
  };

  return (
    <div className='flex flex-col items-center justify-center h-full  bg-black'>
    <Card className="md:w-[500px] lg:w-[700px] bg-neutral-800 text-white">
      <CardHeader>
        <CardTitle>Create Model</CardTitle>
        <CardDescription>Train your face on an AI Model.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input className='border-gray-300' id="name" placeholder="Name of the model." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Gender</Label>
              <Select>
                <SelectTrigger className='border-gray-300' id='type'>
                  <SelectValue placeholder='Select your gender'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Man'>Man</SelectItem>
                  <SelectItem value='Woman'>Women</SelectItem>
                  <SelectItem value='Others'>Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Age</Label>
              <Input className='border-gray-300' id="name" placeholder="Enter your age." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Ethenecity</Label>
              <Select>
                <SelectTrigger className='border-gray-300' id="ethenecity">
                  <SelectValue placeholder="Select your ethenecity." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_American">Asian American</SelectItem>
                  <SelectItem value="East_Asian">East Asian</SelectItem>
                  <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                  <SelectItem value="South_Asian">South Asian</SelectItem>
                  <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                  <SelectItem value="pacific">pacific</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="eyeColor">Eye Color</Label>
              <Select>
                <SelectTrigger className='border-gray-300' id="eyeColor">
                  <SelectValue placeholder="Select your Eye-color." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="brown">Brown</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="hazel">Hazel</SelectItem>
                  <SelectItem value="grey">Grey</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="bald">Bald</Label>
              <Select>
                <SelectTrigger className='border-gray-300' id="bald">
                  <SelectValue placeholder="Select True if you are bald." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <FileUpload 
            onChange={handleFileUpload}
            onZip={handleZipRequest}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleCreateZip}>Create Model & Zip Files</Button>
      </CardFooter>      
    </Card>
    </div>
  )
}

export default Train