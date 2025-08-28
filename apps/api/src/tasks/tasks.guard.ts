import { OwnerGuardFactory } from 'src/common/owner.guard.factory';

export const TaskOwner = OwnerGuardFactory('task', (req) => req.body.id);
