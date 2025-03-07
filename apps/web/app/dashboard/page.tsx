
import Generate from "@/components/global/Generate"
import { Packs } from "@/components/global/Packs"
import { Train } from "@/components/global/Train"
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"



export default function Dashboard() {
    return <>
    <div className="bg-black overflow-scroll w-full h-screen">
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="generate">Generate Image</TabsTrigger>
        <TabsTrigger value="train">Train a model</TabsTrigger>
        <TabsTrigger value="packs">Packs</TabsTrigger>
      </TabsList>
      <TabsContent value="generate">
        <Card>
          <CardHeader>
            <CardTitle>Generate.</CardTitle>
            <CardDescription>
              Generate your beautiful images with just a click. Provide a prompt to our AI and let the magic happen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
              <Generate/>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="train">
        <Card>
          <CardHeader>
            <CardTitle>Train your model.</CardTitle>
            <CardDescription>
              Train you face on our model and wait for the magic to happen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Train/>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="packs">
        <Card>
          <CardHeader>
            <CardTitle>Packs.</CardTitle>
            <CardDescription>
              Generate a set of images using packs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Packs/>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
    </>
}