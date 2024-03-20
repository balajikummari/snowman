import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Breadcrumbs = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Array<any> | null>(null)

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
      linkPath.shift()
      const trimmedPath = linkPath.map((link) => link.split('?')[0])

      const pathArray = trimmedPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <div className="breadcrumbs text-sm font-medium text-primary">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li key={breadcrumb.href}>
              <Link href={breadcrumb.href} className="capitalize">
                {breadcrumb.breadcrumb}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs
