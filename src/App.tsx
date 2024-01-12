import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/ui/tabs'
import { FileHandler } from '&/features/upload-file'
import { Toaster } from '&/ui/toaster'

function App() {
  return (
    <div>
      <Toaster />
      <main>
        <h1 className='text-2xl tracking-tighter text-center md:text-3xl lg:text-4xl'>
          Convert your assets faster
        </h1>
        <div className='my-8'>
          <Tabs defaultValue='image' className='text-center'>
            <TabsList>
              <TabsTrigger value='image'>Image</TabsTrigger>
              <TabsTrigger value='document'>Document</TabsTrigger>
            </TabsList>
            <TabsContent value='image'>
              Make changes to your account here.
            </TabsContent>
            <TabsContent value='document'>
              Change your password here.
            </TabsContent>
          </Tabs>
          <FileHandler />
        </div>
      </main>
    </div>
  )
}

export default App
