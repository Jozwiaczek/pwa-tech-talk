import { AppSupportType } from '@/client/data/compare-features';
import { Tooltip } from '@nextui-org/react';
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { twJoin } from 'tailwind-merge';
import React from 'react';

export const AppSupportTypeBadge = ({ type }: { type: AppSupportType }) => {
  const commonClasses = 'size-7';

  switch (type) {
    case AppSupportType.Full:
      return (
        <Tooltip content="Full support" color="success">
          <CheckIcon className={twJoin(commonClasses, 'text-success')} />
        </Tooltip>
      );
    case AppSupportType.Partial:
      return (
        <Tooltip content="Partial support" color="warning">
          <ExclamationTriangleIcon className={twJoin(commonClasses, 'text-warning')} />
        </Tooltip>
      );
    case AppSupportType.None:
      return (
        <Tooltip content="No support" color="danger">
          <ExclamationCircleIcon className={twJoin(commonClasses, 'text-danger')} />
        </Tooltip>
      );
    default:
      return null;
  }
};
