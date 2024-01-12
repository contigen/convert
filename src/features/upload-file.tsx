import axios from 'axios'
import { Input } from '&/ui/input'
import { ToastAction } from '&/ui/toast'
import { useToast } from '&/ui/use-toast'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { Button } from '&/ui/button'

export function FileHandler() {
  const [msg, setMsg] = useState(``)
  const filesRef = useRef<File | null>()
  const { toast } = useToast()
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const $input = evt.target
    const files = $input.files
    if (!files) {
      toast({
        description: `No  file was selected.`,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      })
      return
    }
    // filesRef.current = files
    for (const file of files) {
      filesRef.current = file
    }
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    if (filesRef.current) {
      const res = await sendFiles(filesRef.current)
      setMsg(res)
    }
  }

  return (
    <form className='my-4 space-y-4' onSubmit={handleSubmit}>
      <Input
        type='file'
        className='w-min'
        onChange={handleChange}
        name='file'
      />
      <Button type='submit'>convert</Button>
      <h2>{msg || ``}</h2>
    </form>
  )
}
// type Data = { type: string; data: Blob }

async function sendFiles(data: File) {
  // const type = data.type
  const formData = new FormData()
  formData.append(`file`, data, data.name)
  const { data: res } = await axios.post(
    `http://localhost:3000/api/file`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return res
}
