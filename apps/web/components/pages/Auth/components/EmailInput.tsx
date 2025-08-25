import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { ControllerRenderProps } from 'react-hook-form';
import { FormValues } from '@/hooks/useAuthFormType';

const EmailInput = ({
  ...field
}: ControllerRenderProps<FormValues, 'email'>) => (
  <FormItem>
    <FormLabel>Email</FormLabel>

    <FormControl>
      <div className="grid gap-2">
        <Input
          {...field}
          id="email"
          type="email"
          placeholder="email@example.com"
          required
          value={field.value || ''}
        />
      </div>
    </FormControl>
  </FormItem>
);

export default EmailInput;
