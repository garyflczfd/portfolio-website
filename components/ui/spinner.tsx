import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- 加载状态：div+role=status 为无障碍通用实现 */

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
