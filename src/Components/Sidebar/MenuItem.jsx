import Link from 'next/link'
import React from 'react'
import NavItem from './NavItem'
import Submenu from './Submenu'

export default function MenuItem({ icon, title, link = '#', submenus = [] }) {

    const submenuLinks = submenus?.map(mnu => mnu?.link)

    // console.log(`Submenu Links for ${title} `, submenuLinks)

    return (
        <>
            {submenus.length
                ? <>
                    <Submenu
                        icon={icon}
                        title={title}
                        routes={submenuLinks}
                    >
                        {submenus?.map((menu, index) => {
                            if (menu.show) {
                              return  <Link key={index} href={menu?.link}>
                                    <NavItem route={menu?.link} pl="6" py="1" submenu={true}>
                                        {menu?.title}
                                    </NavItem>
                                </Link>
                            }
                        })}

                    </Submenu>
                </>
                : <Link href={link}>
                    <NavItem routes={[link]} icon={icon}>{title}</NavItem>
                </Link>}
        </>
    )
}
