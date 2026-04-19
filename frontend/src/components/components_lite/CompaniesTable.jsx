import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>Your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Logo
                    </TableHead>
                    <TableHead>
                        Comapny Name
                    </TableHead>
                    <TableHead>
                        Date
                    </TableHead>
                    <TableHead className="text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell>
                    <Avatar>
                        <AvatarImage src="data:image/jpeg;base64,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" alt="logo"/>
                    </Avatar>
                </TableCell>
                <TableCell>
                    Keya Shah Production
                </TableCell>
                <TableCell>
                    26-07-2003
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger>
                            {" "}
                            <MoreHorizontal/>
                            {" "}
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                            <Edit2 className='w-4'/>
                            <span>Edit</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable