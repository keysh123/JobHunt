import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='flex items-center justify-between'>
        <Input placeholder="Filter by Name" className="w-fit"/>
        <Button onClick={()=>{
            navigate("/admin/companies/create")
        }}>Add Company</Button>
        </div>
        <div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies