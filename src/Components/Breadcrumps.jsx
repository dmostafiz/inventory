import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Breadcrumps({breads}) {
    useEffect(() => {}, [])
    return (
        <>
            {breads.length > 0 && <Breadcrumb spacing='4px' color={'gray.400'} fontSize='14px' separator={<ChevronRightIcon color='gray.400' />}>
                <BreadcrumbItem>
                    <Link href='/home'>
                        <BreadcrumbLink as={'p'} href='/home'>Home</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                {breads.map((item, index) => <BreadcrumbItem key={index} isCurrentPage={breads.length == (index + 1)}>
                    <Link href={item.link}>
                        <BreadcrumbLink as={'p'} href={item.link}>{item.title}</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>)}
            </Breadcrumb>}
        </>
    )
}
