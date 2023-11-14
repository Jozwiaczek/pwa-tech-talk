import { UseGuards } from '@nestjs/common';

import { OnlyAuthenticatedGuard } from '../guards/only-authenticated.guard';

export const Auth = () => UseGuards(OnlyAuthenticatedGuard);
