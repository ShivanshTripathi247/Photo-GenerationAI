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
import axios from 'axios'
import { BACKEND_URL, CLOUDFLARE_URL } from '../config'
import { TrainModalInput } from "common/inferred"
import { useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { log } from 'console'


type Props = {}

export default function Train(props: Props)  {
  const [ files, setFiles ] = useState<File[]>([]);
  const [ zipUrl, setZipUrl ] = useState<string>("");
  const [ type, setType ] = useState("Man");
  const [ age,setAge ] = useState<string>();
  const [ ethnicity, setethnicity ] = useState<string>();
  const [ eyeColor, setEyeColor ] = useState<string>();
  const [ bald, setBald ] = useState(false);
  const [ name, setName ] = useState("")
  const router = useRouter();

  async function trainModal() {
    const input = {
      zipUrl,
      type,
      age: parseInt(age ?? "0"),
      ethnicity,
      eyeColor,
      bald,
      name
    };
  
    console.log("Payload:", input);
  
    try {
      const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: () => true, // Bypass axios built-in error throwing
      });
  
      console.log("Response:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  const onUploadDone = (url: string) => {
    console.log("Final upload URL:", url);
    setZipUrl(url);
    
    // You can add additional logic here like:
    // - Update UI state
    // - Trigger model creation
    // - Show success notification
  };
  
  const handleFileUpload = async (files: File[]) => {
    setFiles(files);    // Log file details
    console.log('Original files:', files);
    
  };

  const handleZipRequest = async (files: File[]) => {
    try{
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

      //Backend Integration
      const res1 = await axios.get(`${BACKEND_URL}/pre-signed-url`)
      const { url, key } = res1.data;
      
      // Upload the zip content directly
      await axios.put(url, content, {
        headers: {
          'Content-Type': 'application/zip',
        }
      });

      // Call the completion handler
      const finalUrl = `${CLOUDFLARE_URL}/${key}`;
      console.log('Upload completed, final URL:', finalUrl);
      onUploadDone(finalUrl);
      
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle errors appropriately
    }
    
    // Optional: Trigger download
    // const url = URL.createObjectURL(zipFile);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = zipFile.name;
    // a.click();
  };

  console.log(name, age, ethnicity, eyeColor, bald, type );
  
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
              <Input onChange={(e) => setName(e.target.value)} className='border-gray-300' id="name" placeholder="Name of the model." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Gender</Label>
              <Select onValueChange={(value) => {
                setType(value)
              }}>
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
              <Input onChange={(e) => {
                setAge(e.target.value)
              }} className='border-gray-300' id="name" placeholder="Enter your age." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">ethnicity</Label>
              <Select onValueChange={(value) => {
                setethnicity(value)
              }}>
                <SelectTrigger className='border-gray-300' id="ethnicity">
                  <SelectValue placeholder="Select your ethnicity." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_American">Asian American</SelectItem>
                  <SelectItem value="East_Asian">East Asian</SelectItem>
                  <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                  <SelectItem value="South_Asian">South Asian</SelectItem>
                  <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                  <SelectItem value="Pacific">pacific</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="eyeColor">Eye Color</Label>
              <Select onValueChange={(value) => {
                setEyeColor(value)
              }}>
                <SelectTrigger className='border-gray-300' id="eyeColor">
                  <SelectValue placeholder="Select your Eye-color." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Hazel">Hazel</SelectItem>
                  <SelectItem value="Grey">Grey</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="bald">Bald</Label>
            <Switch onClick={(e) => {
                            setBald(!bald)
                        }} />
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload 
              onChange={handleFileUpload}
              onZip={handleZipRequest}
            />
          </div>
        </form>        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() =>  {
          router.push('/')
        }}>Cancel</Button>
        <Button disabled={!zipUrl || !type || !age || !ethnicity ||  !eyeColor} onClick={trainModal}>Create Modal</Button>
      </CardFooter>      
    </Card>
    </div>
  )
}

