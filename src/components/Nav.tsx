import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navIcon = [
	{'title':'search','src':'/assets/icons/search.svg'},
	{'title':'black-heart','src':'/assets/icons/black-heart.svg'},
	{'title':'user','src':'/assets/icons/user.svg'}
]

const Nav = () => {
	return (
		<header className='w-full px-2 md:px-5 py-2'>
			<nav className='flex flex-wrap items-center justify-between'>
				<Link href='/' className='flex items-center'>
					<Image src='/assets/icons/logo.svg' width={40} height={40} alt='logo'></Image>	
					<p className='font-bold whitespace-nowrap'>Price <span className='text-red-400'>Wise</span></p>
				</Link>
				<div className='flex gap-2'>
					{
						navIcon.map((item)=>(
							<Link href='/' key={item.title}>
								<Image src={item.src} width={30} height={30} alt={item.title}></Image>
							</Link>
						))
					}
				</div>
			</nav>
		</header>
	)
}

export default Nav
