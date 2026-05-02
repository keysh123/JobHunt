import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate()
    const [searchText,setSearchText] = useState("")
  return (
    <div>
        <div className='flex items-center justify-between'>
        <Input placeholder="Filter by Name" className="w-fit" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
        <Button onClick={()=>{
            navigate("/admin/companies/create")
        }}>Add Company</Button>
        </div>
        <div>
            <CompaniesTable searchText={searchText}/>
        </div>
    </div>
  )
}

export default Companies