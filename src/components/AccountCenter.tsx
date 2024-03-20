import React, { useState } from 'react'
import axios from 'axios'
import Toast from 'components/Toast'
import ChangePassword from 'components/ChangePassword'

interface AccountCenterProps {
  email: any
}

const AccountCenter = ({ email }: AccountCenterProps) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Title of page on top left */}
      <div className="flex flex-col ">
        <h1 className="text-xl font-bold text-primary">
          Account Center {email}
        </h1>
        <ChangePassword email={email} />
      </div>
    </div>
  )
}

export default AccountCenter
